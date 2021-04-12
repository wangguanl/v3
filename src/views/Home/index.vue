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
    // "c-upload": defineAsyncComponent(() =>
    //   import(/*webpackChunkName: "c-upload"*/ "@/components/c-upload")
    // ),
    "c-table": defineAsyncComponent(() =>
      import(/*webpackChunkName: "c-table"*/ "@/components/c-table")
    ),
    "c-form": defineAsyncComponent(() =>
      import(/*webpackChunkName: "c-form"*/ "@/components/c-form")
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
    const STATE = reactive({
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
        modelValue: true,
        title: "",
        width: "1000px",
        top: "0",
      },

      FORM: {
        fileList: [
          {
            name: "123",
            status: "success",
            url:
              "http://localhost:9999/upload/1618209689963_Y2E2OTY1ZjktNWYyMi00ZDc5LWIxYjctODJhNmUxNWZlZGFh.jpg",
          },
        ],
      },
    });
    // 操作事件函数
    const HANDLES = {};

    // 方法
    const METHDOS = {
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
        STATE["LOADINGS"].table = true;
        const { name, qq, gender } = STATE["SEARCHBAR"];
        const { currentPage, pageSize } = STATE["PAGINATION"];
        FetchPostTableData({ name, qq, gender, currentPage, pageSize })
          .then(({ data, total }) => {
            STATE["TABLE"] = data.map((item) => {
              item.genderName = ["女", "男"][item.gender];
              return item;
            });
            STATE["PAGINATION"].total = total;
          })
          .finally(() => (STATE["LOADINGS"].table = false));
      },
    };

    METHDOS.FetchPostDictionaries().then(() => {
      METHDOS.FetchPostTableData();
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
          <c-form
            options={searchOptions}
            v-model={STATE["SEARCHBAR"]}
            inline
            v-slots={{
              default: () => (
                <>
                  <el-form-item>
                    <el-button
                      type="primary"
                      onClick={() => {
                        STATE["PAGINATION"].currentPage = 1;
                        METHDOS.FetchPostTableData();
                      }}
                    >
                      搜索
                    </el-button>
                  </el-form-item>

                  <el-form-item style="float: right;">
                    <el-button
                      type="primary"
                      onClick={() => {
                        STATE["FORM"] = {
                          fileList: [],
                        };
                        STATE["DIALOG"].modelValue = true;
                        STATE["DIALOG"].title = "新增";
                      }}
                    >
                      新增
                    </el-button>
                    <el-button
                      type="danger"
                      onClick={() => {
                        console.log(STATE["SELECTIONS"]);
                      }}
                    >
                      批量删除
                    </el-button>
                  </el-form-item>
                </>
              ),
            }}
          />
          <c-table
            v-loading={STATE["LOADINGS"].table}
            datas={STATE["TABLE"]}
            columns={columnsOptions}
            onSelectionChange={(rows) => (
              console.log(rows), (STATE["SELECTIONS"] = [...rows])
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
                            STATE["DIALOG"].modelValue = true;
                            STATE["DIALOG"].title = "编辑";
                            STATE["FORM"] = { fileList: [], ...row };
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
            page-size={STATE["PAGINATION"].pageSize}
            current-page={STATE["PAGINATION"].currentPage}
            total={STATE["PAGINATION"].total}
            onSizeChange={(pageSize) => {
              STATE["PAGINATION"].pageSize = pageSize;
              STATE["PAGINATION"].currentPage = 1;
              METHDOS.FetchPostTableData();
            }}
            onCurrentChange={(currentPage) => {
              STATE["PAGINATION"].currentPage = currentPage;
              METHDOS.FetchPostTableData();
            }}
          />
          <el-dialog
            ref={dialogRef}
            {...STATE["DIALOG"]}
            v-model={STATE["DIALOG"].modelValue}
            v-slots={{
              default: () => (
                <c-form
                  options={formOptions}
                  v-model={STATE["FORM"]}
                  el-form-item={{ size: "medium" }}
                  label-width="80px"
                  onValidate={(elFormRef) => {
                    dialogFormRef.value = elFormRef;
                  }}
                  v-slots={{
                    default: () => (
                      <>
                        <el-form-item label="上传">
                          <c-upload
                            v-model={STATE["FORM"].fileList}
                            limit={1}
                          />
                        </el-form-item>
                        <el-form-item>
                          <el-button
                            loading={STATE["LOADINGS"].submit}
                            type="primary"
                            onClick={() => {
                              console.log(STATE.FORM);
                              /* STATE["LOADINGS"].submit = true;
                              dialogFormRef.value.validate((valid) => {
                                if (valid) {
                                  STATE["DIALOG"].modelValue = false;
                                }
                                setTimeout(() => {
                                  STATE["LOADINGS"].submit = false;
                                }, 3000);
                              }); */
                            }}
                          >
                            保存
                          </el-button>
                          <el-button
                            onClick={() => {
                              STATE["DIALOG"].modelValue = false;
                            }}
                          >
                            取消
                          </el-button>
                        </el-form-item>
                      </>
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