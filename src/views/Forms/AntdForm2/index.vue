<template>
  <a-select
    default-value="lucy"
    style="width: 120px"
    @change="handleChange"
    allowClear
  >
    <a-select-option value="jack"> Jack </a-select-option>
    <a-select-option value="lucy"> Lucy </a-select-option>
    <a-select-option value="disabled" disabled> Disabled </a-select-option>
    <a-select-option value="Yiminghe"> yiminghe </a-select-option>
  </a-select>
</template>

<script>
export default {
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
};
</script>

<style>
</style>