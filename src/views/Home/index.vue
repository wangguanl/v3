<script>
/* 配置项 */
import { formOptions, searchOptions, columnsOptions } from "./config";

/* 模拟数据 */
import { mockTableData } from "./mock";

/* 组件 */
import Tables from "@/components/Tables";
import Forms from "@/components/Forms";
import Dialogs from "@/views/components/Dialogs";
import CForms from "@/views/components/CForms";
const components = {
  Tables,
  Dialogs,
  CForms,
};

import { reactive, h } from "vue";
export default {
  setup() {
    // 响应式数据
    const State = reactive({
      LOADING: false,

      SEARCHBAR: {}, // 搜索条件

      TABLE: { data: [] }, // 表格数据
      // 分页
      PAGINATION: {
        total: 0,
        pageSize: 20,
        currentPage: 1,
      },
      DIALOG: {
        visible: false,
        title: "",
        width: "1000px",
        top: 0,
      },

      FORM: {},
    });
    // 操作事件函数
    const Handles = {};

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
            State.TABLE.data = data;
            console.log(State.TABLE);
            State.PAGINATION.total = total;
          })
          .finally(() => (State.LOADING = false));
      },
    };

    Methods.fetchGetTableData();

    return () =>
      h(
        <div className="Wrap">
          <Forms
            options={searchOptions}
            vModel={State.SEARCHBAR}
            API={{
              FORM: {
                inline: true,
              },
            }}
            v-slots={{
              default: () => (
                <el-form-item>
                  <el-button
                    type="primary"
                    onClick={() => {
                      State.PAGINATION.currentPage = 1;
                      Methods.fetchGetTableData();
                    }}
                  >
                    搜索
                  </el-button>
                  <el-button
                    type="primary"
                    onClick={() => {
                      State.DIALOG.visible = true;
                      State.DIALOG.title = "新增";
                    }}
                  >
                    新增
                  </el-button>
                  <el-button
                    type="danger"
                    onClick={() => {
                      console.log("批量删除");
                    }}
                  >
                    批量删除
                  </el-button>
                </el-form-item>
              ),
            }}
          />
          <Tables
            className="table"
            v-loading={State.LOADING}
            datas={State.TABLE}
            columns={columnsOptions}
            onSelectionChange={(rows) => console.log(rows)}
            API={{
              TABLE: {
                type: "selection",
              },
            }}
            v-slots={{
              default: (
                <el-table-column
                  label="操作"
                  minWidth="200"
                  fixed="right"
                  align="center"
                  v-slots={{
                    default: ({ row }) => (
                      <div>
                        <el-button
                          onClick={() => {
                            State.DIALOG.visible = true;
                            State.FORM = { ...row };
                          }}
                        >
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
          <Dialogs
            v-model={State.DIALOG}
            v-slots={{
              default: () => (
                <CForms
                  vModel={State.FORM}
                  options={formOptions}
                  API={{
                    required: true,
                    FORM: {
                      rules: {},
                      // "label-width": "200px",
                    },
                    ITEM: {},
                  }}
                  onCancle={() => {
                    State.DIALOG.visible = false;
                  }}
                  onSubmit={() => {
                    (State.DIALOG.visible = false), console.log(State.FORM);
                  }}
                />
              ),
            }}
          />
        </div>
      );
  },
  components,
};
</script>

<style lang="scss" scoped>
::v-slotted(.Wrap) {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & > .el-form {
    flex-shrink: 0;
    padding: 10px;
    padding-bottom: 0;
  }
  & > .el-table {
    flex: 1;
    overflow: hidden;
  }
  & > .pagination {
    flex-shrink: 0;
    padding: 10px;
  }
}
</style>