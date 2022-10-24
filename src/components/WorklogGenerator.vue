<template>
  <div class="text-h4">Worklog Generator</div>
  <div class="q-mt-sm q-gutter-md">
    <div class="row justify-between">
      <div class="row q-gutter-md">
        <q-input
          v-model="ghStore.username"
          label="Github Username"
          filled
          @update:model-value="fetchContribRepos"
        />
        <q-input
          v-model="ghStore.token"
          label="Github Token"
          filled
          type="password"
        />
      </div>

      <div class="row q-gutter-md">
        <q-input v-model="ghStore.date" label="Month" filled type="date" />

        <q-btn
          no-caps
          color="primary"
          label="Generate"
          :loading="ghStore.loading"
          @click="ghStore.fetchMonthlyContributions()"
        />
      </div>
    </div>

    <div>
      <q-select
        filled
        v-model="ghStore.contribRepos"
        multiple
        :options="ghStore.repos"
        use-chips
        stack-label
        label="Contributing Repos"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGithubStore } from 'stores/github';
import { debounce } from 'quasar';
import { onBeforeMount, watch } from 'vue';
import { LocalStorage } from 'quasar';
import { LOCAL_STORAGE_KEYS } from 'stores/github';

const ghStore = useGithubStore();

onBeforeMount(() => {
  ghStore.fetchContribRepos('');
});

const today = new Date();
ghStore.date =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const fetchContribRepos = debounce(ghStore.fetchContribRepos, 500);

watch(
  () => ghStore.username,
  (username) => {
    LocalStorage.set(LOCAL_STORAGE_KEYS.USERNAME, username);
  },
  { deep: true }
);
</script>
