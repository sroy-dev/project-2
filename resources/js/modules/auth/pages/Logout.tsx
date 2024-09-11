import { AuthRoutesEnum } from '@/enums/routeEnums'
import { useLogoutMutation } from '@/store/apis/authApi'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout: FC = () => {
    const [logout, { isLoading }] = useLogoutMutation()
    const navigate = useNavigate()

    useEffect(() => {
        logout()
            .unwrap()
            .then(() => {
                navigate(AuthRoutesEnum.LOGIN)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }, [logout])

    return <div></div>
}

export default Logout
