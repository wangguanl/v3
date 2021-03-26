export default class Pending {
    constructor() {
        // 用于存储每个ajax请求的取消函数和ajax标识
        this.pending = [];
    }

    // 存储每个ajax请求的取消函数和ajax标识
    ADD_PENGDING(p) {
        this.pending.push(p)
    }
    // 删除重复对应的ajax请求的取消函数和ajax标识
    REMOVE_PENGDING(pd) {
        for (let p = this.pending.length - 1; p >= 0; p--) {
            if (this.pending[p].u === (pd.url + '&' + pd.method)) {
                // 当前请求在数组中存在时执行函数体
                this.pending[p].f({
                    code: 200,
                    url: this.pending[p].u
                }); //执行取消操作
                this.pending.splice(p, 1); //把这条记录从数组中移除
            }
        }
    }
    // 终止所有请求
    REMOVE_PENGDINGS() {
        for (let p = this.pending.length - 1; p >= 0; p--) {
            this.pending[p].f({
                code: 200
            }); //执行取消操作
            this.pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}