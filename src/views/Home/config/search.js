export default [
    {
        type: 'input',
        key: 'name',
        attrs: {
            required: true,
            rules: [],
        },
        formItem: {
            label: '姓名',
        },
    },
    {
        type: 'input',
        key: 'qq',
        attrs: {
        },
        formItem: {
            label: 'qq',
        },
    },
    {
        type: 'select',
        key: 'gender',
        selectOptions: 'gender',
        attrs: {
        },
        formItem: {
            label: '性别',
        },
    }
]