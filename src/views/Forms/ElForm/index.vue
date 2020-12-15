<script>
const PickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      },
    },
  ],
};
import axios from "@/basics/request.js";
import {
  defineComponent,
  reactive,
  shallowRef,
  h,
  resolveComponent,
} from "vue";
import Options from "../config";
export default defineComponent({
  setup(props, { emit }) {
    const Dictionaries = shallowRef({});
    axios
      .post("/jbk/ConfDocCommon/selectList", {
        trans: "body",
        data: [],
      })
      .then((datas) => {
        Dictionaries.value = datas;
      });
    const parmas = reactive({});
    const methods = {
      /*
       * key => 键
       * val => 值
       * immediately => Boolean 是否调用查询
       */
      onChange(key, val, immediately) {
        parmas[key] = val;
      },
    };

    // el-*的基本配置
    const config = {
      select: {
        props: {
          filterable: "",
          clearable: "",
        },
        /*
         * 两种类型使用
         * options为数组时， 直接使用
         * options为string时，意为key，使用全局字典，
         */
        children: (options) => {
          let DictionariesOptions = [];
          if (typeof options === "string" && Dictionaries.value[options]) {
            DictionariesOptions = Dictionaries.value[options].map(
              ({ zidiandm, zidianz }) => ({
                label: zidianz,
                value: zidiandm,
              })
            );
          }
          const Vnode = DictionariesOptions.map(({ label, value }) => (
            <el-option label={label} value={value} key={value}></el-option>
          ));
          console.log(Vnode);
          return Vnode;
        },

        on: (key) => ({
          onChange: ([val, obj]) => methods.onChange(key, val, true),
        }),
      },
      input: {
        props: {
          clearable: true,
        },
        on: (key) => ({
          onInput: (val) => {
            methods.onChange(key, val, false);
          },
        }),
      },
    };
    return () =>
      h(
        <div class="_flex _flex-items-center _e-head">
          {Object.values(parmas).map((val) => (
            <div>{val}</div>
          ))}

          {Options.map((item) => {
            return h(
              resolveComponent("el-" + item.type),
              {
                ...config[item.type].props,
                ...(config[item.type].type
                  ? item.props && item.props.type
                    ? config[item.type].type[item.props.type](item)
                    : {}
                  : {}),
                ...item.props,
                ...config[item.type].attrs,
                placeholder: `请${item.type === "input" ? "输入" : "选择"}${
                  item.label
                }`,
                ...item.attrs,
                modelValue: parmas[item.key],
                ...config[item.type].on(item.key),
              },
              {
                /* default: () => [
                  <el-option value="1" label="2"></el-option>,
                  <el-option value="3" label="4"></el-option>,
                ], */
                default: () =>
                  item.options
                    ? config[item.type].children(item.options)
                    : [<el-option value="1" label="2"></el-option>],
              }
            );
          })}
        </div>
      );
  },
});
</script>
<style lang="scss">
._e-head {
  & > .el-input {
    width: auto;
  }
  & > *:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
