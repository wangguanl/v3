<script>
import { h } from "vue";
import Forms from "@/components/Forms";
const components = {
  Forms,
};
export default {
  inheritAttrs: false,
  props: {
    modelValue: Object,
    options: {
      type: Array,
      default: () => [],
    },
    API: {
      type: Object,
      default: () => ({
        required: false, // true: 全部为必填项
        FORM: {},
        ITEM: {},
      }),
    },
    /*
     * true: 全部为必填项
     * false:
     */
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["submit", "cancle"],
  setup({ modelValue, options, API }, { emit }) {
    const { FORM, ITEM, required } = API;
    /*
     * 校验规则： 分为两种；最大化的处理rules规则校验，统一集成校验规则对象
     * 1. el-form 组件的 rules
     * 2. el-form-item 组件的 rules 与 required
     */
    const rules = (() => {
      // 集成表单的rules
      const rule = FORM ? { ...FORM["rules"] } : {};

      // 将option展开并去除null、undefined等空值
      const arr = options.flat().filter((option) => {
        if (option && !rule[option.key]) {
          rule[option.key] = [];
        }
        return option;
      });
      // 生成必填项
      const useRequiredRule = (type, label) => ({
        required: true,
        message: `请${type === "input" ? "输入" : "选择"}${label}`,
        trigger: type === "input" ? "blur" : "change",
      });
      // 全局必填项，设置每一个值都是必填项
      if (required) {
        arr.forEach(({ type, label, key, attrs = {} }) => {
          const { rules = [] } = attrs;
          rule[key].unshift(useRequiredRule(type, label));
          rule[key].concat(rules);
        });
      } else {
        // 统一集成 el-form-item 组件的 rules 与 required 的校验规则对象
        arr.forEach(({ type, label, key, attrs = {} }) => {
          const { required, rules = [] } = attrs;
          rule[key].concat(rules);
          required && rule[key].unshift(useRequiredRule(type, label));
        });
      }
      return rule;
    })();
    return () =>
      h(
        <div style="height: 100%; display: flex; flex-direction: column; overflow: hidden;">
          <Forms
            options={options}
            vModel={modelValue}
            API={{
              FORM: {
                style: "flex: 1; overflow: auto; ",
                "label-position": "right",
                "label-width": "120px",
                model: modelValue,
                ...FORM,
                rules,
              },
              ITEM: {
                ...ITEM,
              },
            }}
          ></Forms>
          <div style="display: flex; justify-content: center; flex-shrink: 0;">
            <el-button onClick={() => emit("cancle")}>取消</el-button>
            <el-button type="primary" onClick={() => emit("submit")}>
              保存
            </el-button>
          </div>
        </div>
      );
  },
  components,
};
</script>