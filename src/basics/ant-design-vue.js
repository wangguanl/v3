import { Button, Form, Input, Select } from 'ant-design-vue';
const components = [Button, Form, Input, Select]
export default function (app) {
    components.forEach(component => app.component(component.name, component))
}