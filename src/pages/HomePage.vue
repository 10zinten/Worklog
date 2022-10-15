<template>
  <q-page padding>
    <PageContainer>
      <WorklogGenerator />
      <GithubContribution />
      <q-page-scroller position="bottom" :scroll-offset="150">
        <q-btn fab icon="keyboard_arrow_up" color="info" />
      </q-page-scroller>
    </PageContainer>
  </q-page>
</template>

<script setup lang="ts">
import PageContainer from 'components/PageContainer.vue';
import WorklogGenerator from 'components/WorklogGenerator.vue';
import GithubContribution from 'components/GithubContribution.vue';
</script>
