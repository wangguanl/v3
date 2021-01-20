/*
 * 校验规则： 分为两种；最大化的处理rules规则校验，统一集成校验规则对象
 * 1. el-form 组件的 rules
 * 2. el-form-item 组件的 rules 与 required
 */
export default ({ options, required }, attrs) => {
    // 集成表单的rules
    const Rules = { ...attrs["rules"] };

    // 将option展开并去除null、undefined等空值
    const arr = options.flat().filter((option) => {
        if (option && !Rules[option.key]) {
            Rules[option.key] = [];
        }
        return option;
    });
    // 生成必填项
    const useRequiredRule = (type, label) => ({
        required: true,
        message: `请${type === "input" ? "输入" : "选择"}${label}`,
        trigger: type === "input" ? "blur" : "change",
    });
    // 全局必填项，设置每一个值都是必填项
    if (required) {
        arr.forEach(({ type, label, key, item = {} }) => {
            const { rules = [] } = item;
            Rules[key].unshift(useRequiredRule(type, label));
            Rules[key].concat(rules);
        });
    } else {
        // 统一集成 el-form-item 组件的 rules 与 required 的校验规则对象
        arr.forEach(({ type, label, key, item = {} }) => {
            const { required, rules = [] } = item;
            Rules[key].concat(rules);
            required && Rules[key].unshift(useRequiredRule(type, label));
        });
    }
    return Rules;
}