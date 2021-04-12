<script>
import { baseURL } from "@/basics/request";
import generateUUID from "@/utils/unique";
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  ref,
  getCurrentInstance,
  mergeProps,
  h,
  onMounted,
} from "vue";
import Sortable from "sortablejs";
import axios, { uploadURL, ip } from "@/basics/request";
import ElImageViewer from "element-plus/es/el-image-viewer/index.js";
export default defineComponent({
  name: "c-upload",
  inhertAttrs: false,
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  components: {
    ElImageViewer,
  },
  setup(props, { attrs, slots, emit }) {
    const { ctx } = getCurrentInstance();
    const uploadRef = ref(null);
    const STATE = reactive({
      preview: {
        visible: false,
        list: [],
      },
    });
    const IMGS = {};
    let timer = null;
    var MergeAttrs = {};
    const METHODS = {
      // 超出上传数量
      useExceed: () => ctx.Message.warning(`最多可以上传${MergeAttrs.limit}张`),
      // 校验上传文件
      useBeforeUpload: () => {
        const TypeSuffix = {
          "image/*": [
            "jpg",
            "jpeg",
            "gif",
            "png",
            "bmp",
            "webp",
            "svgz",
            "xbm",
            "tif",
            "pjp",
            "pjpeg",
            "ico",
            "tiff",
            "svg",
            "jfif",
          ],
          "video/*": [
            "AVI",
            "MP4",
            "WMV",
            "MPEG",
            "QuickTime",
            "RealVideo",
            "Flash",
            "Mpeg-4",
          ],
        };
        return (file) => {
          let acceptResult;
          const accept = MergeAttrs.accept ? MergeAttrs.accept.split(",") : [];
          if (accept.some((val) => val === "*")) {
            acceptResult = true;
          } else {
            const names = file.name.split(".");
            // 文件后缀名 jpg pdf doc
            const suffix = names[names.length - 1].toLocaleLowerCase();
            acceptResult = accept.some((val) => {
              const typeSuffix = val.toLocaleLowerCase();
              // 根据已定义类型后缀进行判断
              return TypeSuffix[typeSuffix]
                ? TypeSuffix[typeSuffix].some(
                    (val) => val.toLocaleLowerCase() === suffix
                  )
                : "." + suffix === typeSuffix;
            });
            if (!acceptResult) {
              ctx.Message.error("请上传" + accept.toString() + "格式的文件");
            }
          }
          return acceptResult;
        };
      },
      // 删除文件询问
      useBeforeRemove: () =>
        ctx.MessageBox.confirm("是否删除该文件?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }),

      useHttpRequest: (file) => {
        console.log(file);
        IMGS[file.file.uid] = file;

        clearTimeout(timer);
        timer = setTimeout(() => {
          const FileBuffer = new FormData();
          for (let uid in IMGS) {
            FileBuffer.append(uid, IMGS[uid].file);
          }
          axios
            .post(uploadURL, FileBuffer, {
              headers: { "Content-Type": "multipart/form-data" },
              onUploadProgress: (progressEvent) => {
                const complete =
                  ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                Object.values(IMGS).forEach(({ onProgress }) =>
                  onProgress({ percent: complete })
                );
              },
            })
            .then((result) => {
              console.log(result);
              for (let uid in result) {
                let { status, file_name, source_file_url } = result[uid];
                if (status === "fulfilled") {
                  // 成功
                  IMGS[uid].onSuccess();
                  props["modelValue"].push({
                    ...result[uid],
                    uid,
                    name: file_name,
                    url: ip + source_file_url,
                    status: "success",
                  });
                } else if (status === "rejected") {
                  // 失败
                  ctx.Notification.error({
                    title: "提示",
                    message: IMGS[uid].file.name + " 文件上传失败",
                    duration: 0,
                  });
                  IMGS[uid].onError();
                }
                delete IMGS[uid];
              }
            });
          timer = null;
        }, 1000);
      },
    };
    const HANDLES = {
      onSubmit: () => uploadRef.value.submit(),
      onRemove: (file, fileList) => {
        emit(
          "update:modelValue",
          fileList.filter(({ status }) => status === "success")
        );
      },
      onPreview(file) {
        STATE.preview.visible = true;
        let startIndex = props["modelValue"].indexOf(file);
        let arr = [...props["modelValue"]];
        STATE.preview.list = [
          ...arr.splice(startIndex),
          ...arr,
        ].map(({ url }) =>
          url.startsWith(location.protocol + "//" + location.hostname)
            ? url
            : ip + url
        );
      },
    };
    onMounted(() => {
      if (uploadRef.value.$el.querySelector(".el-upload-list")) {
        Sortable.create(uploadRef.value.$el.querySelector(".el-upload-list"), {
          onEnd: (evt) => {
            const tempArr = [...props["modelValue"]];
            tempArr.splice(evt.newIndex, 0, tempArr.splice(evt.oldIndex, 1)[0]);
            emit(
              "update:modelValue",
              tempArr.filter((v) => v)
            );
          },
        });
      }
    });
    MergeAttrs = mergeProps(
      {
        "list-type": "picture-card",
        accept: "image/*",
        "auto-upload": false,
        multiple: true,
        limit: 99999,
        "file-list": props["modelValue"],
        "on-exceed": METHODS.useExceed,
        "http-request": METHODS.useHttpRequest,
        "before-remove": METHODS.useBeforeRemove,
        "on-remove": HANDLES.onRemove,
        "on-preview": HANDLES.onPreview,
      },
      attrs
    );
    // console.log(MergeAttrs);
    return () =>
      h(
        <>
          <el-upload ref={uploadRef} {...MergeAttrs}>
            {STATE.imageUrl ? (
              <img src={STATE.imageUrl} class="avatar" />
            ) : (
              <i class="el-icon-plus avatar-uploader-icon"></i>
            )}
          </el-upload>
          <el-button onClick={HANDLES.onSubmit}>上传</el-button>
          <el-image-viewer
            style={{ display: STATE.preview.visible ? "unset" : "none" }}
            url-list={STATE.preview.list}
            on-close={() => (STATE.preview.visible = false)}
          ></el-image-viewer>
        </>
      );
  },
});
</script>

<style lang="scss">
:deep(.el-image) {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-image__inner {
    max-width: 100%;
    max-height: 100%;
    height: unset;
    width: unset;
  }
}
.hidden .el-upload--picture-card {
  display: none;
}
:deep(.el-image-viewer__wrapper) {
  .el-icon-circle-close {
    color: #fff;
  }
}
</style>