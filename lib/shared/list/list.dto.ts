export interface ListDTO<Entity> {
  elements: Entity[];
  total: number;
  page: number;
}
