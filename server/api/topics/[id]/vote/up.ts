import { GetAllTopicsResponse } from "~/lib/topic/domain/dtos/topics.response";
import { VoteParams } from "./types";
import fs from "node:fs";

export default defineEventHandler(async (event) => {
  const data = await import("../../data.json");
  const { req, res } = event.node;
  const { id } = event.context.params as unknown as VoteParams;
  if (req.method === "POST") {
    const topic = data.data.find((topic) => topic.id === Number(id));
    if (!topic) {
      res.statusCode = 404;
      return {
        error: "Topic not found",
      };
    }
    topic.votes.positive++;
    topic.voted = true;
    fs.writeFileSync("../../data.json", JSON.stringify(data));
    return {
      ...topic,
    } satisfies GetAllTopicsResponse;
  }
});
