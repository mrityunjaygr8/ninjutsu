interface Paginated<T> {
    items: Array<T>
    page: number,
    page_size: number,
    items_count: number,
    page_count: number
}


function CreateBlankPaginated<T>(): Paginated<T> {
    return {
        items: [] as Array<T>,
        items_count: 0,
        page: 0,
        page_count: 0,
        page_size: 0
    }
}

export { CreateBlankPaginated}

export type {Paginated}