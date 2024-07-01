export interface TopicVotes {
  positive: number;
  negative: number;
}
export interface GetAllTopicsResponse {
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: TopicVotes;
}
