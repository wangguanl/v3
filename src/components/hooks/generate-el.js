import {
  resolveComponent,
  h,
  computed,
} from "vue";
import { useStore } from "vuex";
import { DICTIONARIES } from "@/store/types";
import formatDate from '../utils/formatDate'
export default (props, { emit }) => {
  const Store = useStore();
  const Dictionaries = computed(() => Store.state[DICTIONARIES.state]);
  /*
   * key => 键
   * val => 值
   */
  const onUpdate = (key, val) => {
    props["modelValue"][key] = val;
    emit("update:modelValue", props["modelValue"]);
  };
  /* 
    清空内容
  */
  const onClear = (key) => onUpdate(key, "");

  return (() => {
    // 组件基本配置
    const config = {
      select: ({ key, selectOptions }) => [
        {
          clearable: true,
          onChange: (val) => onUpdate(key, val),
          onClear: () => onClear(key),
        },
        {
          default: () => {
            /*
             * 两种类型使用
             * selectOptions <Object | String> Object: 直接使用 ; String: 意为key，使用全局字典渲染option下拉项
             */
            if (
              typeof selectOptions === "string" &&
              Dictionaries.value[selectOptions]
            ) {
              return Object.keys(
                Dictionaries.value[selectOptions]
              ).map((key) => (
                <el-option
                  value={key}
                  label={Dictionaries.value[selectOptions][key].label}
                  key={key}
                />
              ));
            } else {
              return Object.keys(selectOptions).map((key) => (
                <el-option
                  value={key}
                  label={selectOptions[key].label}
                  key={key}
                />
              ));
            }
          },
        },
      ],
      input: ({ key }) => [
        {
          clearable: true,
          onInput: (val) => onUpdate(key, val),
          onClear: () => onClear(key),
        },
      ],
      "date-picker": ({ key, formItem = {}, attrs: elTypeAttrs = {} }) => {
        const Types = {
          date: {
            shortcuts: [
              {
                text: "今天",
                value: new Date(),
              },
            ],
          },
          daterange: {
            "range-separator": "-",
            "start-placeholder": formItem.label + "开始日期",
            "end-placeholder": formItem.label + "结束日期",
            shortcuts: [
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
          month: {},
        };
        return [
          {
            ...Types[elTypeAttrs["type"] || "date"],
            onChange: (val) => onUpdate(key, Array.isArray(val) ? val.map(v => formatDate(v)) : formatDate(val))
          },
        ];
      },
    };
    return (option) => {
      const {
        type,
        key,
        formItem = {},
        attrs: elTypeAttrs,
        slots: elTypeSlots,
      } = option;
      const [Attrs, Slots] = config[type](option);

      return h(
        resolveComponent("el-" + type),
        {
          modelValue: props["modelValue"][key],
          placeholder:
            "请" + (type === "input" ? "输入" : "选择") + formItem.label,
          ...Attrs,
          ...elTypeAttrs,
        },
        { ...Slots, ...elTypeSlots }
      );
    };
  })();
}