import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';
import { LogicalOperator, SortOrder } from '../enum/queryCondition.enum';

export class QueryDto {
    @ApiProperty({
        type: String,
        description: 'Database query param key',
        example: 'name',
    })
    @IsNotEmpty()
    @IsString()
    key: string;

    @ApiProperty({
        type: String,
        description: 'Database query param value',
        example: 'an action',
    })
    @IsNotEmpty()
    value: string | number;

    @ApiProperty({
        type: String,
        description: 'Database query param logical operator (AND/OR)',
        example: 'AND',
    })
    @IsNotEmpty()
    @IsEnum(LogicalOperator)
    operator: LogicalOperator = LogicalOperator.OR;
}

export class OrderByDto {
    @ApiProperty({
        type: String,
        description: 'Database orderby param key',
        example: 'createdAt',
    })
    @IsNotEmpty()
    @IsString()
    key: string;

    @ApiProperty({
        type: String,
        description: 'Database orderby sort direction',
        example: 'DESC',
    })
    @IsNotEmpty()
    @IsEnum(SortOrder)
    order: SortOrder = SortOrder.ASC;
}

export class QueryFilterDto {
    @ApiProperty({
        type: Number,
        description: 'Pagination current page',
        example: 1,
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    page: number = 1;

    @ApiProperty({
        type: Number,
        description: 'Pagination per page limit/row',
        example: 10,
    })
    @IsOptional()
    @IsNumber()
    limit: number = 10;

    @ApiProperty({
        type: QueryDto,
        isArray: true,
        description: 'Database query param',
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryDto)
    queries: QueryDto[] = [];

    @ApiProperty({
        type: {
            key: {
                type: String,
                description: 'Database orderby param key',
                example: 'createdAt',
            },
            order: {
                type: String,
                description: 'Database orderby sort direction',
                example: 'DESC',
            },
        },
        isArray: false,
        description: 'Database orderby query',
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderByDto)
    orderBys: OrderByDto[] = [];
}
