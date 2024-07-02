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
    picture: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2019_30/2943751/190723-plastic-bags-ew-1251p.jpg'
})
</script>

<template>
    <div>
        <Card :topic="topic" />
    </div>
</template>


<style scoped></style>