import type TopicRepository from "../domain/topic.repository";

export default class VoteUp {
  constructor(private topicRepository: TopicRepository) {}

  async run(
    ...args: Parameters<TopicRepository["voteUp"]>
  ): ReturnType<TopicRepository["voteUp"]> {
    return this.topicRepository.voteUp(...args);
  }
}
