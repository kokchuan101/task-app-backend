import { InjectRepository } from '@nestjs/typeorm';
import { BaseQueryBuilder, KeyType } from 'src/search/baseQueryBuilder';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

export class TaskQueryBuilder extends BaseQueryBuilder {
    constructor(@InjectRepository(Task) tasksRepository: Repository<Task>) {
        super();
        this.repository = tasksRepository;
    }

    protected queryKeys: KeyType = {
        name: String,
        description: String,
    };

    protected orderByKeys: string[] = [
        'name',
        'description',
        'dueDate',
        'createdAt',
    ];

    transformData(data) {
        for (const datum of data) {
            Task.getResponse(datum);
        }

        return data;
    }
}
