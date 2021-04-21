<script>
/* 配置项 */
import { formOptions, searchOptions, columnsOptions } from "./config";

/* 模拟数据 */
import { FetchPostDictionaries, FetchPostTableData } from "./api";

import { useStore } from "vuex";
import { DICTIONARIES } from "@/store/types";
import {
  reactive,
  h,
  defineAsyncComponent,
  getCurrentInstance,
  nextTick,
  defineComponent,
} from "vue";
import ComSearchBar from "@/components/searchbar";
import ComTable from "@/components/table";
import ComForm from "@/components/form";

export default defineComponent({
  components: {
    ComSearchBar,
    ComTable,
    ComForm,
    ComHandleUploadPic: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "ComHandleUploadPic" */ "@/components/upload/handle-upload-pic"
      )
    ),
  },
  async setup() {
    const Store = useStore();
    const { ctx } = getCurrentInstance();
    // 响应式数据
    const STATE = reactive({
      LOADINGS: {
        table: true,
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
        visible: false,
        attr: {
          title: "",
          width: "1000px",
          top: "0",
        },
      },

      FORM: {
        fileList: [],
      },
    });
    // 操作事件函数
    const HANDLES = {
      UPLOAD: {},
      FORM: {},
      onToggleOpenDialog: (visible, attr = {}) => {
        STATE["DIALOG"] = {
          visible,
          attr: { ...STATE["DIALOG"].attr, ...attr },
        };
      },
    };

    // 方法
    const METHDOS = {
      // 获取字典集
      FetchPostDictionaries: async () => {
        const data = await FetchPostDictionaries();
        Store.commit(DICTIONARIES.mutations, data);
      },
      // 获取表格数据
      FetchPostTableData: async () => {
        STATE["LOADINGS"].table = true;
        const { name, qq, gender } = STATE["SEARCHBAR"];
        const { currentPage, pageSize } = STATE["PAGINATION"];
        const { data, total } = await FetchPostTableData({
          name,
          qq,
          gender,
          currentPage,
          pageSize,
        });
        STATE["TABLE"] = data.map((item) => {
          item.genderName =
            Store.state[DICTIONARIES.state].gender[item.gender].label;
          return item;
        });
        STATE["PAGINATION"].total = total;
        STATE["LOADINGS"].table = false;
      },
    };

    // 接口初始化
    await METHDOS.FetchPostDictionaries();
    await METHDOS.FetchPostTableData();

    const SearchOptions = searchOptions();
    SearchOptions.name.slots = {
      append: () => (
        <el-button
          icon="el-icon-search"
          type="primary"
          onClick={() => {
            STATE["PAGINATION"].currentPage = 1;
            METHDOS.FetchPostTableData();
          }}
        />
      ),
    };
    return () =>
      h(
        <div className="wrap">
          <ComSearchBar
            options={searchOptions()}
            vModel={STATE["SEARCHBAR"]}
            vSlots={{
              default: () => (
                <>
                  <el-button
                    icon="el-icon-search"
                    type="primary"
                    onClick={() => {
                      STATE["PAGINATION"].currentPage = 1;
                      METHDOS.FetchPostTableData();
                    }}
                  >
                    搜索
                  </el-button>

                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    onClick={() => {
                      HANDLES.onToggleOpenDialog(true, {
                        title: "新增",
                      });
                    }}
                  >
                    新增
                  </el-button>
                  <el-button
                    icon="el-icon-delete"
                    type="danger"
                    onClick={() => {
                      console.log(STATE["SELECTIONS"]);
                    }}
                  >
                    批量删除
                  </el-button>
                </>
              ),
            }}
          />
          <ComTable
            v-loading={STATE["LOADINGS"].table}
            datas={STATE["TABLE"]}
            columns={columnsOptions()}
            onSelectionChange={(rows) => (
              console.log(rows), (STATE["SELECTIONS"] = [...rows])
            )}
            type="selection"
            el-table-column={{ align: "center" }}
            vSlots={{
              default: () => (
                <el-table-column
                  label="操作"
                  width="200"
                  fixed="right"
                  align="center"
                  vSlots={{
                    default: ({ row }) => (
                      <>
                        <el-button
                          onClick={() => {
                            console.log(row);
                            HANDLES.onToggleOpenDialog(true, {
                              title: "编辑",
                            });
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
          <com-dialog
            {...STATE["DIALOG"].attr}
            onClosed={async () => {
              STATE["FORM"] = {
                fileList: [],
              };
              HANDLES["FORM"].resetFields();
              await nextTick();
              HANDLES["FORM"].clearValidate();
            }}
            vModel={STATE["DIALOG"].visible}
            vSlots={{
              default: () => (
                <ComForm
                  options={formOptions()}
                  vModel={STATE["FORM"]}
                  el-form-item={{ size: "medium" }}
                  label-width="80px"
                  onFormMethods={({
                    validate,
                    validateField,
                    resetFields,
                    clearValidate,
                  }) => {
                    HANDLES["FORM"] = {
                      validate,
                      validateField,
                      resetFields,
                      clearValidate,
                    };
                  }}
                  vSlots={{
                    default: () => (
                      <>
                        <el-form-item label="上传">
                          <ComHandleUploadPic
                            vModel={STATE["FORM"].fileList}
                            limit={3}
                            accept="image/jpeg,image/png"
                            onUploadMethods={({ onInit, onSuccess }) => {
                              HANDLES["UPLOAD"] = { onInit, onSuccess };
                            }}
                            vSlots={{
                              tip: () => (
                                <>只能上传 jpg/png 格式文件，且不超过 3 张</>
                              ),
                            }}
                          />
                        </el-form-item>
                        <el-form-item>
                          <el-button
                            loading={STATE["LOADINGS"].submit}
                            type="primary"
                            onClick={() => {
                              if (HANDLES["UPLOAD"].onSuccess()) {
                                ctx.Message.warning("文件正在上传中");
                                return;
                              }
                              STATE["LOADINGS"].submit = true;
                              dialogFormRef.value.validate((valid) => {
                                if (valid) {
                                  HANDLES.onToggleOpenDialog(false);
                                }
                                setTimeout(
                                  () => (STATE["LOADINGS"].submit = false),
                                  3000
                                );
                              });
                            }}
                          >
                            保存
                          </el-button>
                          <el-button
                            onClick={() => {
                              HANDLES["UPLOAD"].onInit();
                              HANDLES.onToggleOpenDialog(false);
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
        </div>
      );
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .el-pagination {
    flex-shrink: 0;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>