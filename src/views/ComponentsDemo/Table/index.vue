<script>
import { h, defineComponent, reactive } from "vue";
import { ComTable } from "@/components";
import columnsOptions from "./columns";
export default defineComponent({
  components: {
    ComTable,
  },
  setup: () => {
    const STATE = reactive({
      LOADINGS: false,
      TABLE: [],
    });
    return () =>
      h(
        <ComTable
          v-loading={STATE["LOADINGS"]}
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
      );
  },
});
</script>