<script>
/* 配置项 */
import { formOptions, searchOptions, columnsOptions } from "./config";

/* 模拟数据 */
import { MockTableData } from "./mock";

/* 组件 */
/* import Tables from "@/components/Tables";
import Forms from "@/components/Forms";
import CForms from "@/components/CForms";
const components = {
  Tables,
  Forms,
  CForms,
}; */
import drag from "./hooks/drag";

import { useStore } from "vuex";
import { FetchPostConfDocCommonselectList } from "./api";

import { reactive, h, ref, defineAsyncComponent } from "vue";
export default {
  setup() {
    // 响应式数据
    const State = reactive({
      LOADING: false,

      SEARCHBAR: {}, // 搜索条件

      TABLE: [], // 表格数据
      // 分页
      PAGINATION: {
        total: 0,
        pageSize: 20,
        currentPage: 1,
      },
      DIALOG: {
        modelValue: false,
        title: "",
        width: "1000px",
        top: "0",
      },

      FORM: {},
    });
    // 操作事件函数
    const Handles = {};

    // 方法
    const Methods = {
      // 获取表格数据
      FetchGetTableData: () => {
        State.LOADING = true;
        MockTableData({
          data: {
            currentPage: State.PAGINATION.currentPage,
            pageSize: State.PAGINATION.pageSize,
          },
        })
          .then(({ data, total }) => {
            State.TABLE = data;
            State.PAGINATION.total = total;
          })
          .finally(() => (State.LOADING = false));
      },
      // 获取字典集
      FetchPostConfDocCommonselectList: () => {
        const Store = useStore();
        FetchPostConfDocCommonselectList({
          other: {
            trans: "body",
          },
          data: [],
        }).then((data) => {
          Store.dispatch("SET_Dictionaries", data);
        });
      },
    };

    Methods.FetchGetTableData();
    Methods.FetchPostConfDocCommonselectList();

    // 设置dialog
    const dialogRef = ref(null);
    drag(dialogRef);

    return () =>
      h(
        <div className="Wrap">
          <Forms
            options={searchOptions}
            vModel={State.SEARCHBAR}
            inline
            el-form-item={{ "label-width": "200px" }}
            v-slots={{
              default: () => (
                <el-form-item>
                  <el-button
                    type="primary"
                    onClick={() => {
                      State.PAGINATION.currentPage = 1;
                      Methods.FetchGetTableData();
                    }}
                  >
                    搜索
                  </el-button>
                  <el-button
                    type="primary"
                    onClick={() => {
                      State.DIALOG.modelValue = true;
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
            type="selection"
            v-slots={{
              default: () => (
                <el-table-column
                  label="操作"
                  minWidth="200"
                  fixed="right"
                  align="center"
                  v-slots={{
                    default: ({ row }) => (
                      <>
                        <el-button
                          onClick={() => {
                            State.DIALOG.modelValue = true;
                            State.DIALOG.title = "编辑";
                            State.FORM = { ...row };
                          }}
                        >
                          编辑
                        </el-button>
                        <el-button onClick={() => console.log(row)}>
                          查看详情
                        </el-button>
                      </>
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
              Methods.FetchGetTableData();
            }}
            onCurrentChange={(currentPage) => {
              State.PAGINATION.currentPage = currentPage;
              Methods.FetchGetTableData();
            }}
          />
          <el-dialog
            ref={dialogRef}
            {...State.DIALOG}
            v-model={State.DIALOG.modelValue}
            v-slots={{
              default: () => (
                <CForms
                  vModel={State.FORM}
                  options={formOptions}
                  required
                  onCancle={() => {
                    State.DIALOG.modelValue = false;
                  }}
                  onSubmit={() => {
                    State.DIALOG.modelValue = false;
                    console.log(State.FORM);
                  }}
                />
              ),
            }}
          />
        </div>
        /* <Teleport to="body">
      </Teleport> */
      );
  },
  components: {
    Tables: defineAsyncComponent(() => import("@/components/Tables")),
    Forms: defineAsyncComponent(() => import("@/components/Forms")),
    CForms: defineAsyncComponent(() => import("@/components/CForms")),
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
  & > .el-overlay {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5vh 0;
    box-sizing: border-box;
    .el-dialog {
      margin: unset;
      // height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .el-dialog__header {
        flex-shrink: 0;
        cursor: move;
      }
      .el-dialog__body {
        height: 100%;
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
</style>