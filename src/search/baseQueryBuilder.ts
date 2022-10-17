import { Type } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { OrderByDto, QueryDto, QueryFilterDto } from './dto/queryFilter.dto';
import { PaginatorDto } from './dto/searchResponse.dto';
import { LogicalOperator } from './enum/queryCondition.enum';

export interface KeyType {
    [key: string]: Type<any>;
}

export abstract class BaseQueryBuilder {
    protected repository: Repository<unknown>;

    protected abstract queryKeys: KeyType;
    protected abstract orderByKeys: string[];

    buildQuery(dto: QueryFilterDto) {
        const queryBuilder = this.repository.createQueryBuilder();
        this.buildWhere(queryBuilder, dto.queries);
        this.buildOrderBy(queryBuilder, dto.orderBys);
        this.buildPaginator(queryBuilder, dto);

        return queryBuilder;
    }

    buildWhere(
        queryBuilder: SelectQueryBuilder<unknown>,
        queries: QueryDto[],
    ): void {
        let condition;
        for (const query of queries) {
            if (!this.queryKeys[query.key]) {
                continue;
            }

            // default condition
            condition = `${query.key} = :${query.key}`;

            if (this.queryKeys[query.key] === String) {
                condition = `${query.key} like :${query.key}`;
                query.value = `%${query.value}%`;
            }

            if (query.operator === LogicalOperator.AND) {
                queryBuilder.andWhere(condition, { [query.key]: query.value });
            } else {
                queryBuilder.orWhere(condition, { [query.key]: query.value });
            }
        }
    }

    buildOrderBy(
        queryBuilder: SelectQueryBuilder<unknown>,
        orderBys: OrderByDto[],
    ): void {
        for (const orderBy of orderBys) {
            if (!this.orderByKeys.includes(orderBy.key)) {
                continue;
            }

            queryBuilder.addOrderBy(orderBy.key, orderBy.order);
        }
    }

    buildPaginator(
        queryBuilder: SelectQueryBuilder<unknown>,
        dto: QueryFilterDto,
    ): void {
        if (dto.limit > 0) {
            const skip = (dto.page - 1) * dto.limit;
            queryBuilder.skip(skip).take(dto.limit);
        }
    }

    generatePaginationMetadata(
        totalItem: number,
        dto: QueryFilterDto,
    ): PaginatorDto | null {
        if (dto.limit <= 0) {
            return null;
        }

        return {
            currentPage: dto.page,
            lastPage: Math.ceil(totalItem / dto.limit),
            totalItem: totalItem,
            limit: dto.limit,
        };
    }

    transformData(data) {
        return data;
    }
}
