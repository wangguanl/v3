<script>
/* 配置项 */
import { formOptions, searchOptions, columnsOptions } from "./config";

/* 模拟数据 */
import { FetchPostDictionaries, FetchPostTableData } from "./api";

/*  */
import hookDrag from "./hooks/drag";
import utilDrag from "./utils/drag";

import { useStore } from "vuex";
import { DICTIONARIES } from "@/store/types";

import {
  Teleport,
  reactive,
  h,
  ref,
  defineAsyncComponent,
  onMounted,
  Suspense,
} from "vue";
export default {
  components: {
    Tables: defineAsyncComponent(() =>
      import(/*webpackChunkName: "Tables"*/ "@/components/Tables")
    ),
    Forms: defineAsyncComponent(() =>
      import(/*webpackChunkName: "Forms"*/ "@/components/Forms")
    ),
  },
  directives: {
    // 使用自定义指令控制dialog拖拽，但是因为teleport多根元素的原因，vue弹出waring而无法绑定，所以只是设想，还没有真正应对teleport的实施方案
    drag: {
      created() {},
      mounted() {},
    },
    /* 设想2 */
    // 控制dialog的缩放
    zoom: {},
    /* 设想3 */
    // 控制dialog的最小化、还原
    minimize: {},
  },
  setup() {
    // 响应式数据
    const State = reactive({
      LOADINGS: {
        table: false,
        submit: false,
      },
      SEARCHBAR: {}, // 搜索条件

      TABLE: [], // 表格数据
      SELECTIONS: [], // 选中的表格数据
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
      // 获取字典集
      FetchPostDictionaries: () => {
        return new Promise(async (resolve, reject) => {
          const Store = useStore();
          const data = await FetchPostDictionaries();
          await Store.commit(DICTIONARIES.mutations, data);

          resolve();
        });
      },
      // 获取表格数据
      FetchPostTableData: () => {
        State.LOADINGS.table = true;
        const { name, qq, gender } = State.SEARCHBAR;
        const { currentPage, pageSize } = State.PAGINATION;
        FetchPostTableData({ name, qq, gender, currentPage, pageSize })
          .then(({ data, total }) => {
            State.TABLE = data.map((item) => {
              item.genderName = ["女", "男"][item.gender];
              return item;
            });
            State.PAGINATION.total = total;
          })
          .finally(() => (State.LOADINGS.table = false));
      },
    };

    Methods.FetchPostDictionaries().then(() => {
      Methods.FetchPostTableData();
    });

    // 设置dialog
    const dialogRef = ref(null);
    const dialogFormRef = ref(null);
    // hookDrag(dialogRef);
    onMounted(() => {
      utilDrag(dialogRef.value.dialogRef);
    });

    return () =>
      h(
        // <Suspense>
        <div className="wrap">
          <Forms
            options={searchOptions}
            v-model={State.SEARCHBAR}
            inline
            v-slots={{
              default: () => (
                <>
                  <el-form-item>
                    <el-button
                      type="primary"
                      onClick={() => {
                        State.PAGINATION.currentPage = 1;
                        Methods.FetchPostTableData();
                      }}
                    >
                      搜索
                    </el-button>
                  </el-form-item>

                  <el-form-item style="float: right;">
                    <el-button
                      type="primary"
                      onClick={() => {
                        State.FORM = {};
                        State.DIALOG.modelValue = true;
                        State.DIALOG.title = "新增";
                      }}
                    >
                      新增
                    </el-button>
                    <el-button
                      type="danger"
                      onClick={() => {
                        console.log(State.SELECTIONS);
                      }}
                    >
                      批量删除
                    </el-button>
                  </el-form-item>
                </>
              ),
            }}
          />
          <Tables
            v-loading={State.LOADINGS.table}
            datas={State.TABLE}
            columns={columnsOptions}
            onSelectionChange={(rows) => (
              console.log(rows), (State.SELECTIONS = [...rows])
            )}
            type="selection"
            v-slots={{
              default: () => (
                <el-table-column
                  label="操作"
                  width="200"
                  fixed="right"
                  align="center"
                  v-slots={{
                    default: ({ row }) => (
                      <>
                        <el-button
                          onClick={() => {
                            console.log(row);
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
            layout="total, sizes, prev, pager, next, jumper"
            page-sizes={[20, 40, 80, 100, 200]}
            page-size={State.PAGINATION.pageSize}
            current-page={State.PAGINATION.currentPage}
            total={State.PAGINATION.total}
            onSizeChange={(pageSize) => {
              State.PAGINATION.pageSize = pageSize;
              State.PAGINATION.currentPage = 1;
              Methods.FetchPostTableData();
            }}
            onCurrentChange={(currentPage) => {
              State.PAGINATION.currentPage = currentPage;
              Methods.FetchPostTableData();
            }}
          />
          <el-dialog
            ref={dialogRef}
            {...State.DIALOG}
            v-model={State.DIALOG.modelValue}
            v-slots={{
              default: () => (
                <Forms
                  options={formOptions}
                  v-model={State.FORM}
                  el-form-item={{ size: "medium" }}
                  label-width="80px"
                  onValidate={(elFormRef) => {
                    console.log(elFormRef);
                    dialogFormRef.value = elFormRef;
                  }}
                  v-slots={{
                    default: () => (
                      <el-form-item>
                        <el-button
                          loading={State.LOADINGS.submit}
                          type="primary"
                          onClick={() => {
                            State.LOADINGS.submit = true;
                            dialogFormRef.value.validate((valid) => {
                              if (valid) {
                                State.DIALOG.modelValue = false;
                              }
                              setTimeout(() => {
                                State.LOADINGS.submit = false;
                              }, 3000);
                            });
                          }}
                        >
                          保存
                        </el-button>
                        <el-button
                          onClick={() => {
                            State.DIALOG.modelValue = false;
                          }}
                        >
                          取消
                        </el-button>
                      </el-form-item>
                    ),
                  }}
                />
              ),
            }}
          />
          <Teleport to="body"></Teleport>
        </div>
        // </Suspense>
      );
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & > .el-form {
    flex-shrink: 0;
    padding: 10px;
    padding-bottom: 0;
    :deep(.el-form-item) {
      margin-bottom: 10px;
    }
  }
  & > .el-table {
    flex: 1;
    overflow: hidden;
  }
  & > .el-pagination {
    flex-shrink: 0;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
:deep(.el-overlay) {
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
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 10px;
    .el-dialog__header {
      flex-shrink: 0;
      cursor: move;
    }
    .el-dialog__body {
      padding: 20px;
      flex: 1;
      overflow: auto;
    }
  }
}
</style>