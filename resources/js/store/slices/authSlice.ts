import { AuthEnum } from '@/enums/authEnums'
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem(AuthEnum.LOCAL_STORAGE_USER_KEY, JSON.stringify(action.payload))
        },
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem(AuthEnum.LOCAL_STORAGE_TOKEN_KEY, action.payload)
        },
        removeToken: (state) => {
            state.token = null
            localStorage.removeItem(AuthEnum.LOCAL_STORAGE_TOKEN_KEY)
        },
        removeUser: (state) => {
            state.user = null
            localStorage.removeItem(AuthEnum.LOCAL_STORAGE_USER_KEY)
        },
    },
})

export const { setUser, setToken, removeToken, removeUser } = authSlice.actions
export default authSlice.reducer
