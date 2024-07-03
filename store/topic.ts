import type { GetAllTopicsRequest } from "~/lib/topic/domain/dtos/topics.rquest";
import type TopicEntity from "~/lib/topic/domain/topic.entity";
import { topicController } from "~/lib/topic/infrastructure/dependencies";

class TopicStore {
  private _topics = reactive({
    elements: [] as TopicEntity[],
  });

  async getAll(props: { params: GetAllTopicsRequest }) {
    const { params } = props;
    const response = await topicController.getAllTopics({
      params,
    });
    this._topics.elements = response.elements;
  }

  get topics() {
    return this._topics.elements;
  }
}

export default new TopicStore();
