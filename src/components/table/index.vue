<script>
import { defineComponent, resolveComponent, h } from "vue";
import useConcatConfig from "../hooks/concat-config";
export default defineComponent({
  name: "com-table",
  inheritAttrs: false,
  props: {
    // 数据
    datas: {
      type: Array,
      default: () => [],
    },
    // 表格单项
    /*
     * type: img | text
     * key: 键 => prop
     * label: table-column组件label
     * attrs: table-column组件API
     */
    columns: {
      default: () => [],
      required: true,
      type: [Object, Array],
    },
    // 参考 el-table-column 组件API
    elTableColumn: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["selection-change"],
  setup(props, { emit, slots, attrs }) {
    const COLUMNS = useConcatConfig(props["columns"]);
    return () =>
      h(
        <el-table
          data={props["datas"]}
          style="width: 100%"
          height="100%"
          highlight-current-row
          stripe
          border
          onSelectionChange={(selection) => emit("selection-change", selection)}
          {...attrs}
          v-slots={{
            default: () => (
              <>
                <el-table-column
                  type={attrs["type"]}
                  label="排序"
                  width="50"
                  fixed="left"
                  align="center"
                />
                {COLUMNS.map(({ key, label, type, attrs: columnAttrs }) =>
                  h(
                    resolveComponent("el-table-column"),
                    {
                      "show-overflow-tooltip": true,
                      ...props["elTableColumn"],
                      label,
                      ...columnAttrs,
                    },
                    {
                      default: ({ row }) => {
                        if (type === "img") {
                          return (
                            <el-image
                              style="width: 100px; height: 100px"
                              src={row[key]}
                              fit="fill"
                            />
                          );
                        }
                        return row[key];
                      },
                    }
                  )
                )}
                {Object.values(slots).map((slot) => slot())}
              </>
            ),
          }}
        />
      );
  },
});
</script>

<style scoped>
.el-table {
  flex: 1;
  overflow: hidden;
}
</style>