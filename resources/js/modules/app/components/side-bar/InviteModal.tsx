import { Modal, ModalRef } from '@/components/modal'
import { Form, Formik, FormikProps } from 'formik'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { number, object, string } from 'yup'

const initialValues = {
    communityPostId: 0,
    reason: '',
}

const validationSchema = object().shape({
    communityPostId: number().required().label('Post'),
    reason: string().required().label('Reason'),
})

const InviteModal = forwardRef<any>((props, ref) => {
    const formRef = useRef<FormikProps<typeof initialValues>>(null)
    const modalRef = useRef<ModalRef>(null)

    useImperativeHandle(ref, () => ({
        open: (data = null) => {
            modalRef.current?.open()
        },
        close: () => {},
    }))

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            // await axios.post('/api/invite', values)
            // modalRef.current?.close()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal ref={modalRef} title='Invite New Member' size='md'>
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>sdfsd</Form>
            </Formik>
        </Modal>
    )
})

export default InviteModal
