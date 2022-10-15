<template>
  <q-card flat bordered>
    <div class="row justify-between">
      <div class="q-pa-sm text-weight-light">01/10/2022</div>
      <q-btn flat dense no-caps icon-right="content_copy" color="primary" />
    </div>

    <q-card-section class="bg-blue-grey-1">
      <div>
        https://github.com/OpenPecha/dakje/commits?author=10zinten&since=2022-10-09&until=2022-10-10
      </div>
      <div>
        https://github.com/OpenPecha/dakje/commits?author=10zinten&since=2022-10-09&until=2022-10-10
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
defineProps<{
  id: number;
}>();
</script>
