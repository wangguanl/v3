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
    buttons: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["search"],
  setup({ modelValue, options, buttons }, { emit }) {
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
                layout: "inline",
              },
            }}
          >
            <a-form-item>
              <a-button type="primary" onClick={() => emit("search")}>
                搜索
              </a-button>
            </a-form-item>
          </Forms>
          <div class="buttons">
            {buttons.map((btn) => (
              <a-button {...btn}>{btn.name}</a-button>
            ))}
          </div>
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
    & > * {
      margin-right: 10px;
    }
  }
}
</style>
