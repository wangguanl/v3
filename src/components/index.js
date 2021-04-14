import cHandleUploadPic from '@/components/c-upload/handle-upload-pic.vue'
export default {
    install: (app) => {
        app.component(cHandleUploadPic.name, cHandleUploadPic)
    }
}