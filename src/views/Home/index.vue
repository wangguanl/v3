<template>
  <com-page
    :head="{
      options: headOptions,
      btns: headBtns,
    }"
    :table="{
      fn: fetchGetTableList,
      columns: tableColumns,
      btns: tableBtns,
      btnsWidth: '250px',
    }"
    :dialog="dialog"
  >
    <!-- <template #tableControl="{ row }">
      <com-history
        name="变更历史"
        :fetch-fn="fetchGetTableHistory"
        :datas="{ jrbzh: row.junrenbzh }"
        :option="{ label: 'updateTime', value: 'id' }"
        @change="
          (data) =>
            (dialog = {
              visible: true,
              title: '个人信息变更 - ' + data.updateTime,
              width: '800px',
              name: 'items',
              datas: data,
            })
        "
      ></com-history>
    </template>
    <template #dialog>
      <com-e-form
        v-if="dialog.name === 'eForm'"
        :fetch-fn="fetchAddEditTable"
        :datas="dialog.datas"
        :readonly="readonly"
        :options="formOptions"
        @submit="onSubmit"
        @cancel="onCancel"
      ></com-e-form>
      <com-items
        v-if="dialog.name === 'items'"
        :datas="dialog.datas"
        :items="textItemLabel"
      />
    </template> -->
  </com-page>
</template>
<script>
import {
  fetchAddEditTable,
  fetchGetTableList,
  fetchDeleteTable,
  fetchGetTableHistory,
  fetchGetTableInfo,
} from "./api";

import mixin from "@/views/mixin";
import headOptions from "./config/headOptions";
import tableColumns from "./config/tableColumns";
import textItemLabel from "./config/textItemLabel";
import formOptions from "./config/formOptions";
import { h } from "vue";
export default {
  mixins: [mixin],
  /* setup() {
    return () => h(<div>123</div>);
  }, */
  data() {
    return {
      fetchGetTableList,
      fetchGetTableHistory,
      fetchAddEditTable,

      headOptions,
      tableColumns,
      formOptions,
      textItemLabel,

      /*
       * eform表单组件提供form进行新增编辑功能 默认为false
       * 编辑时存在不可编辑项为只读状态，传值true，启用校验只读状态的表单项
       */
      readonly: false,

      /*
       * 头部操作按钮
       * @name: 按钮名称
       * @handle: 触发事件
       * _ 下划线事件是调用mixin内的函数
       */
      headBtns: [
        {
          name: "新增",
          handle: () => {
            this.readonly = false;
            this.dialog = {
              visible: true,
              title: "新增",
              width: "800px",
              name: "eForm",
              datas: {},
            };
          },
        },
        {
          name: "导入",
          handle: this._useHeadBtnImport,
        },
        {
          name: "导出",
          handle: this._useHeadBtnExport,
        },
      ],

      /*
          表格操作按钮
          @name: 按钮名称
          @type: 1直接操作 2提示操作 (默认为1)
          @handle: 触发事件
      */
      tableBtns: [
        {
          name: "编辑",
          handle: (row) => {
            this.dialog = {
              visible: true,
              title: "编辑",
              width: "800px",
              name: "eForm",
              datas: { ...row },
            };
            this.readonly = true;
          },
        },
        {
          name: "删除",
          type: 2,
          handle: ({ id }) => {
            return fetchDeleteTable({
              tips: true,
              data: {
                id,
              },
            });
          },
        },
        {
          name: "查看详情",
          handle: ({ id }) => {
            fetchGetTableInfo({
              data: {
                id,
              },
            }).then((datas) => {
              this.dialog = {
                visible: true,
                title: "查看详情",
                width: "700px",
                name: "items",
                datas,
              };
            });
          },
        },
      ],
    };
  },
  methods: {},
};
</script>