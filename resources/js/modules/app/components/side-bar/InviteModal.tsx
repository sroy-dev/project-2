import { Button } from '@/components/button'
import { TextInput } from '@/components/form-input'
import { Modal, ModalRef } from '@/components/modal'
import { Form, Formik, FormikProps } from 'formik'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { object, string } from 'yup'

const initialValues = {
    name: '',
    email: '',
}

const validationSchema = object().shape({
    name: string().required().label('Name'),
    email: string().email().required().label('Email'),
})

const InviteModal = forwardRef<any>((props, ref) => {
    const formRef = useRef<FormikProps<typeof initialValues>>(null)
    const modalRef = useRef<ModalRef>(null)

    useImperativeHandle(ref, () => ({
        open: () => {
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
                <Form className='p-4'>
                    <TextInput name='name' label='Name' placeholder='Enter name' />
                    <TextInput name='email' label='Email' placeholder='Enter email' />
                    <div className='mt-4'>
                        <Button type='submit' className=''>
                            Invite
                        </Button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
})

export default InviteModal
