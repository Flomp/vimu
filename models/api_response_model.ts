interface APIResponse<T> {
    status: 'success' | 'error'
    message?: string,
    data: T
}