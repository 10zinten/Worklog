<template>
  <div>
    <div class="text-h5 text-weight-light q-mt-lg q-mb-xl">
      Your Contributions
    </div>
    <div v-if="ghStore.loading">
      <q-spinner-ios color="primary" size="2em" />
      <span class="q-ml-md"> Fetch branches... </span>
    </div>
    <div v-else>
      <ContributionList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ContributionList from 'components/ContributionList.vue';
import { useGithubStore } from 'stores/github';

const ghStore = useGithubStore();
</script>
