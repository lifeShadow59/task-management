import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.model";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getAllTasks(): Promise<Task[]> {
        const query = this.createQueryBuilder('task');
        const tasks: Task[] = await query.getMany();
        return tasks;
    }


    //* Get Task By ID
    async getTaskById(id: string, user: User): Promise<Task> {
        const task: Task = await this.findOne({ where: { id, user } });
        if (!task)
            throw new NotFoundException('Task Not Found');
        return task;
    }

    //* For Create Task
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });
        await this.save(task);
        return task;
    }

    //* For Delete Task
    async deleteTaskById(id: string, user: User): Promise<void> {
        const result: DeleteResult = await this.delete({ id, user });
        if (result.affected === 0)
            throw new NotFoundException('Task Not Found');
    }

    //* Update Task Status
    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task: Task = await this.getTaskById(id, user);
        task.status = status;
        await this.save(task);
        return task;
    }

    async getTaskThruFilter(getTasksFilterDto: GetTasksFilterDto, user: User,): Promise<Task[]> {
        const { status, search } = getTasksFilterDto;
        const query = this.createQueryBuilder('task');

        query.where({ user });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` },);
        }

        const tasks: Task[] = await query.getMany();
        return tasks;
    }

}