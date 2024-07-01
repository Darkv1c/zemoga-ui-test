import { GetAllTopicsResponse } from "~/lib/topic/domain/dtos/topics.response";
import data from "./data.json";
import { ListDTO } from "~/lib/shared/list/list.dto";
import { GetAllTopicsRequest } from "~/lib/topic/domain/dtos/topics.rquest";

export default defineEventHandler((event) => {
  const { req } = event.node;
  const { page } = getQuery<GetAllTopicsRequest>(event);
  if (req.method === "GET") {
    return {
      elements: data.data,
      total: data.data.length,
      page: Number(page) || 1,
    } satisfies ListDTO<GetAllTopicsResponse>;
  }
  if (req.method === "POST") {
    // create a blog
    // return the blog;
  }
});
