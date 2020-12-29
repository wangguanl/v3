<script>
import { h } from "vue";
import Forms from "@/components/Forms";
import generateRules from "./rules.js";
const components = {
  Forms,
};
export default {
  name: "CForms",
  inheritAttrs: false,
  props: {
    modelValue: { type: Object, default: () => ({}) },
    options: {
      type: Array,
      default: () => [],
    },
    // 是否全部为必填项
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["submit", "cancle"],
  setup(props, { emit, attrs, slots }) {
    return () =>
      h(
        <div style="height: 100%; display: flex; flex-direction: column; overflow: hidden;">
          <Forms
            options={props["options"]}
            vModel={props["modelValue"]}
            style="flex: 1; overflow: auto; "
            rules={generateRules(props, attrs)}
            label-position="right"
            label-width="120px"
            model={props["modelValue"]}
            {...attrs}
            {...slots}
          />
          <div style="display: flex; justify-content: center; flex-shrink: 0;">
            <el-button type="primary" onClick={() => emit("submit")}>
              保存
            </el-button>
            <el-button onClick={() => emit("cancle")}>取消</el-button>
          </div>
        </div>
      );
  },
  components,
};
</script>