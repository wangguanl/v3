<script>
import axios from "@/basics/request.js";
import { resolveComponent, shallowRef, h } from "vue";
export default {
  inheritAttrs: false,
  props: {
    modelValue: { type: Object, default: () => ({}) }, // 双向数据绑定
    options: { type: Object, default: () => [] }, // 渲染元素
    /*  表单参数 */
    API: {
      type: Object,
      default: () => ({
        FORM: {}, // 传参为form组件API
        ITEM: {}, // 传参为form-item组件API
      }),
    },
  },
  emits: ["update:modelValue"],
  setup({ modelValue, options, API }, { emit, slots }) {
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
      ...(() => {
        const defaultConfig = {};
        options.filter(
          ({ type }) =>
            (defaultConfig[type] = {
              attrs: {},
              on: () => ({}),
            })
        );
        return defaultConfig;
      })(),
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
            // <el-option value={value} label={label} key={value} />
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

    return () =>
      h(
        <a-form {...FAPI["FORM"]}>
          {
            /*
             * type: 元素类型
             * attrs: type组件API
             * items: form-item组件API
             * options: 下拉框(子组件)(@FN: child)
             */
            options.map(({ type, attrs = {}, items = {}, options }) => {
              const { label, key } = attrs;
              return (
                <a-form-item
                  {...FAPI["ITEM"]}
                  label={FAPI["FORM"].layout !== "inline" ? label : ""}
                  {...items}
                >
                  {h(
                    resolveComponent("a-" + type),
                    {
                      value: modelValue[key],
                      checked: modelValue[key],
                      placeholder:
                        "请" + (type === "input" ? "输入" : "选择") + label,
                      ...config[type]["attrs"],
                      ...config[type]["on"](key),
                      ...attrs,
                    },
                    {
                      default: () =>
                        options ? config[type].child(options) : "",
                    }
                  )}
                </a-form-item>
              );
            })
          }
          {slots.default()}
        </a-form>
      );
  },
};
</script>