import ApiRepository from "./api.repository";
import TopicController from "./topic.controller";
import GetAllTopics from "../application/get-all-topics";

const currentRepository = new ApiRepository();

export const topicController = new TopicController({
  getAllTopics: new GetAllTopics(currentRepository),
});
