import type List from "~/lib/shared/list/list";
import type TopicRepository from "../domain/topic.repository";
import type TopicEntity from "../domain/topic.entity";

export default class GetAllTopics {
  constructor(private topicRepository: TopicRepository) {}

  async run(
    ...args: Parameters<TopicRepository["getAllTopics"]>
  ): ReturnType<TopicRepository["getAllTopics"]> {
    return this.topicRepository.getAllTopics(...args);
  }
}
