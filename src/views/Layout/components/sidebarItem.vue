<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <el-menu-item v-if="item.component" :index="item.name" :key="item.name">
        <img v-if="item.meta.icon" :src="baseImgURL + item.meta.icon" />
        <template #title>
          <span v-show="!isCollapse">{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-submenu v-else :index="item.name" :key="item.name">
        <template #title>
          <img v-if="item.meta.icon" :src="baseImgURL + item.meta.icon" />
          <span v-show="!isCollapse">{{ item.meta.title }}</span>
        </template>

        <template v-for="child in item.children">
          <sidebar-item
            v-if="child.children.length"
            :routes="[child]"
            :key="child.name"
          ></sidebar-item>
          <el-menu-item v-else :index="child.name" :key="child.name">
            <img v-if="child.meta.icon" :src="baseImgURL + child.meta.icon" />
            <template #title>
              <span>{{ child.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { baseImgURL } from "@/basics/request";
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
    isCollapse: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      baseImgURL,
    };
  },
};
</script>
<style lang="scss" scoped>
img {
  margin-right: 10px;
  /* width: 20px;
  height: 20px; */
}
</style>