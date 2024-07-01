import type TopicEntity from "./topic.entity";
import type { GetAllTopicsRequest } from "./dtos/topics.rquest";
import type { ListDTO } from "~/lib/shared/list/list.dto";

export default interface TopicRepository {
  getAllTopics(props: {
    params: GetAllTopicsRequest;
  }): Promise<ListDTO<TopicEntity>>;
}
