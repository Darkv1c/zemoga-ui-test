import type List from "~/lib/shared/list/list";
import type TopicEntity from "./topic.entity";

export default interface TopicRepository {
  getAllTopics(): Promise<List<TopicEntity>>;
}
