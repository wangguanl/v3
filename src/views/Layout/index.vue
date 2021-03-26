<template>
  <el-container ref="container" class="wrap">
    <el-aside width="auto" style="background-color: #304156; overflow: hidden">
      <el-scrollbar :native="false" style="height: 100%; overflow: hidden">
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
    <el-container class="container">
      <el-header class="header">
        <div class="_flex _flex-items-center">
          <i
            :class="[
              isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold',
              '_pointer',
            ]"
            @click="isCollapse = !isCollapse"
            class="pointer"
            style="font-size: 16px"
          ></i>
          <el-breadcrumb class="app-breadcrumb" separator="/">
            <transition-group name="breadcrumb">
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
            </transition-group>
          </el-breadcrumb>
        </div>
        <div></div>
        <el-dropdown class="_pointer" trigger="click">
          <span class="el-dropdown-link">
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
      <el-main class="main">
        <router-view #default="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations } from "vuex";
import { defineAsyncComponent } from "vue";
export default {
  data() {
    return {
      isCollapse: false,
      levelList: null,
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    onLogout() {
      this.SET_USERINFO();
    },
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
  components: {
    sidebarItem: defineAsyncComponent(() => import("./components/sidebarItem")),
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  border-right: none;
}

.el-scrollbar {
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.wrap {
  height: 100%;
  width: 100%;
  overflow: hidden;
  @at-root .aside {
    height: 100%;
    background: #fff;
    box-shadow: 0 0 5px #ccc;
    padding-top: 50px;
  }

  & > .container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    @at-root .header {
      width: 100%;
      box-shadow: 0 1px 2px #ebeeef;
      // background: linear-gradient(90deg, #02cab0, #28d3ee);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & > .main {
      height: 100%;
      width: 100%;
      padding: 0;
      overflow: hidden;
    }
  }
}
.layout-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
/* 为对应的路由跳转时设置动画效果 */
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
