import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTaskByFilter(
        @Query() getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTaskThruFilter(getTasksFilterDto);
    }

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    // @Get()
    // getAllTasks(){
    //     var Multipassify = require('multipassify');
    //     var multipassify = new Multipassify("a3599529bb1fafde41c967c390a6a7e7");
    //     var customerData = { email: 'abc@gmail.com'};
    //     var token = multipassify.encode(customerData);
    //     var url = multipassify.generateUrl(customerData, "defined-dev.myshopify.com");
    //     console.log(url)
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);

    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
    ): Promise<Task> {
        const { status } = updateTaskStatusDTO;
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }
}
