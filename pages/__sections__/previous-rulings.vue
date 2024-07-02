<script setup lang="ts">
import Card from '~/components/card/card.vue';
import TopicEntity from '~/lib/topic/domain/topic.entity';

const topic = new TopicEntity({
    name: 'Should we ban plastic bags?',
    description: 'Plastic bags are harmful to the environment and wildlife.',
    lastUpdated: new Date('2021-09-01'),
    category: 'Environment',
    votes: {
        positive: 70,
        negative: 30
    },
    picture: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
})
</script>

<template>
    <div>
        <Card :topic="topic" />
    </div>
</template>


<style scoped></style>