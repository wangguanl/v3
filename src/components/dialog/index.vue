<script>
import { defineComponent, h, Teleport, ref } from "vue";
import drag from "./utils/drag";
export default defineComponent({
  inheritAttrs: false,
  name: "com-dialog",
  props: {
    modelValue: {
      default: false,
    },
  },
  emits: ["update:modelValue"],
  directives: {
    drag: {
      mounted(el) {
        drag(el.querySelector(".el-dialog"));
      },
    },
    /* 设想2 */
    // 控制dialog的缩放
    zoom: {},
    /* 设想3 */
    // 控制dialog的最小化、还原
    minimize: {},
  },
  setup: (props, { attrs, slots, emit }) => {
    const dialog = ref(null);
    return () => (
      <Teleport to="body">
        <div vDrag>
          <el-dialog
            {...attrs}
            modelValue={props["modelValue"]}
            onOpen={() => emit("update:modelValue", true)}
            onClose={() => emit("update:modelValue", false)}
            v-slots={slots}
          />
        </div>
      </Teleport>
    );
  },
});
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
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 10px;
    .el-dialog__header {
      flex-shrink: 0;
      cursor: move;
    }
    .el-dialog__body {
      padding: 20px;
      flex: 1;
      overflow: auto;
    }
  }
}
</style>