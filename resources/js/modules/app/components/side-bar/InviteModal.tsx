import { Button } from '@/components/button'
import { TextInput } from '@/components/form-input'
import { Modal, ModalRef } from '@/components/modal'
import { useCreateMemberMutation } from '@/store/apis/teamApi'
import { toast } from '@/utils/toastUtils'
import { Form, Formik, FormikProps } from 'formik'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { object, ref, string } from 'yup'

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
}

const validationSchema = object().shape({
    name: string().required().label('Name'),
    email: string().email().required().label('Email'),
    password: string().required().label('Password'),
    confirm_password: string()
        .required()
        .oneOf([ref('password')], 'Passwords do not match')
        .label('Confirm Password'),
})

const InviteModal = forwardRef<any>((props, ref) => {
    const formRef = useRef<FormikProps<typeof initialValues>>(null)
    const modalRef = useRef<ModalRef>(null)

    const [createMember, { isLoading }] = useCreateMemberMutation()

    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current?.open()
        },
        close: () => {},
    }))

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            await createMember(values)
                .unwrap()
                .then(() => {
                    modalRef.current?.close()
                    formRef.current?.resetForm()
                    toast({
                        message: 'Member invited successfully',
                        type: 'success',
                    })
                })
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
                    <TextInput
                        name='password'
                        label='Password'
                        type='password'
                        placeholder='Enter password'
                    />
                    <TextInput
                        name='confirm_password'
                        label='Confirm Password'
                        type='password'
                        placeholder='Confirm password'
                    />
                    <div className='mt-4'>
                        <Button type='submit' className='' loading={isLoading}>
                            Invite Member
                        </Button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
})

export default InviteModal
