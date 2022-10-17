export class SearchResponseDto {
    data: object;

    meta: PaginatorDto | null;
}

export class PaginatorDto {
    currentPage: number;
    lastPage: number;
    totalItem: number;
    limit: number;
}
