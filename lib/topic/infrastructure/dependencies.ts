import ApiRepository from "./api.repository";
import TopicController from "./topic.controller";
import GetAllTopics from "../application/get-all-topics";
import VoteUp from "../application/vote-up";
import VoteDown from "../application/vote-down";

const currentRepository = new ApiRepository();

export const topicController = new TopicController({
  getAllTopics: new GetAllTopics(currentRepository),
  voteUp: new VoteUp(currentRepository),
  voteDown: new VoteDown(currentRepository),
});
