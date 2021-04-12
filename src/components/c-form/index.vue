<script>
import {
  defineComponent,
  resolveComponent,
  h,
  computed,
  onMounted,
  ref,
} from "vue";
import { useStore } from "vuex";
import { DICTIONARIES } from "@/store/types";
export default defineComponent({
  name: "c-form",
  inheritAttrs: false,
  props: {
    modelValue: { type: Object, default: () => ({}) }, // 双向数据绑定

    /* 
      * 渲染格式（数据模型）
      * {
         * type: 'input',  <String> el-[type] 元素类型
         * key: 'xingming',  <String> 表单key
         * selectOptions: '', <Array | String>; Array: 直接使用 ; String: 意为key，使用全局字典渲染option下拉项
         * 参考组件库的api
         * attrs: {}, <Object> el-[type]元素的attrs
         * formItem: {
            label: '姓名',  <String> 表单 label
         * }, <Object> el-form-item 的 attrs
        }
     */
    options: { type: Array, default: () => [] },

    // 参考 el-form-item 组件库的api
    elFormItem: Object,
  },
  emits: ["update:modelValue", "validate"],
  setup(props, { emit, slots, attrs }) {
    const Store = useStore();
    const Dictionaries = computed(() => Store.state[DICTIONARIES.state]);
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
                  ({ value, label }) => ({
                    label,
                    value,
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
              onChange: (val) => onUpdate(key, val, true),
            },
          ];
        },
      };
      return (option) => {
        const { type, key, formItem = {}, attrs: elTypeAttrs } = option;
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
          Slots
        );
      };
    })();

    const rules = (() => {
      // 集成表单的rules
      const Rules = attrs["rules"] || [];
      // 将option展开并去除null、undefined等空值
      const Options = props["options"].flat().filter((option) => {
        if (option && !Rules[option.key]) {
          Rules[option.key] = [];
        }
        return option;
      });

      // 统一集成 el-form-item 组件的 rules 与 required 的校验规则对象
      Options.forEach(({ type, key, formItem = {} }) => {
        const { required, label, rules = [] } = formItem;
        Rules[key].concat(rules);
        required &&
          Rules[key].unshift({
            required: true,
            message: `请${type === "input" ? "输入" : "选择"}${label}`,
            trigger: type === "input" ? "blur" : "change",
          });
      });
      return Rules;
    })();

    const elFormRef = ref(null);
    onMounted(() => {
      emit("validate", elFormRef.value);
    });

    return () =>
      h(
        <el-form
          ref={elFormRef}
          {...attrs}
          model={props["modelValue"]}
          rules={rules}
          v-slots={{
            default: () => (
              <>
                {props["options"].map((option) => {
                  const { key, formItem } = option;
                  return (
                    <el-form-item
                      key={key}
                      prop={key}
                      {...props["elFormItem"]}
                      {...formItem}
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
});
</script>