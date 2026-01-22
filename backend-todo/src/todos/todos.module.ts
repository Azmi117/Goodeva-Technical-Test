import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { AiService } from './ai.service'; //

@Module({
  controllers: [TodosController],
  providers: [TodosService, AiService], //
})
export class TodosModule {}