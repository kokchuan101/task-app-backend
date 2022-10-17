import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from '../enum/taskStatus.enum';

@Entity()
export class Task {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Center the button' })
    @Column()
    name: string;

    @ApiProperty({
        example:
            'Ensure button is horizontally and vertically aligned in the center of screen.',
    })
    @Column()
    description: string;

    @ApiProperty()
    @Column({ type: 'timestamp' })
    dueDate: Date;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ApiProperty()
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;

    @ApiProperty({ example: 'Not Urgent' })
    status: TaskStatus;

    static getResponse(task: Task) {
        const dayDifference = moment(task.dueDate).diff(
            moment().startOf('day'),
            'days',
        );
        task.status = TaskStatus.NOT_URGENT;

        if (dayDifference < 0) {
            task.status = TaskStatus.OVERDUE;
        } else if (dayDifference <= 7) {
            task.status = TaskStatus.DUE_SOON;
        }
        return task;
    }
}
