<script>
import searchOptions from "./search.js";
import ComSearchBar from "@/components/searchbar";
import { h, reactive } from "vue";
export default {
  components: {
    ComSearchBar,
  },
  setup() {
    const STATE = reactive({
      SEARCHBAR: {},
    });
    const SearchOptions = searchOptions();
    SearchOptions.name.slots = {
      append: () => <el-button icon="el-icon-search" type="primary" />,
    };
    return () =>
      h(
        <ComSearchBar
          options={SearchOptions}
          vModel={STATE["SEARCHBAR"]}
          vSlots={{
            default: () => (
              <>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  onClick={() => {}}
                >
                  新增
                </el-button>
                <el-button
                  icon="el-icon-delete"
                  type="danger"
                  onClick={() => {}}
                >
                  批量删除
                </el-button>
              </>
            ),
          }}
        />
      );
  },
};
</script>

<style>
</style>