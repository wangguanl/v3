<template>
  <div>
    <div class="plugin-loading" v-show="false">
      <div class="mark"></div>
      <div class="donut"></div>
      <div class="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="loading">
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
      </div>
    </div>

    Hooks
    <el-button @click="useNumberCountMethods.changeNum">changeNum</el-button>
    <pre>
      {
        num1: {{ useNumberCountState.num1 }},
        num2: {{ useNumberCountState.num2 }},
        sum: {{ useNumberCountState.sum }}
      }
    </pre>
    <el-button @click="useRenderDatasMethods.buttonClick(10)"
      >新增数据</el-button
    >
    <div>
      新增{{ useRenderDatasState.len }}条数据；共有{{
        useRenderDatasState.datas.length
      }}条数据
    </div>
    <ul>
      <li v-for="i in useRenderDatasState.datas" :key="i">{{ i }}</li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import useNumberCount from "./hooks/useNumberCount";
import useRenderDatas from "./hooks/useRenderDatas";

export default {
  setup() {
    const {
      state: useNumberCountState,
      methods: useNumberCountMethods,
    } = useNumberCount();
    const {
      state: useRenderDatasState,
      methods: useRenderDatasMethods,
    } = useRenderDatas();

    return {
      useNumberCountState,
      useNumberCountMethods,
      useRenderDatasState,
      useRenderDatasMethods,
    };
  },
};
</script>

<style scoped lang="scss">
.mark {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 998;
}

.bouncing-loader {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  z-index: 999;
  & > div {
    width: 12px;
    height: 12px;
    margin: 6px 4px;
    background: #8385aa;
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
    &:nth-child:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child:nth-child(3) {
      animation-delay: 0.4;
    }
  }
}
@keyframes bouncing-loader {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-12px);
  }
}
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -15px;
  margin-left: -15px;
  z-index: 999;
}
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

$loadingSize: 200px; // Loading容器的大小
$dotRadius: 24px; // 圆点半径
$dotNums: 14; // 圆点个数(需要和div.loading中子元素div个数对应起来)
$dotColor: #f36; // 圆点颜色

.loading {
  width: $loadingSize;
  height: $loadingSize;
  color: $dotColor;
  transform-origin: center;

  div {
    color: $dotColor;
    width: $dotRadius;
    height: $dotRadius;
    margin-top: $dotRadius / 2;
    margin-left: $dotRadius / 2;

    @for $i from 1 through 14 {
      &:nth-child(#{$i}) {
        /*transform: translate(cos(($i - 1) * 360deg / $dotNums) * $loadingSize / 2, sin(($i - 1) * 360deg / $dotNums) * $loadingSize / 2);*/

        & > span {
          animation-delay: -(1 + $i * 1 / $dotNums) * 1s;
        }
      }
    }

    span {
      width: $dotRadius;
      height: $dotRadius;
      animation: ball-spin 1s infinite ease-in-out;

      background-color: currentColor;
      border: 0 solid currentColor;
    }
  }
}
</style>