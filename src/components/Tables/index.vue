<script>
import { resolveComponent, h } from "vue";
export default {
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
    // 表格按钮
    buttons: {
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
  emits: ["selectionChange"],
  setup({ datas, columns, API }, { emit }) {
    console.log(columns)
    return () =>
      h(
        <el-table
          data={datas}
          style="width: 100%"
          height="100%"
          stripe
          border
          highlight-current-row
          onSelectionChange={() => emit("selectionChange")}
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
             * attrs: table-column组件API
             */
            columns.map(({ type, attrs }) =>
              h(
                resolveComponent("el-table-column"),
                {
                  "show-overflow-tooltip": true,
                  ...API["COLUMN"],
                  ...attrs,
                },
                {
                  default: ({ row }) => {
                    if (type === "img") {
                      return (
                        <el-image
                          style="width: 100px; height: 100px"
                          src={row[attrs.key]}
                          fit="fill"
                        />
                      );
                    } else if (type === "buttons") {
                      return attrs.buttons
                        .filter(({ rule }) => (rule ? rule(row, $index) : true))
                        .map((button) => (
                          <el-button
                            style="font-size: 12px"
                            type="text"
                            onClick={() => button.handle(row)}
                          >
                            {button.name}
                          </el-button>
                        ));
                    }
                    return row[attrs.key];
                  },
                }
              )
            )
          }
        </el-table>
      );
  },
};
</script>