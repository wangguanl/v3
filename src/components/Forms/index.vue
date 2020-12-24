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
    const onUpdate = (key, val, immediately) => {
      modelValue[key] = val;
      emit("update:modelValue", modelValue);
    };

    const generateVNode = (() => {
      // 组件基本配置
      const config = {
        select: ({ key, options }) => [
          {
            clearable: true,
            onChange: (val) => onUpdate(key, val, true),
          },
          {
            default: () => {
              /*
               * 两种类型使用
               * selectOptions <Array | String> Array: 直接使用 ; String: 意为key，使用全局字典
               */
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
                <el-option value={value} label={label} key={value} />
              ));
            },
          },
        ],
        input: ({ key }) => [
          {
            clearable: true,
            onInput: (val) => onUpdate(key, val, false),
          },
        ],
        "date-picker": ({ label, key, attrs }) => {
          const type = {
            daterange: {
              "value-format": "yyyy-MM-dd",
              "range-separator": "-",
              "start-placeholder": label + "开始日期",
              "end-placeholder": label + "结束日期",
              shortcuts: [
                {
                  text: "今天",
                  value: (() => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    return [start, end];
                  })(),
                },
                {
                  text: "最近一周",
                  value: (() => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                  })(),
                },
                {
                  text: "最近一个月",
                  value: (() => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                  })(),
                },
                {
                  text: "最近三个月",
                  value: (() => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    return [start, end];
                  })(),
                },
              ],
            },
            month: {
              "value-format": "yyyy-MM",
            },
          };
          return [
            {
              clearable: true,
              ...type[attrs["type"]],
              onChange: (val) => onUpdate(key, val, true),
            },
          ];
        },
      };
      return (option) => {
        const { type, label, key, attrs } = option;
        const [Attrs, Slots] = config[type](option);

        return h(
          resolveComponent("el-" + type),
          {
            modelValue: modelValue[key],
            placeholder: "请" + (type === "input" ? "输入" : "选择") + label,
            ...Attrs,
            ...attrs,
          },
          Slots
        );
      };
    })();

    return () =>
      h(
        <el-form {...API["FORM"]}>
          {
            /*
             * type: 元素类型
             * label: form-item组件lable
             * key: modelValue的键
             * attrs: type组件API
             * options: <Array | String> Array: 直接使用 ; String: 意为key，使用全局字典
             * items: form-item组件API
             */
            options.map((option) => {
              const { key, label, items } = option;
              return (
                <el-form-item
                  key={key}
                  {...API["ITEM"]}
                  label={API["FORM"]["inline"] ? "" : label}
                  style={API["FORM"]["inline"] ? "margin-bottom: 10px" : ""}
                  {...items}
                >
                  {generateVNode(option)}
                </el-form-item>
              );
            })
          }
          {slots.default && slots.default()}
        </el-form>
      );
  },
};
</script>