<script>
import { h } from "vue";
import Forms from "../Forms";
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
    buttons: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["search"],
  setup({ modelValue, options, buttons }, { emit, slots }) {
    return () =>
      h(
        <div className="search-bar">
          <Forms
            className="forms"
            options={options}
            vModel={modelValue}
            API={{
              FORM: {
                model: modelValue,
                inline: true,
              },
            }}
          >
            <el-form-item style="margin-bottom: 10px">
              <el-button type="primary" onClick={() => emit("search")}>
                搜索
              </el-button>
            </el-form-item>
          </Forms>
          <div class="buttons">{slots.default()}</div>
        </div>
      );
  },
  components,
};
</script>
<style lang="scss" scoped>
::v-slotted(.search-bar) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .forms {
    flex: 1;
  }
  .buttons {
    display: flex;
  }
}
</style>
