<script>
import { defineComponent, h, reactive } from "vue";
import Forms from "../Forms";
const components = {
  Forms,
};
export default defineComponent({
  props: {
    modelValue: Object,
    searchBar: {
      type: Object,
      default: () => ({
        options: [],
        buttons: [],
      }),
    },
  },
  emits: ["search"],
  setup({ searchBar, modelValue }, { emit }) {
    const METHODS = {
      onSearch() {
        emit("search");
      },
    };
    return () =>
      h(
        <div className="search-bar">
          <Forms options={searchBar.options} vModel={modelValue}>
            <a-button type="primary" onClick={METHODS.onSearch}>
              搜索
            </a-button>
          </Forms>
          <div>
            {searchBar.buttons.map((btn) => {
              console.log(btn);
              // return 123;
              //  v-bind={btn}
              return (
                <a-button onClick={() => btn.handle(modelValue)}>
                  {btn.name}
                </a-button>
              );
            })}
          </div>
        </div>
      );
  },
  components,
});
</script>
<style lang="scss" scoped>
::v-slotted(.search-bar) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
