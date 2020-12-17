<template>
  <a-input v-model:value="modelValue.jrbzh" />
</template>

<script>
import { h } from "vue";
export default {
  props: ["modelValue"],
  setup({ modelValue }) {
    /* return () =>
      h(
        <a-input
          vModel={modelValue.jrbzh}
          onChange={(e) => (modelValue.jrbzh = e.target.value)}
        />
      ) */
  },
};
</script>

<style>
</style>