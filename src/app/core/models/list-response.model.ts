export default interface ListResponse<T> {
  success: boolean;
  count: number;
  items: T[];
}
