<template>
  <div class="text-h5">Worklog Generator</div>
  <div class="q-mt-sm q-gutter-md">
    <div class="row justify-between">
      <div class="row q-gutter-md">
        <q-input v-model="username" label="Github Username" filled />
        <q-input v-model="date" label="Month" filled type="date" />
      </div>

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
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const username = ref('');

const today = new Date();
const dateString =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const date = ref(dateString);

const allRepos = ref(['repo1', 'repo2', 'repo3']);
const contribRepos = ref([]);
</script>
