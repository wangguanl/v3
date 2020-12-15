import {
    customRef
} from 'vue';
import axios from "@/basics/request.js";
export default ({
    url,
    data,
    params
}, value) => {
    return customRef((track, trigger) => {

        return {
            get() {
                return axios.post(url, {
                    trans: "body",
                    data,
                    params
                }).then(datas => {
                    track()
                    value = datas
                    return value
                })
                // console.log(datas)
                // return datas
            },
            set(newValue) {
                value = newValue
                trigger()
            }
        }
    })
}