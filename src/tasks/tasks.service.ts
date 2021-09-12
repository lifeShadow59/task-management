import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    private tasksList: Task[] = [];
    getAllTasks(): Task[] {
        return this.tasksList;
    }
}
