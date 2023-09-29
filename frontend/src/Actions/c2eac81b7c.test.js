const axios = require('axios');
const { forgotPassword } = require('./User');

jest.mock('axios');

describe('forgotPassword', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('dispatches forgotPasswordRequest and forgotPasswordSuccess on successful API call', async () => {
    const email = 'test@example.com';
    const message = 'Password reset email sent';
    axios.post.mockResolvedValueOnce({ data: { message } });

    await forgotPassword(email)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'forgotPasswordRequest' });
    expect(axios.post).toHaveBeenCalledWith('/api/v1/forgot/password', { email }, { headers: { 'Content-Type': 'application/json' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'forgotPasswordSuccess', payload: message });
  });

  it('dispatches forgotPasswordRequest and forgotPasswordFailure on failed API call', async () => {
    const email = 'test@example.com';
    const message = 'User not found';
    axios.post.mockRejectedValueOnce({ response: { data: { message } } });

    await forgotPassword(email)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'forgotPasswordRequest' });
    expect(axios.post).toHaveBeenCalledWith('/api/v1/forgot/password', { email }, { headers: { 'Content-Type': 'application/json' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'forgotPasswordFailure', payload: message });
  });
});
