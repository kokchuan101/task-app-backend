import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    async create(taskDto: CreateTaskDto): Promise<Task> {
        const newTask = this.tasksRepository.create(taskDto);
        return this.tasksRepository.save(newTask);
    }

    async findOne(id: number) {
        const task = await this.tasksRepository.findOneBy({ id: id });
        if (!task) {
            throw new NotFoundException(`Task ${id} not found`);
        }

        return task;
    }

    async update(id: number, taskDto: UpdateTaskDto): Promise<Task> {
        const existingTask = await this.findOne(id);
        return this.tasksRepository.save({ ...existingTask, ...taskDto });
    }

    async delete(id: number) {
        return this.tasksRepository.softDelete(id);
    }
}
