interface TopicVotes {
  positive: number;
  negative: number;
}

export default class TopicEntity {
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: Date;
  votes: TopicVotes;

  constructor(props: {
    name: string;
    description: string;
    category: string;
    picture: string;
    lastUpdated: Date | string;
    votes: TopicVotes;
  }) {
    this.name = props.name;
    this.description = props.description;
    this.category = props.category;
    this.picture = props.picture;
    this.lastUpdated =
      props.lastUpdated instanceof Date
        ? props.lastUpdated
        : new Date(props.lastUpdated);
    this.votes = props.votes;
  }

  get votesPercentage(): TopicVotes {
    const totalVotes = this.votes.positive + this.votes.negative;
    const positive = (this.votes.positive / totalVotes) * 100;
    const negative = 100 - positive;

    return {
      positive,
      negative,
    };
  }
}
