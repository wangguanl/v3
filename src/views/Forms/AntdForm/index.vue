<script>
import axios from "@/basics/request.js";
import {
  defineComponent,
  resolveComponent,
  shallowReactive,
  shallowRef,
  h,
} from "vue";
import Vnodes from "../config";
export default defineComponent({
  setup() {
    const genarateVnodeOptions = (() => {
      const form = shallowReactive({});
      const Dictionaries = shallowRef({});
      axios
        .post("/jbk/ConfDocCommon/selectList", {
          trans: "body",
          data: [],
        })
        .then((datas) => {
          Dictionaries.value = datas;
        });
      /*
       * key => 键
       * val => 值
       * immediately => Boolean 是否调用查询
       */
      const onChange = (key, val, immediately) => {
        form[key] = val;
      };
      // 组件基本配置
      const config = {
        select: {
          /*
           * 两种类型使用
           * options为数组时， 直接使用
           * options为string时，意为key，使用全局字典，
           */
          child: (options) => {
            let DictionariesOptions = [];
            if (typeof options === "string" && Dictionaries.value[options]) {
              DictionariesOptions = Dictionaries.value[options].map(
                ({ zidiandm, zidianz }) => ({
                  label: zidianz,
                  value: zidiandm,
                })
              );
            }
            return DictionariesOptions.map(({ label, value }) => (
              <a-select-option value={value} key={value}>
                {label}
              </a-select-option>
            ));
          },

          attrs: {
            allowClear: true,
          },

          on: (key) => ({
            onChange: (val, obj) => onChange(key, val, true),
          }),
        },
        input: {
          attrs: {
            allowClear: true,
          },
          on: (key) => ({
            onChange: (dom) => onChange(key, dom.target.value, false),
          }),
        },
      };
      return function (vnode) {
        return [
          {
            modelValue: form[vnode.key],
            placeholder:
              "请" + (vnode.type === "input" ? "输入" : "选择") + vnode.label,
            ...config[vnode.type].attrs,
            ...config[vnode.type].on(vnode.key),
          },
          {
            default: () =>
              vnode.options ? config[vnode.type].child(vnode.options) : [],
          },
        ];
      };
    })();

    return () =>
      h(
        <div class="_flex _flex-items-center _e-head">
          {Vnodes.map((vnode) => {
            return h(
              resolveComponent("a-" + vnode.type),
              ...genarateVnodeOptions(vnode)
            );
          })}
        </div>
      );
  },
});
</script>
<style lang="scss">
._e-head {
  & > * {
    flex: 1;
  }
  & > *:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
