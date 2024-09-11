import { Spinner } from '@/components/preloader'
import { AuthEnum } from '@/enums/authEnums'
import { AuthRoutesEnum } from '@/enums/routeEnums'
import { BaseState } from '@/store'
import { useLazyMeQuery } from '@/store/apis/authApi'
import { setToken } from '@/store/slices/authSlice'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const BaseApp: FC = () => {
    const [showPreloader, setShowPreloader] = useState(true)
    const { user } = useSelector((state: BaseState) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [autoLogin, { isLoading }] = useLazyMeQuery()

    const localAccessToken = localStorage.getItem(AuthEnum.LOCAL_STORAGE_TOKEN_KEY)
    const localUser = localStorage.getItem(AuthEnum.LOCAL_STORAGE_USER_KEY)
    useEffect(() => {
        if (localAccessToken) {
            autoLogin()
                .unwrap()
                .then((data) => {
                    dispatch(setToken(localAccessToken))
                })
                .finally(() => {
                    setShowPreloader(false)
                })
        } else {
            setShowPreloader(false)
        }

        // if (!localAccessToken && !localUser) {
        //     navigate(AuthRoutesEnum.LOGIN)
        // } else {
        //     dispatch(setToken(localAccessToken))
        //     dispatch(setUser(JSON.parse(localUser as string)))
        // }
    }, [])

    useEffect(() => {
        if (!user && !localAccessToken && !localUser) {
            navigate(AuthRoutesEnum.LOGIN)
        }
    }, [user])

    return showPreloader ? (
        <div className='h-screen flex justify-center items-center'>
            <Spinner size='xLarge' color='primary' />
        </div>
    ) : (
        <Outlet />
    )
}

export default BaseApp
