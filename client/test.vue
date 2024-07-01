<script setup lang="ts">
import { topicController } from '../lib/topic/infrastructure/dependencies';
topicController.getAllTopics({
	params: {
		page: 1,
		pageSize: 10,
	},
});
</script>

<template>
	<div>
		<h1>Test</h1>
	</div>
</template>