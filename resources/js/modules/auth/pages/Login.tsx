import { Button } from '@/components/button'
import { TextInput } from '@/components/form-input'
import { AppRoutesEnum, AuthRoutesEnum } from '@/enums/routeEnums'
import { useLoginMutation } from '@/store/apis/authApi'
import { Form, Formik, FormikProps } from 'formik'
import { FC, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

const initialValues = {
    email: '',
    password: '',
}

const validationSchema = object().shape({
    email: string().email().required().label('Email'),
    password: string().required().label('Password'),
})

const Login: FC = () => {
    const formikRef = useRef<FormikProps<any>>(null)
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (values: any) => {
        login(values)
            .unwrap()
            .then(() => {
                navigate(AppRoutesEnum.DASHBOARD)
            })
            .catch((error: any) => {
                if (error.data) {
                    formikRef.current?.setErrors(error.data)
                }
            })
    }
    return (
        <div>
            <h1 className='text-4xl font-bold mb-5 text-center'>Sign In to Team Sync</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                innerRef={formikRef}
                onSubmit={handleSubmit}
            >
                <Form>
                    <TextInput
                        label='Email'
                        name='email'
                        placeholder='Enter your email'
                        autoComplete='username'
                    />
                    <TextInput
                        label='Password'
                        name='password'
                        type='password'
                        placeholder='Enter your password'
                        autoComplete='current-password'
                    />
                    <div className='mb-3 text-right'>
                        <Link className='underline' to={AuthRoutesEnum.FORGOT_PASSWORD}>
                            Forgot Password?
                        </Link>
                    </div>
                    <Button className='w-full' variant='primary' type='submit' loading={isLoading}>
                        Login
                    </Button>
                </Form>
            </Formik>

            <div className='text-center mt-4'>
                Don't have an account?{' '}
                <Link className='underline' to={AuthRoutesEnum.REGISTER}>
                    Register
                </Link>
            </div>
        </div>
    )
}

export default Login
