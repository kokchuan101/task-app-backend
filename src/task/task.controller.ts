import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ParseIntPipe,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: Task,
    })
    @ApiBadRequestResponse({ description: 'Validation Error' })
    async create(@Body() taskDto: CreateTaskDto): Promise<Task> {
        const createdTask = await this.taskService.create(taskDto);
        return Task.getResponse(createdTask);
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Successfully retrieved task.',
        type: Task,
    })
    @ApiBadRequestResponse({ description: 'Validation error.' })
    @ApiNotFoundResponse({ description: 'Task not found.' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        const task = await this.taskService.findOne(id);
        return Task.getResponse(task);
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'Successfully update task.',
        type: Task,
    })
    @ApiBadRequestResponse({ description: 'Validation error.' })
    @ApiNotFoundResponse({ description: 'Task not found.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() taskDto: UpdateTaskDto,
    ): Promise<Task> {
        const updatedTask = await this.taskService.update(id, taskDto);
        return Task.getResponse(updatedTask);
    }

    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Validation error.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.delete(id);
    }
}
