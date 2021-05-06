<template>
  <el-menu-item
    v-if="!router.children.length"
    :route="{ name: router.name }"
    :index="router.name"
    :key="router.name"
  >
    <i :class="router.meta.icon" />
    <template #title>{{ router.meta.title }}</template>
  </el-menu-item>
  <el-submenu v-else :index="router.name" :key="router.name">
    <template #title>
      <i :class="router.meta.icon" />
      <span>{{ router.meta.title }}</span>
    </template>
    <sidebar-item
      v-for="child in router.children"
      :router="child"
      :key="child.name"
    />
  </el-submenu>
</template>

<script>
import components from "@/components/index";
export default {
  name: "SidebarItem",
  props: ["router"],
};
</script>