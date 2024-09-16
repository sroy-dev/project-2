import { Button } from '@/components/button'
import { TextInput } from '@/components/form-input'
import { Modal, ModalRef } from '@/components/modal'
import { useCreateChannelMutation } from '@/store/apis/channelApi'
import { toast } from '@/utils/toastUtils'
import { Form, Formik, FormikProps } from 'formik'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { object, string } from 'yup'

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
}

const validationSchema = object().shape({
    name: string().required().label('Name'),
})

const ChannelAddModal = forwardRef<any>((props, ref) => {
    const formRef = useRef<FormikProps<typeof initialValues>>(null)
    const modalRef = useRef<ModalRef>(null)

    const [createChannel, { isLoading }] = useCreateChannelMutation()

    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current?.open()
        },
        close: () => {},
    }))

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            await createChannel(values)
                .unwrap()
                .then(() => {
                    modalRef.current?.close()
                    formRef.current?.resetForm()
                    toast({
                        message: 'Channel created successfully',
                        type: 'success',
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal ref={modalRef} title='Create New Channel' size='md'>
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className='p-4'>
                    <TextInput name='name' label='Name' placeholder='Enter name' />
                    <div className='mt-4'>
                        <Button type='submit' className='' loading={isLoading}>
                            Create Channel
                        </Button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
})

export default ChannelAddModal
