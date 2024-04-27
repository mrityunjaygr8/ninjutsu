interface Paginated<T> {
    items: Array<T>
    page: number,
    page_size: number,
    items_count: number,
    page_count: number
}

export type {Paginated}