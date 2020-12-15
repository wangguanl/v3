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
  toRefs,
  reactive,
  ref,
  shallowRef,
  h,
  onMounted,
  resolveComponent,
  version,
} from "vue";
import setupCustoms from "../hooks/setupCustoms";
import officialSetupCustom from "../hooks/officialSetupCustom";
export default defineComponent({
  inheritAttrs: false,
  props: {
    head: {
      type: Object,
      required: true,
      default: () => ({
        options: [],
        btns: [],
      }),
      // 查询条件为必传项
      validator: (head) => Array.isArray(head.options),
    },
  },
  setup({ head }, { attrs, emit }) {
    const aaa = reactive({ values: "" });
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
      onInput(key, val) {
        parmas[key] = val;
        methods.onSearch(false);
      },
      /*
       * key => 键
       * val => 值
       * immediately => Boolean 是否调用查询
       */
      onChange(key, val, immediately) {
        parmas[key] = val;
        methods.onSearch(immediately);
      },
      onSearch(immediately) {
        emit("search", { parmas, immediately });
      },
      onDelete() {
        emit("deleteAll");
      },
      onBtnClick(val) {
        emit("headBtnClick", { val, parmas });
      },
    };
    function renderC() {
      return (Dictionaries.value.BUKALX || []).map(() => (
        <div>
          <span>456789123</span>
        </div>
      ));
    }

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
          return DictionariesOptions.map(({ label, value }) => (
            <a-select-option value={value} key={value}>
              {label}
            </a-select-option>
          ));
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
          onChange: (vnode) => {
            methods.onChange(key, vnode.target.value, false);
          },
        }),
      },
      "date-picker": {
        props: {
          "value-format": "yyyy-MM-dd",
        },
        type: {
          daterange: (item) => ({
            "range-separator": "-",
            "start-placeholder": item.label + "开始日期",
            "end-placeholder": item.label + "结束日期",
            "picker-options": PickerOptions,
          }),
          month: (item) => ({
            "value-format": "yyyy-MM",
          }),
        },
        on: (key) => ({
          onInput: (...arg) => methods.onChange(key, ...arg),
          onClear: (...arg) => methods.onChange(key, ...arg),
        }),
      },
    };
    return () =>
      h(
        <div class="_flex _flex-items-center _e-head">
          {Object.values(parmas).map((val) => (
            <div>{val}</div>
          ))}

          {head.options.map((item) => {
            return h(
              resolveComponent("a-" + item.type),
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
                default: () =>
                  item.options ? config[item.type].children(item.options) : [],
              }
            );
          })}
        </div>
      );
  },
});
/* <el-button type="primary" onClick={methods.onSearch}>
            查询
          </el-button>
          <el-button onClick={methods.onDelete}>批量删除</el-button>
          {(head.btns || []).map((val) => (
            <el-button onClick={() => val.handle(parmas)}>{val.name}</el-button>
          ))} */
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
