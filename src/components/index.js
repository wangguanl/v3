import dialog from '@/components/dialog'
export default {
    install: (app) => {
        app.component(dialog.name, dialog)
    }
}