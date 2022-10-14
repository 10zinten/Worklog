<template>
  <q-page padding>
    <div class="text-h5">Worklog Generator</div>
    <div class="q-mt-sm q-gutter-md">
      <div class="row">
        <q-input v-model="username" label="Github Username" filled />
        <q-input
          class="q-ml-md"
          v-model="date"
          label="Month"
          filled
          type="date"
        />

        <q-btn no-caps class="q-ml-lg" color="primary" label="Generate" />
      </div>

      <div>
        <q-select
          filled
          v-model="contribRepos"
          multiple
          :options="allRepos"
          use-chips
          stack-label
          label="Contributing Repos"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');

const today = new Date();
const dateString =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const date = ref(dateString);

const allRepos = ref(['repo1', 'repo2', 'repo3']);
const contribRepos = ref([]);
</script>
