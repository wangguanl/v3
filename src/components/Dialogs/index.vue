<script>
import drag from "./drag";
import { h, onMounted, ref } from "vue";
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        visible: false,
        width: "1000px",
        title: "",
      }),
    },
  },
  setup({ modelValue }, { slots }) {
    const dialogRef = ref(null);
    onMounted(() => {
      drag(dialogRef.value.dialogRef);
    });
    return () =>
      h(
        <el-dialog
          v-model={modelValue.visible}
          ref={dialogRef}
          width={modelValue.width}
          title={modelValue.title}
          top="0"
        >
          {slots.default()}
        </el-dialog>
      );
  },
};
</script>

<style lang="scss">
.el-overlay {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5vh 0;
  box-sizing: border-box;
  .el-dialog {
    margin: unset;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .el-dialog__header {
      flex-shrink: 0;
      cursor: move;
    }
    .el-dialog__body {
      height: 100%;
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>