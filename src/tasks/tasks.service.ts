import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
    private tasksList: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasksList;
    }

    getTaskById(id: string): Task {
        const task: Task =  this.tasksList.find((task) => task.id === id);
        if(!task){
            throw new NotFoundException('Task NOt Found');
        }
        return task;
    }

    deleteTaskById(id: string): void {
        this.tasksList = this.tasksList.filter((task) => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task | void {
        const task : Task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasksList.push(task);
        return task;
    }

    getTaskThruFilter(getTasksFilterDto: GetTasksFilterDto): Task[] {
        const { status, search } = getTasksFilterDto;

        let tasks: Task[] = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }
        return tasks;
    }
}
