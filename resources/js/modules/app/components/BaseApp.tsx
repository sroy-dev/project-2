import { AuthEnum } from '@/enums/authEnums'
import { AuthRoutesEnum } from '@/enums/routeEnums'
import { BaseState } from '@/store'
import { setToken, setUser } from '@/store/slices/authSlice'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const BaseApp: FC = () => {
    const { user } = useSelector((state: BaseState) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const localAccessToken = localStorage.getItem(AuthEnum.LOCAL_STORAGE_TOKEN_KEY)
    const localUser = localStorage.getItem(AuthEnum.LOCAL_STORAGE_USER_KEY)
    useEffect(() => {
        if (!localAccessToken && !localUser) {
            navigate(AuthRoutesEnum.LOGIN)
        } else {
            dispatch(setToken(localAccessToken))
            dispatch(setUser(JSON.parse(localUser as string)))
        }
    }, [])

    useEffect(() => {
        if (!user && !localAccessToken && !localUser) {
            navigate(AuthRoutesEnum.LOGIN)
        }
    }, [user])

    return (
        <>
            <Outlet />
        </>
    )
}

export default BaseApp
