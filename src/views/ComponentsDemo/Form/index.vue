<script>
import {
  defineComponent,
  h,
  reactive,
  getCurrentInstance,
  defineAsyncComponent,
} from "vue";
import formOptions from "./form";
import ComForm from "@/components/form";

export default defineComponent({
  components: {
    ComForm,
    ComHandleUploadPic: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "ComHandleUploadPic" */ "@/components/upload/handle-upload-pic"
      )
    ),
  },
  setup: () => {
    const { ctx } = getCurrentInstance();
    const HANDLES = {};
    const STATE = reactive({
      LOADINGS: false,
      FORM: {
        fileList: [],
      },
    });
    return () =>
      h(
        <ComForm
          options={formOptions()}
          vModel={STATE["FORM"]}
          el-form-item={{ size: "medium" }}
          label-width="80px"
          onFormMethods={({
            validate,
            validateField,
            resetFields,
            clearValidate,
          }) => {
            HANDLES["FORM"] = {
              validate,
              validateField,
              resetFields,
              clearValidate,
            };
          }}
          vSlots={{
            default: () => (
              <>
                <el-form-item label="上传">
                  <ComHandleUploadPic
                    vModel={STATE["FORM"].fileList}
                    limit={3}
                    accept="image/jpeg,image/png"
                    onUploadMethods={({ onInit, onSuccess }) => {
                      HANDLES["UPLOAD"] = { onInit, onSuccess };
                    }}
                    vSlots={{
                      tip: () => <>只能上传 jpg/png 格式文件，且不超过 3 张</>,
                    }}
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    loading={STATE["LOADINGS"]}
                    type="primary"
                    onClick={() => {
                      console.log(STATE["FORM"]);
                      if (HANDLES["UPLOAD"].onSuccess()) {
                        ctx.Message.warning("文件正在上传中");
                        return;
                      }
                      STATE["LOADINGS"] = true;
                      HANDLES["FORM"].validate((valid) => {
                        if (valid) {
                        }
                        setTimeout(() => (STATE["LOADINGS"] = false), 3000);
                      });
                    }}
                  >
                    保存
                  </el-button>
                  <el-button
                    onClick={() => {
                      HANDLES["UPLOAD"].onInit();
                      HANDLES["FORM"].resetFields();
                    }}
                  >
                    取消
                  </el-button>
                </el-form-item>
              </>
            ),
          }}
        />
      );
  },
});
</script>