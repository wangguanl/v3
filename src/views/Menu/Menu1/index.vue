<script>
import { defineComponent, resolveComponent, h, getCurrentInstance } from "vue";
export default defineComponent({
  components: {},
  setup() {
    const curInstance = getCurrentInstance();
    console.log(curInstance);
  },
  data() {
    return {
      num1: 1,
      num2: 2,
      level: 5,
      selectValue: 1,
      inputValue: "",
    };
  },
  computed: {
    sum() {
      return this.num1 + this.num2;
    },
  },
  methods: {
    changeNum() {
      this.num1 = Math.random();
      this.num2 = Math.random();
      this.level = Math.ceil(Math.random() * 5);
    },
  },
  render() {
    const Tag = "h" + this.level;
    return (
      <div>
        <el-button>123123</el-button>
        <a href="">123123</a>
        {h("input", {
          style: {
            border: "1px solid #ccc",
          },
          "v-model": this.inputValue,
          vModel: this.inputValue,
          value: this.inputValue,
          onInput: (arg) => {
            // console.log(arg);
            this.inputValue = arg.target.value;
          },
        })}
        {h(
          "div",
          {
            style: { color: "red" },
          },
          [h("p", {}, this.inputValue)]
        )}
        {h(
          resolveComponent("el-select"),
          {
            modelValue: this.selectValue,
            onChange: (val) => {
              this.selectValue = val;
            },
          },
          [
            { label: "option1", value: 1 },
            { label: "option2", value: 2 },
          ].map(({ label, value }) =>
            h(resolveComponent("el-option"), {
              label,
              value,
            })
          )
        )}

        <el-button onClick={this.changeNum}>随机数相加</el-button>
        <Tag>{Tag}</Tag>
        <header>{this.num1}</header>
        <main>{this.num2}</main>
        <footer
          id="foo"
          key="key"
          ref="ref"
          class={{ foo: true, bar: false }}
          style={{ color: "red", fontSize: "14px" }}
        >
          {this.sum}
        </footer>
      </div>
    );
  },
});
</script>