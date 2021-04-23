<script>
import { defineComponent, h, onMounted, ref } from "vue";
import useConcatConfig from "../hooks/concat-config";
import generateEl from "../hooks/generate-el";
export default defineComponent({
  name: "com-form",
  inheritAttrs: false,
  props: {
    modelValue: { type: Object, default: () => ({}) }, // 双向数据绑定

    /* 
      * 渲染格式（数据模型）
      * {
         * type: 'input',  <String> el-[type] 元素类型
         * key: 'xingming',  <String> 表单key
         * selectOptions: '', <Object | String>; Object: 直接使用 ; String: 意为key，使用全局字典渲染option下拉项
         * 参考组件库的api
         * attrs: {}, <Object> el-[type]元素的attrs
         * formItem: {
            label: '姓名',  <String> 表单 label
         * }, <Object> el-form-item 的 attrs
        }
     */
    options: { type: [Object, Array], default: () => [] },

    // 参考 el-form-item 组件库的api
    elFormItem: Object,
  },
  emits: ["update:modelValue", "formMethods"],
  setup: (props, { emit, slots, attrs }) => {
    const OPTIONS = useConcatConfig(props["options"]);
    const generateVNode = generateEl(props, { emit, slots, attrs });
    // 处理数据类型 根据数据类型返回对应的 dom 结构
    function useComplexType(arrayObject) {
      // 数组
      if (Array.isArray(arrayObject)) {
        const span = 24 / arrayObject.length;
        return (
          <el-row>
            {arrayObject.map((option) => (
              <el-col span={span}>{useParseComplexType(option)}</el-col>
            ))}
          </el-row>
        );
      } else {
        // 对象
        return useParseComplexType(arrayObject);
      }
    }

    // 如果对象中存在 key ，则解析对象生成 el-option ， 否则为复杂数据类型
    function useParseComplexType(option) {
      if (!option) {
        return <div />;
      }

      if (option.key) {
        return (
          <el-form-item
            key={option.key}
            prop={option.key}
            {...props["elFormItem"]}
            {...option.formItem}
          >
            {generateVNode(option)}
          </el-form-item>
        );
      }
      return (
        <el-form-item {...option.formItem}>
          {useComplexType(option.value)}
        </el-form-item>
      );
    }

    const rules = (() => {
      // 集成表单的rules
      const Rules = attrs["rules"] || [];
      // 将option展开并去除null、undefined等空值
      const Options = OPTIONS.flat().filter((option) => {
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
      emit("formMethods", elFormRef.value);
    });

    return () =>
      h(
        <el-form
          class="component_form"
          ref={elFormRef}
          {...attrs}
          model={props["modelValue"]}
          rules={rules}
          v-slots={{
            default: () => (
              <>
                {OPTIONS.map((arrayObject) => useComplexType(arrayObject))}
                {Object.values(slots).map((slot) => slot())}
              </>
            ),
          }}
        />
      );
  },
});
</script>
<style lang="scss">
.component_form {
  .el-row {
    width: 100%;
  }
  .el-form-item__content {
    display: flex;
    .el-input,
    .el-select {
      flex: 1;
    }
    // [class^="el-"] {
    //   flex: 1;
    // }
  }
}
</style>