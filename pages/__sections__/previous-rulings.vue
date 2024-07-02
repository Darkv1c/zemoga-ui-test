<script setup lang="ts">
import CardList from '~/components/card-list/card-list.vue';
import Card from '~/components/card/card.vue';
import type TopicEntity from '~/lib/topic/domain/topic.entity';
import { topicController } from '~/lib/topic/infrastructure/dependencies';

const topics = ref<TopicEntity[]>([]);

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
    <span :class="styles.sectionTitle">Previous Rulings</span>
    <CardList>
        <Card v-for="topic in topics" :topic="topic" list />
    </CardList>
</template>


<style lang="scss" module="styles">
.sectionTitle {
    padding-inline: 16px;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.8rem;
    text-align: left;
}
</style>