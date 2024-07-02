import type TopicEntity from "~/lib/topic/domain/topic.entity";

export interface CardProps {
  topic: TopicEntity;
  list?: boolean;
}
