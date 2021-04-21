import dialog from '@/components/dialog/index.vue'
export default {
    install: (app) => {
        app.component(dialog.name, dialog)
    }
}