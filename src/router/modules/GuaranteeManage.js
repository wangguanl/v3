const component = () => import('@/views/Home');
export default [{
    path: 'GuaranteeWages',
    name: 'GuaranteeWages',
    meta: {
        icon: '',
        title: '工资保障标准',
    },
    props: {
        status: '3'
    },
    component
}, {
    path: 'GuaranteeMedical',
    name: 'GuaranteeMedical',
    meta: {
        icon: '',
        title: '医疗保障标准',
    },
    props: {
        status: '4'
    },
    component
}, {
    path: 'GuaranteeClothing',
    name: 'GuaranteeClothing',
    meta: {
        icon: '',
        title: '被装保障标准',
    },
    props: {
        status: '2'
    },
    component
}, {
    path: 'GuaranteeHousing',
    name: 'GuaranteeHousing',
    meta: {
        icon: '',
        title: '住房保障标准',
    },
    props: {
        status: '1'
    },
    component
}]