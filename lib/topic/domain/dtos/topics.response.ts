export interface TopicVotes {
  positive: number;
  negative: number;
}
export interface GetAllTopicsResponse {
  id: number;
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: TopicVotes;
  voted: boolean;
}
