export interface IPaginationResponse<T> {
  count: number,
  next: number,
  previous: string,
  results: T[]
}
