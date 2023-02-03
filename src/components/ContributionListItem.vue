<template>
  <q-card flat bordered>
    <div class="row justify-between">
      <div class="q-pa-sm text-weight-light">{{ pretifyDate(date) }}</div>
      <q-btn
        flat
        dense
        no-caps
        icon-right="content_copy"
        color="primary"
        @click="copy(index)"
      />
    </div>

    <q-card-section class="bg-blue-grey-1">
      <div v-if="contributions">
        <div v-for="(contrib, index) in contributions" :key="index">
          {{ contrib }}
        </div>
      </div>
      <div v-else>Loading...</div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { useGithubStore } from 'stores/github';
import { copyToClipboard, useQuasar } from 'quasar';

defineProps<{
  index: number;
  date: string;
  contributions: string[];
}>();

const ghStore = useGithubStore();
const $q = useQuasar();

function pretifyDate(date: string) {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

const copy = (index: number) => {
  const contrib = ghStore.monthlyContributions[index].contributions.join('\n');
  copyToClipboard(contrib)
    .then(() => {
      $q.notify({
        message: 'Copied to clipboard',
        color: 'positive',
        position: 'top',
      });
    })
    .catch(() => {
      $q.notify({
        message: 'Failed to copy to clipboard',
        color: 'negative',
        position: 'top',
      });
    });
};
</script>
