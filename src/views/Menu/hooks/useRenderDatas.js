import { reactive } from 'vue';

export default () => {

    const state = reactive({
        datas: [],
        len: 0,
    });

    function createRandom(n) {
        return Math.ceil(Math.random() * n);
    }
    function createDatas() {
        const arr = [];
        for (let i = 0; i < state.len; i++) {
            arr.push(Math.random());
        }
        return arr;
    }
    function renderData(datas) {
        state.datas = [...datas, ...state.datas];
    }

    const methods = {
        buttonClick: (n) => {
            state.len = createRandom(n);
            renderData(createDatas());
        },
    };

    return {
        state,
        methods,
    };
}
