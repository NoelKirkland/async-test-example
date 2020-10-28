const login: jest.Mock = require('api/api').login;
jest.mock('api/api', () => ({
    login: jest.fn(),
}));
jest.mock('util/log', () => ({
    log: {
        debug: jest.fn(),
        info: jest.fn(),
        error: jest.fn(),
    },
}));

import { loginThunk } from './loginThunk';
import { loginRequest, loginSuccess, loginFailure } from 'actions/sessionActions';

describe('loginThunk', () => {
    it('dispatches a login request', async () => {
        const dispatch = jest.fn();
        await loginThunk('username', 'password')(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loginRequest());
    });

    describe('when login succeeds', () => {
        beforeEach(() => {
            login.mockResolvedValue({ userId: 'foo', sessionId: 'bar' });
        });

        it('dispatches success', async () => {
            const dispatch = jest.fn();
            await loginThunk('username', 'password')(dispatch);

            expect(dispatch).toHaveBeenLastCalledWith(loginSuccess({ userId: 'foo', sessionId: 'bar' }));
        });
    });

    describe('when login fails', () => {
        const error = new Error('FAIL!');

        beforeEach(() => {
            login.mockRejectedValue(error);
        });

        it('dispatches failure', async () => {
            const dispatch = jest.fn();
            await loginThunk('username', 'password')(dispatch);

            expect(dispatch).toHaveBeenLastCalledWith(loginFailure(error));
        });
    });
});
