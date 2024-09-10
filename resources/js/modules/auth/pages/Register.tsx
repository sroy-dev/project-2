import { Button } from '@/components/button'
import { TextInput } from '@/components/form-input'
import { AppRoutesEnum, AuthRoutesEnum } from '@/enums/routeEnums'
import { useRegisterMutation } from '@/store/apis/authApi'
import { Form, Formik, FormikProps } from 'formik'
import { FC, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { object, ref, string } from 'yup'

const initialValues = {
    name: '',
    email: '',
    password: '',
    repeat_password: '',
    team_name: '',
}

const validationSchema = object().shape({
    name: string().required().label('Name'),
    email: string().email().required().label('Email'),
    password: string().required().label('Password'),
    repeat_password: string().oneOf([ref('password'), ''], 'Passwords must match'),
    team_name: string().required().label('Team Name'),
})

const Register: FC = () => {
    const formikRef = useRef<FormikProps<any>>(null)
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    const handleSubmit = async (values: any) => {
        register(values)
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
            <h1 className='text-4xl font-bold mb-5 text-center'>Create an Account</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                innerRef={formikRef}
            >
                <Form>
                    <TextInput label='Name' name='name' placeholder='Enter your name' />
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
                        autoComplete='new-password'
                    />
                    <TextInput
                        label='Repeat Password'
                        name='repeat_password'
                        type='password'
                        placeholder='Repeat your password'
                        autoComplete='new-password'
                    />
                    <TextInput
                        label='Team Name'
                        name='team_name'
                        placeholder='Enter your team name'
                    />
                    <Button type='submit' loading={isLoading} className='w-full'>
                        Register
                    </Button>
                </Form>
            </Formik>
            <div className='text-center mt-4'>
                Already have an account?{' '}
                <Link to={AuthRoutesEnum.LOGIN} className='underline text-black'>
                    Sign In
                </Link>
            </div>
        </div>
    )
}

export default Register
