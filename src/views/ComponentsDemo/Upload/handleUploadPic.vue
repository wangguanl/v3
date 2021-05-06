<script>
import { defineComponent, h, reactive } from "vue";
import { ComHandleUploadPic } from "@/components";
export default defineComponent({
  components: {
    ComHandleUploadPic,
  },
  setup: () => {
    const STATE = reactive({
      FILE_LIST: [],
    });
    const HANDLES = {
      UPLOAD: {},
    };
    return () =>
      h(
        <ComHandleUploadPic
          vModel={STATE["FILE_LIST"]}
          limit={3}
          accept="image/jpeg,image/png"
          onUploadMethods={({ onInit, onUploaded }) => {
            HANDLES["UPLOAD"] = { onInit, onUploaded };
          }}
          vSlots={{
            tip: () => <>只能上传 jpg/png 格式文件，且不超过 3 张</>,
          }}
        />
      );
  },
});
</script>