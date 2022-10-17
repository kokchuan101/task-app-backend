import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TaskQueryBuilder } from 'src/task/task.queryBuilder';
import { BaseQueryBuilder } from './baseQueryBuilder';
import { QueryFilterDto } from './dto/queryFilter.dto';
import { SearchResponseDto } from './dto/searchResponse.dto';
import { SearchableModule } from './enum/searchableModule.enum';

@Injectable()
export class SearchService {
    constructor(private moduleRef: ModuleRef) {}

    private queryBuilderMapping = {
        [SearchableModule.Task]: TaskQueryBuilder,
    };

    async search(
        module: SearchableModule,
        dto: QueryFilterDto,
    ): Promise<SearchResponseDto> {
        const queryBuilderObject: BaseQueryBuilder =
            await this.moduleRef.create(this.queryBuilderMapping[module]);

        const queryBuilder = queryBuilderObject.buildQuery(dto);
        const result = await queryBuilder.getManyAndCount();

        return {
            data: queryBuilderObject.transformData(result[0]),
            meta: queryBuilderObject.generatePaginationMetadata(result[1], dto),
        };
    }
}
