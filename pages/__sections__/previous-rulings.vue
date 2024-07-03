<script setup lang="ts">
import CardList from '~/components/card-list/card-list.vue';
import Card from '~/components/card/card.vue';
import type { SelectOption } from '~/components/select/select.types';
import { topicController } from '~/lib/topic/infrastructure/dependencies';
import { topicStore } from '~/store';

const options: SelectOption<boolean>[] = [
    {
        value: true,
        label: 'list',
    },
    {
        value: false,
        label: 'grid',
    }
];
const isListMode = ref<boolean>(options[0].value);

async function vote(params: { topicId: number, votes: { positive: boolean, negative: boolean } }) {
    if (params.votes.positive) {
        await topicController.voteUp(params);
    } else if (params.votes.negative) {
        await topicController.voteDown(params);
    }

    await getTopics();
}

const getTopics = async () => {
    await topicStore.getAll({
        params: {
            page: 1,
            pageSize: 6,
        },
    });
}

getTopics()
</script>

<template>
    <span :class="styles.sectionHeader">
        <span :class="styles.sectionTitle">Previous Rulings</span>
        <Select generic="boolean" :options="options" v-model:current-option="isListMode" />
    </span>
    <CardList :list="isListMode">
        <Card v-for="topic in topicStore.topics" :key="JSON.stringify(topic)" @vote="vote" :topic="topic"
            :list="isListMode" />
    </CardList>
</template>

<style lang="scss" module="styles">
.sectionHeader {
    display: flex;
    justify-content: space-between;
    padding-inline: 16px;

    .sectionTitle {
        font-size: 1.5rem;
        font-weight: 300;
        line-height: 1.8rem;
        text-align: left;
    }
}
</style>