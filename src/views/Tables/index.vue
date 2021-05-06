<template>
  <div class="content_page">
    <div class="content_body">
      <div class="content_button">
        <button class="add primary" @click="addItem" title="添加">添加</button>
      </div>
      <div class="content_table">
        <table>
          <thead>
            <tr>
              <th v-for="item in thead" :key="item">{{ item }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="item.id">
              <td>
                <span :title="item.id">{{ item.id }}</span>
              </td>
              <td>
                <div v-if="index === currentIndex">
                  <input v-model="item.name" title="name" />
                </div>
                <span :title="item.name" v-else>{{ item.name }}</span>
              </td>
              <td :title="item.sex">
                <div v-if="index === currentIndex">
                  <input v-model="item.sex" title="sex" />
                </div>
                <span :title="item.sex" v-else>{{
                  item.sex ? "男" : "女"
                }}</span>
              </td>
              <td :title="item.birth">
                <div v-if="index === currentIndex">
                  <input v-model="item.birth" title="birth" />
                </div>
                <span :title="item.birth" v-else>{{ item.birth }}</span>
              </td>
              <td :title="item.address">
                <div v-if="index === currentIndex">
                  <input v-model="item.address" title="birth" />
                </div>
                <span :title="item.address" v-else>{{ item.address }}</span>
              </td>
              <td>
                <div v-if="index === currentIndex">
                  <button class="primary confirm" @click="confirm(item)">
                    确定
                  </button>
                  <button @click="cancel(item)">取消</button>
                </div>
                <span v-else>
                  <span @click="editItem(index)"> edit </span>
                  <span @click="deleteItem(index, item)">delete</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import axios from "axios";
import { defineComponent, reactive } from "vue";
import compositionApi from "./hooks/index.vue";
import { ItemType } from "./types/index";
import mock from "./mock";
mock.bootstrap();

export default defineComponent({
  name: "List",
  setup() {
    const state = reactive({
      itemData: {
        id: "",
        name: "",
        sex: 0,
        birth: "",
        address: "",
      },
    });
    const fetchApi = () => {
      return axios.get("/users");
    };
    const deleteApi = (item: ItemType) => {
      return axios.post("/users/delete", {
        id: item.id,
      });
    };
    const confirmAddApi = (item: ItemType) => {
      return axios.post("/users/add", {
        name: item.name,
        birth: item.birth,
        address: item.address,
      });
    };
    const confirmEditApi = (item: ItemType) => {
      return axios.post("/users/edit", {
        id: item.id,
        name: item.name,
        birth: item.birth,
        address: item.address,
      });
    };
    const localPageData = compositionApi(
      fetchApi,
      deleteApi,
      confirmAddApi,
      confirmEditApi,
      state.itemData
    );
    return {
      state,
      ...localPageData,
    };
  },
  data() {
    return {
      thead: ["id", "name", "sex", "birth", "address", "option"],
    };
  },
});
</script>
<style lang='scss'>
.content_page {
  width: 100%;
  height: 100%;
  background: #fff;
  .content_title {
    height: 56px;
    line-height: 56px;
    background: #f5f8fa;
    font-size: 14px;
    border-bottom: 1px solid #e4eaee;
    border-right: 1px solid #e4eaee;
    padding-left: 20px;
    font-weight: bold;
  }
  .content_body {
    height: calc(100% - 56px);
    background: #fff;
    .content_button {
      box-sizing: border-box;
      padding: 12px 20px;
      height: 52px;
      background: #fff;
      border-bottom: 1px solid #e4eaee;
    }
    .content_table {
      padding: 20px;
      height: calc(100% - 52px);
      overflow: auto;
      input {
        font-size: 12px;
        color: #666;
      }
      span {
        padding-left: 0px;
        padding-right: 10px;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        table-layout: fixed;
        thead {
          font-weight: 700;
          word-wrap: normal;
          text-overflow: ellipsis;
          line-height: 30px;
          vertical-align: middle;
        }
        tbody {
          text-align: center;
        }
        tfoot {
          th {
            height: 0;
          }
        }
        th,
        td {
          border: 1px solid #e5e5e5;
          vertical-align: middle;
          box-sizing: border-box;
          padding: 0 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          height: 35px;
        }
        th {
          background-color: #f6f6f6;
        }
        tr:nth-child(even) {
          background: rgba(246, 246, 246, 0.5);
        }
      }
    }
  }
}
button {
  min-width: 74px;
  height: 28px;
  line-height: 26px;
  padding: 0 12px;
  font-size: 12px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  transition-property: border-color, background-color, color, opacity;
  transition-duration: 0.2s;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
  }
  &:focus {
    outline: none;
  }
  &.primary {
    border-color: transparent;
    background-color: #3998fc;
    color: #fff;
    &:hover {
      background-color: #3389e3;
    }
  }
}
input {
  min-width: 120px;
  height: 28px;
  line-height: 26px;
  border-radius: 4px;
  padding: 0 9px;
  vertical-align: middle;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  color: #666;
  transition: border-color 0.2s, color 0.2s;
  font-size: 12px;
  &:focus {
    outline: none;
    border-color: #3998fc;
  }
}
</style>
