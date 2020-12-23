export default function MockDatas() {
    const arr = [];
    let i = 0;
    while (i < 5) {
        arr.push({
            fawenzh: Math.random(),
        });
        i++;
    }
    return arr;
}