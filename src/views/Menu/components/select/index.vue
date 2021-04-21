<script>
import { h, resolveComponent } from "vue";
export default {
  inheritAttrs: false,
  props: {
    prepend: {
      required: true,
      type: String,
    },
    elSelector: {
      required: true,
      type: String,
    },
  },
  setup: (props, { attrs, slots }) => {
    return () =>
      h(
        <div class={"_select " + attrs.size}>
          <div class="label">{props["prepend"]}</div>
          {h(resolveComponent("el-" + props["elSelector"]), attrs, () =>
            Object.values(slots).map((slot) => slot())
          )}
        </div>
      );
  },
};
</script>

<style lang="scss" scoped="">
._select {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
  &.mini {
    height: 28px;
  }
  &.small {
    height: 32px;
  }
  &.medium {
    height: 40px;
  }
  .label {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 100%;
    background-color: #F5F7FA;
    color: #909399;
    padding: 0 20px;
    width: auto;
    white-space: nowrap;
    border: 1px solid #DCDFE6;
    border-radius: 4px 0 0 4px;
    border-right: 0;
    box-sizing: border-box;
  }
  :deep([class^="el-"]) {
    flex: 1;
    .el-input__inner {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>