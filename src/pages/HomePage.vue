<template>
  <q-page padding>
    <PageContainer>
      <WorklogGenerator />
      <q-separator class="q-mt-lg" />
      <GithubContribution />
    </PageContainer>
  </q-page>
</template>

<script setup lang="ts">
import PageContainer from 'components/PageContainer.vue';
import WorklogGenerator from 'components/WorklogGenerator.vue';
import GithubContribution from 'components/GithubContribution.vue';
</script>
