import {
    customRef
} from 'vue';
export default (value, delay = 200) => {
    let timeout
    return customRef((track, trigger) => {
        return {
            async get() {
                track()
                return timeout = await setTimeout(() => {
                    return value
                }, delay)
            },
            set(newValue) {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    value = newValue
                    trigger()
                }, delay)
            }
        }
    })
}