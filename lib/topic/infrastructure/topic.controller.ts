import type GetAllTopics from "../application/get-all-topics";
import type VoteDown from "../application/vote-down";
import type VoteUp from "../application/vote-up";
import type TopicRepository from "../domain/topic.repository";

export default class TopicController {
  constructor(
    private useCases: {
      getAllTopics: GetAllTopics;
      voteUp: VoteUp;
      voteDown: VoteDown;
    }
  ) {}

  async getAllTopics(
    ...args: Parameters<GetAllTopics["run"]>
  ): ReturnType<GetAllTopics["run"]> {
    return this.useCases.getAllTopics.run(...args);
  }

  async voteUp(
    ...args: Parameters<TopicRepository["voteUp"]>
  ): ReturnType<VoteUp["run"]> {
    return this.useCases.voteUp.run(...args);
  }

  async voteDown(
    ...args: Parameters<TopicRepository["voteDown"]>
  ): ReturnType<VoteDown["run"]> {
    return this.useCases.voteDown.run(...args);
  }
}
