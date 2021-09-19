import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
   constructor(
      @InjectRepository(TaskRepository)
      private taskRepository: TaskRepository) { }

   getAllTasks(): Promise<Task[]> {
      return this.taskRepository.getAllTasks();
   }

   getTaskById(id: string, user: User): Promise<Task> {
      return this.taskRepository.getTaskById(id, user);
   }

   deleteTaskById(id: string, user: User): Promise<void> {
      return this.taskRepository.deleteTaskById(id, user);
   }

   updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
      return this.taskRepository.updateTaskStatus(id, status, user);
   }

   createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
      return this.taskRepository.createTask(createTaskDto, user);
   }

   getTaskThruFilter(getTasksFilterDto: GetTasksFilterDto, user: User,): Promise<Task[]> {
      return this.taskRepository.getTaskThruFilter(getTasksFilterDto, user);
   }
}
