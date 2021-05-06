<script>
import { h, reactive, getCurrentInstance } from "vue";
import { ComSearchBar } from "@/components";
export default {
  components: {
    ComSearchBar,
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const STATE = reactive({
      SEARCHBAR: {},
    });
    const SearchOptions = {
      gender: {
        type: "select",
        selectOptions: "gender",
        attrs: {},
        formItem: {
          label: "性别",
        },
      },
      qq: {
        type: "input",
        attrs: {},
        formItem: {
          label: "qq",
        },
      },
      name: {
        type: "input",
        attrs: {
          required: true,
          rules: [],
        },
        formItem: {
          label: "姓名",
        },
        slots: {
          append: () => (
            <el-button
              icon="el-icon-search"
              type="primary"
              onClick={() => console.log(STATE.SEARCHBAR)}
            />
          ),
        },
      },
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
                  onClick={() => ctx.$message.info("新增")}
                >
                  新增
                </el-button>
                <el-button
                  icon="el-icon-delete"
                  type="danger"
                  onClick={() => ctx.$message.error("批量删除")}
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