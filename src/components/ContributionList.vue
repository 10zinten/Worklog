<template>
  <div>
    <ContributionListItem v-for="id in 10" :id="id" :key="id" />
  </div>
</template>

<script lang="ts" setup>
import ContributionListItem from './ContributionListItem.vue';
</script>
