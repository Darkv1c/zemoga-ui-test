import type { ListDTO } from "./list.dto";

type GetElement<Entity extends Record<string, any>> = (props: {
  page: number;
  pageSize: number;
}) => Promise<Entity[]>;

export default class List<Entity extends Record<string, any>> {
  elements: Entity[];
  total: number;
  page: number;
  pageSize: number;
  getElements: GetElement<Entity>;

  constructor(
    props: ListDTO<Entity> & {
      getElements: GetElement<Entity>;
      pageSize?: number;
    }
  ) {
    this.elements = props.elements;
    this.total = props.total;
    this.page = props.page;
    this.pageSize = props.pageSize ?? 10;
    this.getElements = props.getElements;
  }

  get isLastPage(): boolean {
    return this.elements.length === this.total;
  }

  getMore = async (): Promise<void> => {
    const elements = await this.getElements({
      page: this.page++,
      pageSize: this.pageSize,
    });
    this.elements.concat(elements);
  };
}
