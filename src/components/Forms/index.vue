<script>
import { resolveComponent, h, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Forms",
  inheritAttrs: false,
  props: {
    modelValue: { type: Object, default: () => ({}) }, // 双向数据绑定

    /* 
      * 渲染格式（数据模型）
      * {
         * type: 'input',  <String> el-[type] 元素类型
         * label: '姓名',  <String> 表单label
         * key: 'xingming',  <String> 表单key
         * selectOptions: '', <Array | String>; Array: 直接使用 ; String: 意为key，使用全局字典渲染option下拉项
         * 参考组件库的api
         * attr: {}, <Object> el-[type]元素的attrs
         * item: {}, <Object> el-form-item的attrs
        }
     */
    options: { type: Array, default: () => [] },

    // 参考 el-form-item 组件库的api
    "el-form-item": Object,
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots, attrs }) {
    const Store = useStore();
    const Dictionaries = computed(() => Store.state.dictionaries);
    /*
     * key => 键
     * val => 值
     * immediately => Boolean 是否调用查询
     */
    const onUpdate = (key, val, immediately) => {
      props["modelValue"][key] = val;
      emit("update:modelValue", props["modelValue"]);
    };
    /* 
      清空内容
    */
    const onClear = (key) => onUpdate(key, "", true);

    const generateVNode = (() => {
      // 组件基本配置
      const config = {
        select: ({ key, selectOptions }) => [
          {
            clearable: true,
            onChange: (val) => onUpdate(key, val, true),
            onClear: () => onClear(key),
          },
          {
            default: () => {
              /*
               * 两种类型使用
               * selectOptions <Array | String> Array: 直接使用 ; String: 意为key，使用全局字典渲染option下拉项
               */
              let dictionariesOptions = [];
              if (
                typeof selectOptions === "string" &&
                Dictionaries.value[selectOptions]
              ) {
                dictionariesOptions = Dictionaries.value[selectOptions].map(
                  ({ zidiandm, zidianz }) => ({
                    label: zidianz,
                    value: zidiandm,
                  })
                );
              }
              return dictionariesOptions.map(({ label, value }) => (
                <el-option value={value} label={label} key={value} />
              ));
            },
          },
        ],
        input: ({ key }) => [
          {
            clearable: true,
            onInput: (val) => onUpdate(key, val, false),
            onClear: () => onClear(key),
          },
        ],
        "date-picker": ({ label, key, attr = {} }) => {
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
              "start-placeholder": label + "开始日期",
              "end-placeholder": label + "结束日期",
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
              ...Types[attr["type"] || "date"],
              onChange: (val) => onUpdate(key, val, true),
            },
          ];
        },
      };
      return (option) => {
        const { type, label, key, attr } = option;
        const [Attrs, Slots] = config[type](option);

        return h(
          resolveComponent("el-" + type),
          {
            modelValue: props["modelValue"][key],
            placeholder: "请" + (type === "input" ? "输入" : "选择") + label,
            ...Attrs,
            ...attr,
          },
          Slots
        );
      };
    })();

    return () =>
      h(
        <el-form
          {...attrs}
          v-slots={{
            default: () => (
              <>
                {props["options"].map((option) => {
                  const { key, label, item } = option;
                  return (
                    <el-form-item
                      key={key}
                      prop={key}
                      style={attrs["inline"] ? "margin-bottom: 10px" : ""}
                      {...props["el-form-item"]}
                      {...item}
                      label={attrs["inline"] ? "" : label}
                    >
                      {generateVNode(option)}
                    </el-form-item>
                  );
                })}
                {Object.values(slots).map((slot) => slot())}
              </>
            ),
          }}
        />
      );
  },
};
</script>