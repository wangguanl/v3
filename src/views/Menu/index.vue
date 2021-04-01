<template>
  <div>
    <div>Hooks</div>
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
import { toRefs } from "vue";
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