<script>
import { defineComponent, resolveComponent, h } from "vue";
export default defineComponent({
  name: "c-table",
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
      type: Array,
      default: () => [],
    },
    // 参考 el-table-column 组件API
    "el-table-column": Object,
  },
  emits: ["selection-change"],
  setup(props, { emit, slots, attrs }) {
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
                {props["columns"].map(
                  ({ key, label, type, attrs: columnAttrs }) =>
                    h(
                      resolveComponent("el-table-column"),
                      {
                        // "show-overflow-tooltip": true,
                        ...props["el-table-column"],
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