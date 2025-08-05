export type Page<T> = {
   items: T[];
   totalCount: number;
   pageSize: number;
   pageNumber: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPreviousPage: boolean;
   getNextPage: () => Promise<Page<T>>;
   getPreviousPage: () => Promise<Page<T>>;
};

export type PaginationOptions = {
   pageSize?: number;
   pageNumber?: number;
};
