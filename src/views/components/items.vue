<template>
  <div class="_flex _flex-around _wrap" v-for="(arr, index) in items" :key="index">
    <div class="_flex _flex-items-center" v-for="item in arr" :key="item.label">
      <span class="label" :style="{ width: parseFloat(item.width || width) + 'px' }">{{
        item.label
      }}</span>
      <el-image
        class="img"
        v-if="item.type === 'img'"
        :src="
          datas[item.key].indexOf(baseImgURL) !== -1
            ? datas[item.key]
            : baseImgURL + datas[item.key]
        "
        fit="fill"
      ></el-image>
      <div
        class="content"
        v-else
        :style="rHtml(item).style"
        v-html="rHtml(item).html"
      ></div>
    </div>
  </div>
  <slot></slot>
</template>

<script>
import { baseImgURL } from "@/basics/baseURL";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  props: {
    // 后端数据
    datas: {
      type: Object,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    width: {
      type: [Number, String],
      default: "84px",
    },
  },

  setup(props) {
    const Dictionaries = {};
    const { datas } = props;
    const METHODS = {
      rHtml(item) {
        const { key, options } = item;
        const val =
          datas[key] && (typeof datas[key] === "object" ? datas[key].value : datas[key]);
        let html = "";
        if (options) {
          let Options = [];
          if (typeof options === "string") {
            Options = (Dictionaries[options] || []).map(({ zidiandm, zidianz }) => ({
              label: zidianz,
              value: zidiandm,
            }));
          } else {
            Options = options;
          }
          let data = Options.filter(({ value }) => value == val);
          html = data.length ? data[0].label : "";
        } else {
          html = val;
        }
        return {
          style: datas[key] && datas[key].style,
          html,
        };
      },
    };
    return {
      ...METHODS,
      baseImgURL,
    };
  },
});
</script>

<style lang="scss" scoped>
._wrap {
  width: 100%;
  & > div {
    width: 100%;
    padding: 10px 0;
    &:nth-child(even) {
      padding-left: 20px;
    }
    & > span.label {
      flex-shrink: 0;
      text-align: right;
    }
    & > div {
      margin-left: 10px;
      min-height: 43px;
      box-sizing: border-box;
      &.img {
        width: 100px;
        height: 100px;
      }
      &.content {
        flex: 1;
        overflow: hidden;
        padding: 10px;
        border: 1px solid #dcdfe6;
        line-height: 1.5;
        border-radius: 5px;
        img {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
