<script>
import { resolveComponent, h } from "vue";
export default {
  inheritAttrs: false,
  props: {
    // 数据
    datas: {
      type: Array,
      default: () => [],
    },
    // 表格单项
    columns: {
      type: Array,
      default: () => [],
    },
    API: {
      type: Object,
      default: () => ({
        TABLE: {
          type: "selection",
        },
        COLUMN: {},
      }),
    },
  },
  emits: ["selection-change"],
  setup({ datas, columns, API }, { emit, slots }) {
    return () =>
      h(
        <el-table
          data={datas.data}
          style="width: 100%"
          height="100%"
          highlight-current-row
          stripe
          border
          onSelectionChange={(selection) => emit("selection-change", selection)}
          {...API["TABLE"]}
        >
          <el-table-column
            type={API["TABLE"]["type"]}
            label="排序"
            width="50"
            fixed="left"
            align="center"
          />
          {
            /*
             * type: img | text
             * key: 键 => prop
             * label: table-column组件label
             * attrs: table-column组件API
             */
            columns.map(({ key, label, type, attrs }) =>
              h(
                resolveComponent("el-table-column"),
                {
                  // "show-overflow-tooltip": true,
                  ...API["COLUMN"],
                  label,
                  ...attrs,
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
            )
          }
          {slots.default && slots.default()}
        </el-table>
      );
  },
};
</script>