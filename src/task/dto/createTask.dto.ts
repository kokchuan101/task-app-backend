import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({
        type: String,
        description: 'Task name',
        example: 'Center the button',
    })
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @ApiProperty({
        type: String,
        description: 'Task description',
        example:
            'Ensure button is horizontally and vertically aligned in the center of screen.',
    })
    @IsNotEmpty()
    @MaxLength(255)
    description: string;

    @ApiProperty({
        type: Date,
        description: 'Task due date (ISO string)',
        example: '2022-10-16T22:05:27.820Z',
    })
    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;
}
