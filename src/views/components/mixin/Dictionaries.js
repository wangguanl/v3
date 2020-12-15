import {
    mapGetters
} from "vuex";
export default {
    // 全局字典
    computed: {
        ...mapGetters(["Dictionaries"]),
    },
}