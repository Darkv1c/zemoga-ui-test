<script setup lang="ts">
import CardList from '~/components/card-list/card-list.vue';
import Card from '~/components/card/card.vue';
import type { SelectOption } from '~/components/select/select.types';
import type TopicEntity from '~/lib/topic/domain/topic.entity';
import { topicController } from '~/lib/topic/infrastructure/dependencies';

const topics = ref<TopicEntity[]>([]);
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

(async function () {
    const response = await topicController.getAllTopics({
        params: {
            page: 1,
            pageSize: 6,
        },
    });
    topics.value = response.elements;
})()

</script>

<template>
    <span :class="styles.sectionHeader">
        <span :class="styles.sectionTitle">Previous Rulings</span>
        <Select generic="boolean" :options="options" v-model:current-option="isListMode" />
    </span>
    <CardList :list="isListMode">
        <Card v-for="topic in topics" :topic="topic" :list="isListMode" />
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