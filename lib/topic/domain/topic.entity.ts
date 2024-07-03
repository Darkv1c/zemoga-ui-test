import type { TopicVotes } from "./dtos/topics.response";

export default class TopicEntity {
  id: number;
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: Date;
  votes: TopicVotes;
  voted: boolean;

  constructor(props: {
    id: number;
    name: string;
    description: string;
    category: string;
    picture: string;
    lastUpdated: Date | string;
    votes: TopicVotes;
    voted: boolean;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.category = props.category;
    this.picture = props.picture;
    this.lastUpdated =
      props.lastUpdated instanceof Date
        ? props.lastUpdated
        : new Date(props.lastUpdated);
    this.votes = props.votes;
    this.voted = props.voted;
  }

  get votesPercentage(): TopicVotes {
    const totalVotes = this.votes.positive + this.votes.negative;
    const positive = Number(
      ((this.votes.positive / totalVotes) * 100).toFixed(2)
    );
    const negative = Number((100 - positive).toFixed(2));

    return {
      positive,
      negative,
    };
  }
}
