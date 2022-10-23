<template>
  <div class="q-gutter-lg">
    <ContributionListItem
      v-for="dailyContrib in monthlyContributions"
      :date="dailyContrib.date"
      :contributions="dailyContrib.contributions"
      :key="dailyContrib.date"
    />
  </div>
</template>

<script lang="ts" setup>
import ContributionListItem from './ContributionListItem.vue';
import { useGithubStore } from 'stores/github';
import { storeToRefs } from 'pinia';

const ghStore = useGithubStore();
const { monthlyContributions } = storeToRefs(ghStore);
</script>
