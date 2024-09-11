export interface Response<T> {
    data?: T
    message: string
    success: boolean
}

export interface Pagination<T> {
    items: T[]
    meta: {
        totalItems: number
        itemCount: number
        itemsPerPage: number
        totalPages: number
        currentPage: number
    }
}

export interface PaginatedResponse<T> extends Response<Pagination<T>> {}
