export const loginRequest = () => ({
    type: 'LOGIN_REQUEST',
});

export const loginSuccess = (payload: { userId: string; sessionId: string; }) => ({
    type: 'LOGIN_SUCCESS',
    payload,
});

export const loginFailure = (err: Error) => ({
    type: 'LOGIN_FAILURE',
    error: true,
    payload: err,
});
