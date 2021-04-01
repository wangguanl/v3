import { reactive, onMounted, toRefs, computed } from 'vue';
export default () => {

    onMounted(() => {
        console.log('onMounted!useNumberCountHooks!')
    })
    const state = reactive({
        num1: 0,
        num2: 0,
        sum: computed(() => state.num1 + state.num2),
    });
    const methods = {
        changeNum(k) {
            if (typeof k === 'string') {
                state[k] = Math.random();
            } else {
                state.num1 = Math.random();
                state.num2 = Math.random();
            }
        },
    };
    return {
        state,
        methods,
    };

}