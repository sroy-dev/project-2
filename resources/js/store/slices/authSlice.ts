import { AuthEnum } from '@/enums/authEnums'
import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    user: null,
    team: null,
    members: [],
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
            }
            state.team = action.payload.team
            state.members = action.payload.team_members
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
        },
        addMember: (state, action) => {
            state.members.unshift(action.payload)
        },
    },
})

export const { setUser, setToken, removeToken, removeUser, addMember } = authSlice.actions
export default authSlice.reducer
