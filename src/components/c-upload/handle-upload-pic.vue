<script>
import { baseURL } from "@/basics/request";
import {
  defineComponent,
  reactive,
  ref,
  getCurrentInstance,
  mergeProps,
  h,
  onMounted,
  Teleport,
} from "vue";
import Sortable from "sortablejs";
import axios, { uploadURL, ip, CancelToken } from "@/basics/request";
import ElImageViewer from "element-plus/es/el-image-viewer/index.js";
export default defineComponent({
  name: "c-handle-upload-pic",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "uploadMethods"],
  components: {
    ElImageViewer,
    Teleport,
  },
  setup(props, { attrs, slots, emit }) {
    const { ctx } = getCurrentInstance();
    const uploadRef = ref(null);
    var MergeAttrs = {},
      UploadRefMethods = {};
    const STATE = reactive({
      Preview: {
        initialIndex: 0,
        visible: false,
        list: [],
      },
      UploadLoading: false,
    });
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

            const Types = Object.keys(TypeSuffix);

            if (accept.some((acc) => Types[acc])) {
              pass = TypeSuffix[accept.toString()].some(
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
      useBeforeRemove: (file) => {
        if (file.status === "uploading") {
          ctx.Message.warning("文件正在上传中，请先终止上传再删除。");
          return false;
          /* return new Promise((resolve, reject) => {
            ctx.MessageBox.confirm("文件正在上传中，是否删除该文件?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                UploadRefMethods.onAbort();
                resolve();
              })
              .catch(() => reject());
          }); */
        } else {
          return ctx.MessageBox.confirm("是否删除该文件?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
        }
      },
      // 自定义上传
      useHttpRequest: (() => {
        let timer = null;
        let IMGS = {};
        return (file) => {
          IMGS[file.file.uid] = file;
          clearTimeout(timer);
          timer = setTimeout(() => {
            STATE.UploadLoading = true;
            const FileBuffer = new FormData();
            for (let uid in IMGS) {
              FileBuffer.append(uid, IMGS[uid].file);
            }
            axios
              .post(uploadURL, FileBuffer, {
                headers: { "Content-Type": "multipart/form-data" },
                cancelToken: new CancelToken(
                  (c) => (UploadRefMethods.onAbort = () => c({ code: 200 }))
                ),
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
              })
              .finally(() => (STATE.UploadLoading = false));
            timer = null;
          }, 300);
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
      },
    };
    onMounted(() => {
      UploadRefMethods = {
        onInit: () => {
          UploadRefMethods.onAbort();
          uploadRef.value.clearFiles();
        },
        onSuccess: () =>
          props["modelValue"].some(({ status }) => status !== "success"),
        onSubmit: HANDLES.onSubmit,
        onClearFiles: uploadRef.value.clearFiles,
        onAbort: () => {},
      };
      emit("uploadMethods", UploadRefMethods);
      const UploadListDom = uploadRef.value.$el.querySelector(
        ".el-upload-list"
      );
      if (UploadListDom) {
        Sortable.create(UploadListDom, {
          onEnd: (evt) => {
            const tempArr = props["modelValue"].slice();
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
          <el-upload
            ref={uploadRef}
            {...MergeAttrs}
            v-slots={{
              ...slots,
              default: () => (
                <>
                  <br />
                  <el-button
                    plain
                    onClick={() => {
                      if (STATE.UploadLoading) {
                        UploadRefMethods.onAbort();
                        props["modelValue"].forEach(
                          (file) =>
                            (file.status =
                              file.status === "uploading"
                                ? "ready"
                                : file.status)
                        );
                      } else {
                        HANDLES.onSubmit();
                      }
                    }}
                    type={STATE.UploadLoading ? "warning" : "primary"}
                  >
                    {STATE.UploadLoading ? "终止文件上传" : "上传到服务器"}
                  </el-button>
                  <el-button
                    plain
                    type="danger"
                    onClick={() => {
                      ctx.MessageBox.confirm("是否删除所有文件?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                      }).then(() => {
                        UploadRefMethods.onAbort();
                        UploadRefMethods.onClearFiles();
                      });
                    }}
                    style="margin-right: 20px"
                  >
                    清空所有文件
                  </el-button>
                </>
              ),
              trigger: () =>
                STATE.imageUrl ? (
                  <img src={STATE.imageUrl} class="avatar" />
                ) : (
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                ),
            }}
          />
          {STATE.Preview.visible ? (
            <Teleport to="body">
              <el-image-viewer
                z-index={3000}
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
.el-upload-list {
  display: inline-block;
  line-height: 1;
}
.el-upload--picture-card {
  margin-bottom: 10px;
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