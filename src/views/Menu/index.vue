<template>
  <div>
    <!-- <el-input size="small" v-model="selected" />
    <el-input  v-model="selected" />
    <el-input size="mini" v-model="selected" style="margin-top: 10px">
      <template #prepend> prepend </template>
    </el-input>
    <div style="margin-top: 10px" /> -->
    <!-- <c-select prepend="姓名" v-model="searchbar.selected" el-selector="select">
      <el-option key="1" value="1">1</el-option>
      <el-option key="2" value="2">2</el-option>
      <el-option key="3" value="3">3</el-option>
    </c-select>
    <c-select
      prepend="姓名"
      el-selector="date-picker"
      v-model="searchbar.value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
      <el-option value="1">1</el-option>
      <el-option value="2">2</el-option>
      <el-option value="3">3</el-option>
    </c-select>
    <c-select el-selector="input" prepend="123" /> -->
    <c-search-bar v-model="searchbar" :options="SearchOptions"></c-search-bar>
    {{ searchbar }}
    <!-- <items columns="" /> -->
    <!-- <div>Hooks</div>
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
    <router-view></router-view> -->
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import useNumberCount from "./hooks/useNumberCount";
import useRenderDatas from "./hooks/useRenderDatas";
import CSelect from "./components/select";
import { reactive, toRefs } from "vue";
import CSearchBar from "@/components/searchbar";
import searchOptions from "./search";
import deepCopy from "@/utils/deepCopy";
export default {
  components: { CSearchBar, CSelect },
  async setup() {
    const STATE = reactive({
      selected: "",
      value1: "",
      searchbar: {},
    });
    const {
      state: useNumberCountState,
      methods: useNumberCountMethods,
    } = useNumberCount();
    const {
      state: useRenderDatasState,
      methods: useRenderDatasMethods,
    } = useRenderDatas();

    var SearchOptions = searchOptions();
    SearchOptions.name.slots = {
      append: () => (
        <el-button icon="el-icon-search" onClick={() => console.log(1)} />
      ),
    };
    console.log(SearchOptions);
    await setTimeout(() => {
      return new Promise((resolve) => {
        resolve();
      });
    }, 2000);
    return {
      useNumberCountState,
      useNumberCountMethods,
      useRenderDatasState,
      useRenderDatasMethods,
      ...toRefs(STATE),
      SearchOptions,
    };
  },
};
</script>