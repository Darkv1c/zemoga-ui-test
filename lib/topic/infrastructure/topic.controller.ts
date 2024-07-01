import type GetAllTopics from "../application/get-all-topics";

export default class TopicController {
  constructor(
    private useCases: {
      getAllTopics: GetAllTopics;
    }
  ) {}

  async getAllTopics(
    ...args: Parameters<GetAllTopics["run"]>
  ): ReturnType<GetAllTopics["run"]> {
    return this.useCases.getAllTopics.run(...args);
  }
}
