<template>
  <div>Contrition Item: {{ id }}</div>
</template>

<script lang="ts" setup>
defineProps<{
  id: number;
}>();
</script>
