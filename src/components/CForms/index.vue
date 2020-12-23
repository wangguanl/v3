<script>
import { h } from "vue";
import Forms from "../Forms";
const components = {
  Forms,
};
export default {
  props: {
    modelValue: Object,
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["submit"],
  setup({ modelValue, options }, { emit }) {
    return () =>
      h(
        <Forms
          options={options}
          vModel={modelValue}
          API={{
            FORM: {
              model: modelValue,
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
            },
          }}
        >
          <div style="display: flex; justify-content: center;">
            <a-button onClick={() => emit("cancle")}>取消</a-button>
            <a-button type="primary" onClick={() => emit("submit")}>
              保存
            </a-button>
          </div>
        </Forms>
      );
  },
  components,
};
</script>