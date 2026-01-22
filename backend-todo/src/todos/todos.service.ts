import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from './ai.service'; //
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService, //
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async findAll(search?: string) {
    return this.prisma.todo.findMany({
      where: search ? { title: { contains: search, mode: 'insensitive' } } : {},
    });
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo dengan ID ${id} tidak ditemukan`);
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
  // Gunakan null sebagai default, bukan undefined
  let recommendation: string | null = null;

  if (updateTodoDto.status === 'problem' && updateTodoDto.problem_desc) {
    const currentTodo = await this.prisma.todo.findUnique({ where: { id } });

    if (!currentTodo) {
      throw new Error('Todo tidak ditemukan');
    }
    
    const aiResult = await this.aiService.getRecommendation(
      currentTodo.title,
      updateTodoDto.problem_desc
    );
    
    recommendation = aiResult ?? null; 
  }

  return this.prisma.todo.update({
    where: { id },
    data: {
      title: updateTodoDto.title,
      status: updateTodoDto.status,
      problem_desc: updateTodoDto.problem_desc,
      // Ini gak bakal merah lagi setelah npx prisma generate
      ai_recommendation: recommendation,
    },
  });
}

  async remove(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}