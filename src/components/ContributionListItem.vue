<template>
  <q-card flat bordered>
    <div class="row justify-between">
      <div class="q-pa-sm text-weight-light">{{ date }}</div>
      <q-btn flat dense no-caps icon-right="content_copy" color="primary" />
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
defineProps<{
  date: string;
  contributions: string[];
}>();
</script>
