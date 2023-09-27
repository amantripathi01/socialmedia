// Test generated by RoostGPT for test SocialMediaTest using AI Type Open AI and AI Model gpt-4

const axios = require("axios");
const { loginUser } = require("./User");

jest.mock('axios');

describe("User Login", () => {
    beforeEach(() => {
        axios.post.mockClear();
    });

    test("should dispatch LoginRequest and LoginSuccess on successful login", async () => {
        const dispatch = jest.fn();
        const response = { data: { user: { email: 'test@test.com', password: 'test1234' } } };
        axios.post.mockResolvedValue(response);

        await loginUser('test@test.com', 'test1234')(dispatch);

        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'LoginRequest' });
        expect(axios.post).toHaveBeenCalledWith('/api/v1/login', { email: 'test@test.com', password: 'test1234' }, { headers: { "Content-Type": "application/json" } });
        expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'LoginSuccess', payload: response.data.user });
    });

    test("should dispatch LoginRequest and LoginFailure on failed login", async () => {
        const dispatch = jest.fn();
        const error = { response: { data: { message: 'Login failed' } } };
        axios.post.mockRejectedValue(error);

        await loginUser('test@test.com', 'wrongpassword')(dispatch);

        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'LoginRequest' });
        expect(axios.post).toHaveBeenCalledWith('/api/v1/login', { email: 'test@test.com', password: 'wrongpassword' }, { headers: { "Content-Type": "application/json" } });
        expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'LoginFailure', payload: error.response.data.message });
    });
});
