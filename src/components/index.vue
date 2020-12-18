<script>
import FORM from "./config/form";
import columns from "./config/table";
import { reactive, h, defineAsyncComponent } from "vue";
export default {
  setup() {
    const State = reactive({
      jrbzh: "18156",
    });
    const METHODS = {
      onSearch() {
        console.log(State);
      },
      onSubmit() {
        console.log(State);
      },
    };
    const datas = [];
    let i = 0;
    while (i < 5) {
      datas.push({
        fawenzh: Math.random(),
      });
      i++;
    }
    const buttons = {
      type: "buttons",
      attrs: {
        label: "操作",
        minWidth: 200,
        buttons: [
          {
            name: "编辑",
            handle: (row) => console.log(row),
          },
          {
            name: "查看",
            handle: (row) => console.log(row),
          },
        ],
      },
    };
    console.log(columns);
    return () =>
      h(
        <div>
          <Tables datas={datas} columns={[...columns, buttons]}></Tables>
        </div>
      );
  },
  components: {
    SearchBar: defineAsyncComponent(() => import("./SearchBar")),
    CForms: defineAsyncComponent(() => import("./CForms")),
    Tables: defineAsyncComponent(() => import("./Tables")),
  },

  /*   <CForms
            vModel={State}
            options={FORM}
            onSubmit={() => console.log(State)}
          />  <SearchBar
            vModel={State}
            options={FORM}
            buttons={[
              {
                name: "新增",
                onClick: () => console.log("新增", State),
              },
              {
                name: "编辑",
                type: "primary",
                onClick: () => console.log("编辑", State),
              },
            ]}
            onSearch={METHODS.onSearch}
          /> */
};
</script>

<style>
</style>