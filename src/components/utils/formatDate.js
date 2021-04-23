// 传入的时间转为 年-月-日
export default (date) => {
    //获取当前时间的年份转为字符串
    let year = date.getFullYear();
    //获取月份，由于月份从0开始，此处要加1，判断是否小于10，如果是在字符串前面拼接'0'
    let month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1; //'04'
    //获取天，判断是否小于10，如果是在字符串前面拼接'0'
    let da =
        date.getDate() < 10
            ? "0" + date.getDate().toString()
            : date.getDate().toString(); //'12'
    return year + "-" + month + "-" + da;
}