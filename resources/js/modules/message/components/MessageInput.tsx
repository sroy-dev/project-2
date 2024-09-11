import { Form, Formik } from 'formik'
import { FC } from 'react'
import { GoPaperAirplane } from 'react-icons/go'

interface MessageInputProps {
    onChange?: (message: string) => void
    onEnter?: (message: string) => void
}

const initialValues = {
    message: '',
}

const MessageInput: FC<MessageInputProps> = ({ onChange, onEnter }) => {
    // const [message, setMessage] = useState('')
    // const { sendMessage } = useMessage()

    const handleOnEnter = async (values: typeof initialValues) => {
        if (values.message.trim() === '') return

        // await sendMessage(values.message)
        if (onEnter) onEnter(values.message)
    }

    return (
        <div className='border-t border-slate-700/50 h-[60px] bg-white/5'>
            <Formik
                initialValues={initialValues}
                className='flex items-center h-full'
                onSubmit={handleOnEnter}
            >
                {({ values, handleChange, getFieldProps }) => (
                    <Form className='flex items-stretch'>
                        <div className='flex-grow'>
                            <input
                                type='text'
                                className='w-full h-full px-6 focus:outline-none bg-transparent'
                                placeholder='Type your message'
                                {...getFieldProps('message')}
                            />
                        </div>
                        <button
                            className='w-[60px] h-[60px] text-white text-lg flex items-center justify-center'
                            type='submit'
                        >
                            <GoPaperAirplane />
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default MessageInput
