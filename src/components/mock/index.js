export const mockTableData = ({ data }) => {
    return new Promise((resolve) => {
        const { currentPage, pageSize } = data;
        const DATA = [];
        const m = currentPage + '-' + Math.random();
        for (let i = 0; i < pageSize; i++) {
            DATA.push({
                fawenzh: m,
                biaozhunmc: m,
                fawensj: m,
                wenbenmc: m,
                fawendw: m,
                yingyongfw: m
            });
        }
        setTimeout(() => {
            resolve({ data: DATA, total: 1000 });
        }, 1000);
    });
};