import type { ListDTO } from "~/lib/shared/list/list.dto";
import type { GetAllTopicsResponse } from "../domain/dtos/topics.response";
import type TopicRepository from "../domain/topic.repository";
import TopicEntity from "../domain/topic.entity";
import type { GetAllTopicsRequest } from "../domain/dtos/topics.rquest";

export default class ApiRepository implements TopicRepository {
  async getAllTopics(props: {
    params: GetAllTopicsRequest;
  }): Promise<ListDTO<TopicEntity>> {
    const { params } = props;
    const queryParams = new URLSearchParams(
      params as unknown as Record<string, string>
    );
    const response = await fetch(
      `http://localhost:3000/api/topics?${queryParams.toString()}`
    );

    const dto: ListDTO<GetAllTopicsResponse> = await response.json();
    const formattedElements = dto.elements.map(
      (element) => new TopicEntity({ ...element })
    );

    return {
      ...dto,
      elements: formattedElements,
    };
  }

  async voteUp(
    ...[props]: Parameters<TopicRepository["voteUp"]>
  ): ReturnType<TopicRepository["voteUp"]> {
    const { topicId } = props;
    const response = await fetch(`/api/topics/${topicId}/vote/up`, {
      method: "POST",
    });
    const data = await response.json();

    return new TopicEntity({ ...data });
  }

  async voteDown(
    ...[props]: Parameters<TopicRepository["voteDown"]>
  ): ReturnType<TopicRepository["voteDown"]> {
    const { topicId } = props;
    const response = await fetch(`/api/topics/${topicId}/vote/down`, {
      method: "POST",
    });
    const data = await response.json();

    return new TopicEntity({ ...data });
  }
}
