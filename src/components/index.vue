<script>
import FormOptions from "./config/form";
import columnsOptions from "./config/table";
import { mockTableData } from "./mock";
import { reactive, h, defineAsyncComponent } from "vue";
export default {
  setup() {
    // 响应式数据
    const State = reactive({
      LOADING: false,
      // 表单
      FORM: {
        jrbzh: "18156",
      },
      // 表格
      TABLES: [],
      // 分页
      PAGINATION: {
        total: 0,
        pageSize: 20,
        currentPage: 1,
      },
      DIALOG: {},
    });
    // 方法
    const Methods = {
      fetchGetTableData() {
        State.LOADING = true;
        mockTableData({
          data: {
            currentPage: State.PAGINATION.currentPage,
            pageSize: State.PAGINATION.pageSize,
          },
        })
          .then(({ data, total }) => {
            State.TABLES = data;
            State.PAGINATION.total = total;
          })
          .finally(() => (State.LOADING = false));
      },
    };
    // 操作
    const Handles = {};
    Methods.fetchGetTableData();
    return () =>
      h(
        <div className="Wrap">
          <SearchBar
            className="search-bar"
            vModel={State.FORM}
            options={FormOptions}
            onSearch={() => {
              State.PAGINATION.currentPage = 1;
              Methods.fetchGetTableData();
            }}
            buttons={[
              {
                name: "新增",
                type: "primary",
                onClick: () => (State.DIALOG.visible = true),
              },
              {
                name: "批量删除",
                type: "danger",
                onClick: () => console.log("批量删除", State.FORM),
              },
            ]}
          />
          <Tables
            className="table"
            v-loading={State.LOADING}
            datas={State.TABLES}
            columns={columnsOptions}
            API={{ TABLE: { type: "index" } }}
            v-slots={{
              buttons: () => (
                <el-table-column
                  label="操作"
                  minWidth="200"
                  fixed="right"
                  align="center"
                  v-slots={{
                    default: ({ row }) => (
                      <div>
                        <el-button onClick={() => console.log(row)}>
                          编辑
                        </el-button>
                        <el-button onClick={() => console.log(row)}>
                          查看详情
                        </el-button>
                      </div>
                    ),
                  }}
                />
              ),
            }}
          />
          <el-pagination
            className="pagination"
            layout="total, sizes, prev, pager, next, jumper"
            page-sizes={[20, 40, 80, 100, 200]}
            page-size={State.PAGINATION.pageSize}
            current-page={State.PAGINATION.currentPage}
            total={State.PAGINATION.total}
            onSizeChange={(pageSize) => {
              State.PAGINATION.pageSize = pageSize;
              State.PAGINATION.currentPage = 1;
              Methods.fetchGetTableData();
            }}
            onCurrentChange={(currentPage) => {
              State.PAGINATION.currentPage = currentPage;
              Methods.fetchGetTableData();
            }}
          />
          <el-dialog
            title="提示"
            v-model={State.DIALOG.visible}
            width={State.DIALOG.width}
            v-slots={{
              default: () => (
                <CForms
                  vModel={State.FORM}
                  options={FormOptions}
                  onCancle={() => (State.DIALOG.visible = false)}
                  onSubmit={() => (
                    (State.DIALOG.visible = false), console.log(State.FORM)
                  )}
                />
              ),
            }}
          />
        </div>
      );
  },
  components: {
    SearchBar: defineAsyncComponent(() => import("./SearchBar")),
    CForms: defineAsyncComponent(() => import("./CForms")),
    Tables: defineAsyncComponent(() => import("./Tables")),
  },

};
</script>

<style lang="scss" scoped>
::v-slotted(.Wrap) {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & > .search-bar {
    flex-shrink: 0;
    padding: 10px;
  }
  & > .table {
    flex: 1;
    overflow: hidden;
  }
  & > .pagination {
    flex-shrink: 0;
    padding: 10px;
  }
}
</style>