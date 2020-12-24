<script>
import { h, defineComponent, version } from "vue";
import Forms from "../Forms";
const components = {
  Forms,
};
export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: Object,
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["submit", "cancle"],
  setup({ modelValue, options }, { emit }) {
    return () =>
      h(
        <div style=" height: 100%; display: flex; flex-direction: column; overflow: hidden;">
          <Forms
            options={options}
            vModel={modelValue}
            API={{
              FORM: {
                model: modelValue,
                style: "flex: 1; overflow: auto",
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
});
</script>