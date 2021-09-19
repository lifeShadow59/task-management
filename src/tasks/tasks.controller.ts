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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
        @Query() getTasksFilterDto: GetTasksFilterDto, @GetUser() user: User,): Promise<Task[]> {
        return this.tasksService.getTaskThruFilter(getTasksFilterDto, user);
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
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);

    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTaskById(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
        @GetUser() user: User,
    ): Promise<Task> {
        const { status } = updateTaskStatusDTO;
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }
}
