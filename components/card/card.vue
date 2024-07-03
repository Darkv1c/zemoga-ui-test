<script setup lang="ts">
import type { CardProps } from './card.types';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import PercentageBar from '../percentage-bar/percentage-bar.vue';
import { CheckButtonVariant } from '../check-button/check-button.types';

TimeAgo.addDefaultLocale(en)

const emit = defineEmits<{
  vote: [{
    topicId: number,
    votes: {
      positive: boolean;
      negative: boolean;
    }
  }],
}>()


const timeAgo = new TimeAgo('en-US')

const props = defineProps<CardProps>()

const { topic } = toRefs(props)

const voteAgain = ref(topic.value.voted);

const topicImage = `url(${topic.value.picture})`

const mainlyPositive = computed(() => {
  return topic.value.votesPercentage.positive > 50
})

const formattedDate = computed(() => {
  return `${timeAgo.format(topic.value.lastUpdated)} in ${topic.value.category}`
});

const backgroundImage = computed(() => {
  if (!props.list) {
    return topicImage
  }

  const gradient = `linear-gradient(
    to right, 
    rgba(0, 0, 0, 0.0001) 0%, 
    #888888 19.79%, 
    #666666 50%, 
    rgba(51, 51, 51, 0.6) 71.88%
  )`
  return `${gradient}, ${topicImage}`
})

const buttonText = computed(() => {
  return voteAgain.value ? 'Vote Again' : 'Vote Now'
})

const eyeLineText = computed(() => {
  return voteAgain.value ? 'Than you for your vote' : formattedDate.value
})

function onClick(_props: {
  votes: {
    positive: boolean;
    negative: boolean;
  }
}) {
  if (voteAgain.value) {
    voteAgain.value = false
  } else {
    emit('vote', { votes: _props.votes, topicId: topic.value.id })
    voteAgain.value = true
  }
}

</script>

<template>
  <div :class="styles.container">
    <div :class="styles.infoContainer">
      <div />
      <div :class="styles.titleAndDescription">
        <div :class="styles.titleContainer">
          <CheckButton v-if="mainlyPositive" :class="styles.titleThumb"><img :class="styles.thumb"
              src="/assets/img/thumbs-up.svg" alt="Positive" />
          </CheckButton>
          <CheckButton v-else :class="styles.titleThumb" :variant="CheckButtonVariant.Secondary"><img
              :class="styles.thumb" src="/assets/img/thumbs-down.svg" alt="Negative" /></CheckButton>
          <div :class="styles.title">
            {{ topic.name }}
          </div>
        </div>
        <div :class="styles.description">{{ topic.description }}</div>
      </div>
      <div :class="styles.vote">
        <div :class="styles.time">{{ eyeLineText }} </div>
        <CheckButtonCombo @buttonClick="onClick" :buttonText="buttonText" :keepButtonAvailable="voteAgain" />
      </div>
    </div>
    <PercentageBar :positive="topic.votesPercentage.positive" :negative="topic.votesPercentage.negative" />
  </div>
</template>

<style lang="scss" module="styles">
@import '../../styles/index.scss';

.maxTwoLines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.container {
  position: v-bind("list ? 'static' : 'relative'");
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: v-bind("list ? '100%' : '300px'");
  min-height: v-bind("list ? '140px' : '300px'");
  max-width: v-bind("list ? '100%' : '366px'");
  overflow: hidden;
  z-index: 2;

  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: v-bind("list ? 'scale(1.5)' : 'none'");
    transform-origin: left;
    background-size: v-bind("list ? 'contain' : 'cover'");
    background-repeat: no-repeat;
    background-position: left;
    background-image: v-bind(backgroundImage);
  }

  & * {
    color: $white;
  }

  .infoContainer {
    display: v-bind("list ? 'grid' : 'flex'");
    flex-direction: column;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 28px;
    box-sizing: border-box;
    padding: 12px 36px;
    min-width: 100%;
    flex: 1;

    .titleAndDescription {
      margin-top: v-bind("list ? '' : 'auto'");

      .titleContainer {
        position: v-bind("list ? 'static' : 'relative'");
        margin-top: v-bind("list ? '' : 'auto'");

        .title {
          @extend .maxTwoLines;
          font-size: 1.875rem;
          font-weight: 400;
          line-height: 2.25rem;
          margin-top: auto;
          margin-bottom: 8px;
          overflow: visible;
          overflow-y: hidden;
        }

        .titleThumb {
          position: absolute;
          bottom: v-bind("list ? '' : '0'");
          top: v-bind("list ? '0' : ''");
          right: v-bind("list ? '' : '100%'");
          left: v-bind("list ? '0' : ''");

          img {
            min-width: 1rem;
            min-height: 1rem;
          }
        }
      }


      .description {
        @extend .maxTwoLines;
        font-size: 0.938rem;
        font-weight: 400;
        line-height: 1.125rem;
        margin-bottom: 12px;
      }
    }


    .vote {

      .time {
        font-size: 0.75rem;
        font-weight: 700;
        line-height: 0.9rem;
        margin-bottom: 12px;
        text-align: right;
      }
    }

  }
}

@media all and (max-width: 768px) {
  .container {
    position: relative;
    min-width: 300px;
    min-height: 300px;
    max-width: 366px;

    &::before {
      transform: none;
      transform-origin: left;
      background-size: cover;
      background-image: v-bind(topicImage);
    }

    .infoContainer {
      display: flex;

      .titleAndDescription {
        margin-top: auto;

        .titleContainer {
          position: relative;
          margin-top: auto;

          .titleThumb {
            bottom: 0;
            top: unset;
            right: 100%;
            left: unset;

            img {
              min-width: 1rem;
              min-height: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>