import { Dispatch } from 'redux';
import { loginRequest, loginFailure, loginSuccess } from 'actions/sessionActions';
import { login } from 'api/api';
import { log } from 'util/log';

export const loginThunk = (username: string, password: string) => async (dispatch: Dispatch) => {
    log.debug(`Login attempt for user ${username}`);

    dispatch(loginRequest());
    try {
        const { userId, sessionId } = await login(username, password);
        log.info(`Login succeeded: ${userId} in session ${sessionId}`);
        dispatch(loginSuccess({ userId, sessionId }));
    }
    catch (err) {
        log.error(`Login failed: ${err}`);
        dispatch(loginFailure(err));
    }
};
