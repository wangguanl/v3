<template>
  <el-container ref="container" class="views__layout">
    <el-aside :width="isCollapse ? '65px' : '200px'">
      <el-scrollbar :native="false">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          :default-active="$route.name"
          :router="true"
        >
          <sidebar-item
            v-for="router in routes"
            :router="router"
            :key="router.name"
          />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <div class="breadcrumb">
          <i
            :class="[
              isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold',
              '_pointer',
            ]"
            @click="isCollapse = !isCollapse"
            class="pointer"
            style="font-size: 16px"
          />
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in levelList"
              :key="item.path"
            >
              <span
                v-if="
                  item.redirect === 'noredirect' ||
                  index == levelList.length - 1
                "
                class="no-redirect"
                >{{ item.meta.title }}</span
              >
              <router-link v-else :to="item.redirect || item.path">{{
                item.meta.title
              }}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-dropdown trigger="click">
          <span class="pointer">
            <!-- <img src="@/assets/images/face.png" style="height: 40px" /> -->
            <span style="margin-left: 10px">admin</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link
                :to="{ name: 'Login', params: { source: '修改密码' } }"
              >
                <el-dropdown-item> 修改密码 </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click="onLogout">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view #default="{ Component }">
          <!-- <component :is="Component" /> -->
          <!-- <transition name="el-fade-in"> -->
          <suspense>
            <template #default>
              <component :is="Component" />
            </template>

            <template #fallback>
              <div>加载中...</div>
            </template>
          </suspense>
          <!-- </transition> -->
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations } from "vuex";
import { USERINFO } from "@/store/types";
import { defineAsyncComponent } from "vue";
import sidebarItem from "./components/sidebarItem";
export default {
  components: {
    sidebarItem,
  },
  computed: {
    routes() {
      return this.$route.matched[0].children;
    },
  },
  watch: {
    $route: {
      handler() {
        this.levelList = this.$route.matched.filter((item) => item.name);
      },
      immediate: true,
    },
  },
  data() {
    return {
      isCollapse: false,
      levelList: [],
    };
  },
  methods: {
    ...mapMutations([USERINFO.mutations]),
    onLogout() {
      this[USERINFO.mutations]();
    },
  },
};
</script>

<style lang="scss">
.views__layout {
  height: 100%;
  width: 100%;
  overflow: hidden;
  & > .el-aside {
    background-color: #304156;
    overflow: hidden;
    transition: width 0.3s linear;
    .el-scrollbar {
      height: 100%;
      overflow: hidden;
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }

    .el-menu-vertical-demo {
      &:not(.el-menu--collapse) {
        width: 200px;
      }
      &,
      .el-menu--collapse {
        border-right: none;
      }
    }
  }

  & > .el-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    & > .el-header {
      width: 100%;
      box-shadow: 0 1px 2px #ebeeef;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .breadcrumb {
        display: flex;
        align-items: center;
        .el-breadcrumb {
          font-size: 14px;
          line-height: 50px;
          margin-left: 10px;
          .no-redirect {
            color: #97a8be;
            cursor: text;
          }
        }
      }
    }
    & > .el-main {
      height: 100%;
      width: 100%;
      padding: 0;
      overflow: hidden;
    }
  }
  .pointer {
    @extend %pointer;
  }
}
</style>
