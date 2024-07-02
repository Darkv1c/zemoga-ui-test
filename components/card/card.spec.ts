import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "./card.vue";
import type { CardProps } from "./card.types";
import TopicEntity from "~/lib/topic/domain/topic.entity";

const exampleTopicProps = {
  name: "Example Name",
  description: "Example Description",
  category: "Example Category",
  picture: "Example Picture",
  lastUpdated: new Date(),
  votes: {
    positive: 10,
    negative: 15,
  },
};

const exampleTopic = new TopicEntity(exampleTopicProps);

const props: CardProps = {
  topic: exampleTopic,
};

describe("Card", () => {
  it("should render the right name passed by properties", () => {
    const wrapper = mount(Card, {
      props,
    });

    expect(wrapper.text()).toContain(props.topic.name);
  });

  it("should render the right description passed by properties", () => {
    const wrapper = mount(Card, {
      props,
    });

    expect(wrapper.text()).toContain(props.topic.description);
  });

  it("should render the right time and category", () => {
    function getWrapper(props: { date: Date }) {
      const { date } = props;
      return mount(Card, {
        props: {
          topic: new TopicEntity({
            ...exampleTopicProps,
            lastUpdated: date,
          }),
        },
      });
    }

    const day = 1000 * 60 * 60 * 24;
    const month = day * 30;

    let date = new Date();

    let wrapper = getWrapper({ date });
    expect(wrapper.text()).toContain(`just now in ${props.topic.category}`);

    date = new Date(date.getTime() - 3 * day);
    wrapper = getWrapper({ date });
    expect(wrapper.text()).toContain(`3 days ago in ${props.topic.category}`);

    date = new Date(date.getTime() - 1 * month);
    wrapper = getWrapper({ date });
    expect(wrapper.text()).toContain(`1 month ago in ${props.topic.category}`);
  });

  it("should render the right percentage of votes", () => {
    function validatePercentage(props: { positive: number; negative: number }) {
      const { positive, negative } = props;
      const wrapper = mount(Card, {
        props: {
          topic: new TopicEntity({
            ...exampleTopicProps,
            votes: {
              positive,
              negative,
            },
          }),
        },
      });

      const totalVotes = positive + negative;

      const positivePercentage = Number(
        ((positive / totalVotes) * 100).toFixed(2)
      );
      const negativePercentage = Number(
        ((negative / totalVotes) * 100).toFixed(2)
      );

      expect(wrapper.text()).toContain(`${positivePercentage}%`);
      expect(wrapper.text()).toContain(`${negativePercentage}%`);
    }

    validatePercentage({ positive: 10, negative: 10 });
    validatePercentage({ positive: 0, negative: 10 });
    validatePercentage({ positive: 10, negative: 0 });
    validatePercentage({ positive: 121, negative: 67 });
  });

  it("should render a button to vote", async () => {
    const wrapper = mount(Card, {
      props,
    });

    const button = wrapper.find("button");
    expect(button.text()).toContain("Vote Now");
  });
  it("should render a button to vote", async () => {
    const wrapper = mount(Card, {
      props,
    });

    const button = wrapper.find("button");
    expect(button.text()).toContain("Vote Now");
  });
  it("should render 2 check buttons: 'thumbs up' and 'thumbs down'", async () => {
    const wrapper = mount(Card, {
      props,
    });

    const voteButtons = wrapper.findAll(".voteButton");
    expect(voteButtons.length).toBe(2);
  });
});
