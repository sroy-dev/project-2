export enum AuthRoutesEnum {
    LOGIN = '/auth/login',
    REGISTER = '/auth/register',
    FORGOT_PASSWORD = '/auth/forgot-password',
    RESET_PASSWORD = '/auth/reset-password',
}

export enum AppRoutesEnum {
    DASHBOARD = '/',
    CHANNEL_MESSAGES = '/channel/:channelId',
    DIRECT_MESSAGES = '/direct/:userId',
    PROFILE = '/profile',
}

export enum ErrorRoutesEnum {
    NOT_FOUND = '/404',
}
