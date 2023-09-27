const axios = require('axios');
const { forgotPassword } = require('./User');

jest.mock('axios');

describe('forgotPassword', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('should dispatch forgotPasswordRequest', async () => {
    const dispatch = jest.fn();
    const email = 'test@example.com';

    await forgotPassword(email)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'forgotPasswordRequest'
    });
  });

  test('should call axios.post with correct parameters', async () => {
    const dispatch = jest.fn();
    const email = 'test@example.com';

    await forgotPassword(email)(dispatch);

    expect(axios.post).toHaveBeenCalledWith('/api/v1/forgot/password', { email }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  test('should dispatch forgotPasswordSuccess when axios.post resolves', async () => {
    const dispatch = jest.fn();
    const email = 'test@example.com';
    const message = 'Password reset link has been sent to your email.';
    axios.post.mockResolvedValueOnce({ data: { message } });

    await forgotPassword(email)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'forgotPasswordSuccess',
      payload: message
    });
  });

  test('should dispatch forgotPasswordFailure when axios.post rejects', async () => {
    const dispatch = jest.fn();
    const email = 'test@example.com';
    const message = 'User not found.';
    axios.post.mockRejectedValueOnce({ response: { data: { message } } });

    await forgotPassword(email)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'forgotPasswordFailure',
      payload: message
    });
  });
});
