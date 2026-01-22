import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '@prisma/client';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string; // Tambahkan ini

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  @IsString()
  problem_desc?: string;
}