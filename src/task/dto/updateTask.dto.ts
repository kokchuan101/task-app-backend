import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, MaxLength } from 'class-validator';

export class UpdateTaskDto {
    @ApiProperty({
        type: String,
        description: 'Task name',
        example: 'Center the button',
    })
    @IsOptional()
    @MaxLength(255)
    name: string;

    @ApiProperty({
        type: String,
        description: 'Task description',
        example:
            'Ensure button is horizontally and vertically aligned in the center of screen.',
    })
    @IsOptional()
    @MaxLength(255)
    description: string;

    @ApiProperty({
        type: Date,
        description: 'Task due date',
        example: '2022-10-16T22:08:42.514Z',
    })
    @IsOptional()
    @IsDateString()
    dueDate: Date;
}
