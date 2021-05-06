<script>
import { defineComponent, h } from "vue";
import { ElGenerate } from "../components";
import { concatConfig } from "../utils";
export default defineComponent({
  components: {
    ElGenerate,
  },
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
  },
  setup: (props, { emit, slots, attrs }) => {
    const OPTIONS = concatConfig(props["options"]);
    return () =>
      h(
        <div class="components__search-bar">
          {OPTIONS.map((option) => (
            <div
              class={[
                "components__search-bar__selector",
                option.attrs && option.attrs.size
                  ? "components__search-bar__selector--" + option.attrs.size
                  : "",
              ]}
            >
              <div class="components__search-bar__selector__label">
                {option.formItem ? option.formItem.label : ""}
              </div>
              <el-generate vModel={props["modelValue"]} option={option} />
            </div>
          ))}
          {Object.values(slots).map((slot) => slot())}
        </div>
      );
  },
});
</script>

<style lang="scss">
@include B(components__search-bar) {
  flex-shrink: 0;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  overflow: hidden;
  @include E(selector) {
    flex: 1;
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    & + * {
      margin-left: 10px;
    }
    & > {
      [class^="el-"] {
        flex: 1;
        .el-input__inner {
          border-radius: 0 4px 4px 0;
        }
      }
    }
    @include M(mini) {
      height: 28px;
    }
    @include M(small) {
      height: 32px;
    }
    @include M(medium) {
      height: 40px;
    }
    @include E(label) {
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
  }
}
</style>