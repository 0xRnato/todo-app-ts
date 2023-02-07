import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { todosProviders } from './todos.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodosController],
  providers: [TodosService, ...todosProviders],
})
export class TodosModule {}
