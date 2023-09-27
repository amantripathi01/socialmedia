const axios = require('axios');
const { resetPassword } = require('./User');

jest.mock('axios');

describe('resetPassword', () => {
  let token, password, dispatch;

  beforeEach(() => {
    token = 'testToken';
    password = 'testPassword';
    dispatch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should dispatch resetPasswordRequest action', async () => {
    axios.put.mockResolvedValue({ data: {} });

    await resetPassword(token, password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'resetPasswordRequest' });
  });

  it('should dispatch resetPasswordSuccess action when request is successful', async () => {
    const message = 'Password reset successful';
    axios.put.mockResolvedValue({ data: { message } });

    await resetPassword(token, password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'resetPasswordSuccess', payload: message });
  });

  it('should dispatch resetPasswordFailure action when request fails', async () => {
    const message = 'Password reset failed';
    axios.put.mockRejectedValue({ response: { data: { message } } });

    await resetPassword(token, password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'resetPasswordFailure', payload: message });
  });
});
