<script>
import {
  defineComponent,
  resolveComponent,
  h,
  computed,
  onMounted,
  ref,
} from "vue";

import generateElForm from "../hooks/generate-el-form";
import useConcatConfig from "../hooks/concat-config";
export default defineComponent({
  name: "com-searchbar",
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
    options: { type: [Object, Array], default: () => [] },

    // 参考 el-form-item 组件库的api
    elFormItem: Object,
  },
  emits: ["update:modelValue", "validate"],
  setup(props, { emit, slots, attrs }) {
    const generateVNode = generateElForm(props, { emit });
    const OPTIONS = useConcatConfig(props["options"]);
    return () =>
      h(
        <div class="component_search-bar">
          {OPTIONS.map((option) => (
            <div
              class={[
                "component_search-bar_selector",
                "component_search-bar_selector--" +
                  ((option.attrs && option.attrs.size) || ""),
              ]}
            >
              <div class="component_search-bar_selector_label">
                {option.formItem ? option.formItem.label : ""}
              </div>
              {generateVNode(option)}
            </div>
          ))}
          {Object.values(slots).map((slot) => slot())}
        </div>
      );
  },
});
</script>

<style lang="scss">
.component_search-bar {
  flex-shrink: 0;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  overflow: hidden;
  @at-root &_selector {
    flex: 1;
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    & + * {
      margin-left: 10px;
    }
    &--mini {
      height: 28px;
    }
    &--small {
      height: 32px;
    }
    &--medium {
      height: 40px;
    }
    @at-root &_label {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      height: 100%;
      background-color: #F5F7FA;
      color: #909399;
      padding: 0 20px;
      width: auto;
      white-space: nowrap;
      border: 1px solid #DCDFE6;
      border-radius: 4px 0 0 4px;
      border-right: 0;
      box-sizing: border-box;
    }
    [class^="el-"] {
      flex: 1;
      .el-input__inner {
        border-radius: 0 4px 4px 0;
      }
    }
  }
}
</style>