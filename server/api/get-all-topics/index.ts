import { GetAllTopicsResponse } from "~/lib/topic/domain/dtos/topics.response";
import { ListDTO } from "~/lib/shared/list/list.dto";
import { GetAllTopicsRequest } from "~/lib/topic/domain/dtos/topics.rquest";

export default defineEventHandler(async (event) => {
  const data = await import("./data.json");
  const { req } = event.node;
  const { page } = getQuery<GetAllTopicsRequest>(event);
  if (req.method === "GET") {
    return {
      elements: data.data,
      total: data.data.length,
      page: Number(page) || 1,
    } satisfies ListDTO<GetAllTopicsResponse>;
  }
});
