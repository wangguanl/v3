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
  Teleport,
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
    Teleport,
  },
  setup(props, { attrs, emit }) {
    const { ctx } = getCurrentInstance();
    const uploadRef = ref(null);
    const STATE = reactive({
      Preview: {
        initialIndex: 0,
        visible: false,
        list: [],
      },
    });
    var MergeAttrs = {};
    const METHODS = {
      // 超出上传数量
      useExceed: () => ctx.Message.warning(`最多可以上传${MergeAttrs.limit}张`),
      // 校验上传文件
      useBeforeUpload: (() => {
        const TypeSuffix = {
          "image/*": [
            "pjp",
            "jpg",
            "jpeg",
            "pjpeg",
            "jfif",
            "gif",
            "png",
            "bmp",
            "webp",
            "svgz",
            "xbm",
            "tif",
            "ico",
            "tiff",
            "svg",
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
          let pass;
          const accept = MergeAttrs.accept ? MergeAttrs.accept.split(",") : [];
          if (accept.some((acc) => acc === "*")) {
            pass = true;
          } else {
            const names = file.name.split(".");
            const suffix = names[names.length - 1].toLocaleLowerCase();
            if (accept.some((acc) => acc === "image/*")) {
              // 文件后缀名 jpg pdf doc
              pass = TypeSuffix["image/*"].some(
                (imgType) => imgType.toLocaleLowerCase() === suffix
              );
            } else {
              pass = accept.some((acc) => {
                // 文件后缀名 jpg pdf doc
                const accType = acc.split("/");
                const accSuffix = accType[
                  accType.length - 1
                ].toLocaleLowerCase();
                if (accSuffix === "jpeg") {
                  return ["pjp", "jpg", "jpeg", "pjpeg", "jfif"].some(
                    (v) => v === suffix
                  );
                } else {
                  return accSuffix === suffix;
                }
              });
            }
            if (!pass) {
              ctx.Notification.warning({
                title: "提示",
                message: `${
                  file.name
                } 文件格式错误，请上传 ${accept.toString()} 格式的文件`,
                duration: 0,
                dangerouslyUseHTMLString: true,
              });
            }
          }
          return pass;
        };
      })(),
      // 删除文件询问
      useBeforeRemove: () =>
        ctx.MessageBox.confirm("是否删除该文件?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }),
      // 自定义上传
      useHttpRequest: (() => {
        let timer = null;
        let IMGS = {};
        return (file) => {
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
                for (let uid in result) {
                  let { status, file_name, source_file_url } = result[uid];
                  if (status === "fulfilled") {
                    // 成功
                    IMGS[uid].onSuccess(result[uid]);
                  } else if (status === "rejected") {
                    // 失败
                    ctx.Notification.error({
                      title: "提示",
                      message: IMGS[uid].file.name + " 文件上传失败",
                      duration: 0,
                    });
                    IMGS[uid].onError();
                  }
                }
                IMGS = {};
              });
            timer = null;
          }, 1000);
        };
      })(),
    };
    const HANDLES = {
      onChange: (file, fileList) => {
        emit("update:modelValue", fileList);
        METHODS.useBeforeUpload(file);
      },
      onSubmit: () => {
        props["modelValue"]
          .filter(({ status }) => status !== "success")
          .every((file) => METHODS.useBeforeUpload(file)) &&
          uploadRef.value.submit();
      },
      onRemove: (file, fileList) => {
        props["modelValue"].splice(props["modelValue"].indexOf(file), 1);
        fileList = props["modelValue"];
      },
      onPreview(file) {
        STATE.Preview = {
          initialIndex: props["modelValue"].indexOf(file),
          visible: true,
          list: props["modelValue"].map(({ url, name }) =>
            url.startsWith(location.protocol + "//" + location.hostname) ||
            url.startsWith(
              "blob:" + location.protocol + "//" + location.hostname
            )
              ? url
              : ip + url
          ),
        };
        console.log(STATE.Preview);
      },
    };
    onMounted(() => {
      if (uploadRef.value.$el.querySelector(".el-upload-list")) {
        Sortable.create(uploadRef.value.$el.querySelector(".el-upload-list"), {
          onEnd: (evt) => {
            const tempArr = props["modelValue"].slice();
            console.log(tempArr);
            tempArr.splice(evt.newIndex, 0, tempArr.splice(evt.oldIndex, 1)[0]);
            emit("update:modelValue", tempArr);
          },
        });
      }
    });
    MergeAttrs = mergeProps(
      {
        action: "",
        multiple: true,
        accept: "image/*",
        "list-type": "picture-card",
        "auto-upload": false,
        "file-list": props["modelValue"],
        "on-exceed": METHODS.useExceed,
        "http-request": METHODS.useHttpRequest,
        "before-remove": METHODS.useBeforeRemove,
        "on-remove": HANDLES.onRemove,
        "on-preview": HANDLES.onPreview,
        "on-change": HANDLES.onChange,
      },
      attrs
    );
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
          {STATE.Preview.visible ? (
            <Teleport to="body">
              <el-image-viewer
                z-index={2021}
                initial-index={STATE.Preview.initialIndex}
                url-list={STATE.Preview.list}
                onClose={() => (STATE.Preview.visible = false)}
              />
            </Teleport>
          ) : null}
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