<script>
import { h, defineComponent, reactive } from "vue";
import { ComForm } from "@/components";
import { useRouter, useLink } from "vue-router";
export default defineComponent({
  components: {
    ComForm,
  },
  props: ["source"],

  setup: (props) => {
    const Router = useRouter();
    const options = [
      {
        key: "name",
        type: "input",
        attrs: {},
        formItem: {
          label: "姓名",
        },
      },
      {
        key: "pass",
        type: "input",
        attrs: {},
        formItem: {
          label: "密码",
        },
      },
    ];
    const STATE = reactive({
      FORM: {},
    });
    return () =>
      h(
        <>
          {props["source"]}
          <ComForm
            vModel={STATE["FORM"]}
            options={options}
            v-slots={{
              default: () => (
                <el-form-item>
                  <el-button
                    type="primary"
                    onClick={() => {
                      console.log(STATE["FORM"]);
                      Router.replace("/");
                    }}
                  >
                    登录
                  </el-button>
                  <el-button onClick={() => console.log("取消")}>
                    取消
                  </el-button>
                </el-form-item>
              ),
            }}
          />
        </>
      );
  },
});
</script>