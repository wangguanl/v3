<script>
import { reactive, ref, toRefs, h, watch, watchEffect } from "vue";
import SearchBar from "./SearchBar";
import searchBar from "./config";
const components = { SearchBar };
export default {
  setup() {
    const State = reactive({
      jrbzh: "18156",
    });
    const METHODS = {
      onSearch() {
        console.log(State);
      },
    };
    return () =>
      h(
        <SearchBar
          vModel={State}
          searchBar={{
            options: searchBar,
            buttons: [
              {
                name: "新增",
                handle: () => console.log("新增"),
              },
              {
                name: "编辑",
                type: "primary",
                handle: () => console.log("编辑"),
              },
            ],
          }}
          onSearch={METHODS.onSearch}
        />
      );
  },
  components,
};
</script>

<style>
</style>