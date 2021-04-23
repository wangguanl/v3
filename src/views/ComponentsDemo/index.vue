<script>
import { defineComponent, h } from "vue";
export default defineComponent({
  setup: () => () => h(<router-view />),
});
</script>
