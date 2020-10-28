type LoginResponse = {
    userId: string;
    sessionId: string;
};

export const login = (username: string, password: string): Promise<LoginResponse> => {
    return new Promise<LoginResponse>(resolve => {
        setTimeout(resolve, 1000);
    });
};
