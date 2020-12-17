<script>
import axios from "@/basics/request.js";
import { defineComponent, resolveComponent, shallowRef, h } from "vue";
export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => [] },
  },
  emits: ["update:modelValue"],
  setup({ options, modelValue }, { emit, slots }) {
    const genarateVnodeOptions = (() => {
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
        modelValue[key] = val;
        emit("update:modelValue", modelValue);
      };
      // 组件基本配置
      const config = {
        select: {
          /*
           * 两种类型使用
           * selectOptions <Array | String> Array: 直接使用 ; String: 意为key，使用全局字典
           */
          child: (selectOptions) => {
            let DictionariesOptions = [];
            if (
              typeof selectOptions === "string" &&
              Dictionaries.value[selectOptions]
            ) {
              DictionariesOptions = Dictionaries.value[selectOptions].map(
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
            value: modelValue[vnode.key],
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
        <div className="form">
          {options.map((vnode) => {
            return h(
              resolveComponent("a-" + vnode.type),
              ...genarateVnodeOptions(vnode)
            );
          })}
          {slots.default()}
        </div>
      );
  },
});
</script>
<style lang="scss" scoped>
::v-slotted(.form) {
  display: flex;
  align-items: center;
  & > * {
    flex: 1;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
