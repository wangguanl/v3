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
        >
          <el-table-column
            type={attrs["type"]}
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
             * attr: table-column组件API
             */
            props["columns"].map(({ key, label, type, attr }) =>
              h(
                resolveComponent("el-table-column"),
                {
                  // "show-overflow-tooltip": true,
                  ...props["el-table-column"],
                  label,
                  ...attr,
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