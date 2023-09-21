const axios = require('axios');
const { forgotPassword } = require('./User');

jest.mock('axios');

describe('forgotPassword', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  test('should dispatch forgotPasswordRequest action', async () => {
    axios.post.mockResolvedValue({});
    await forgotPassword('test@example.com')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'forgotPasswordRequest' });
  });

  test('should dispatch forgotPasswordSuccess action on successful API call', async () => {
    const response = { data: { message: 'Success' }};
    axios.post.mockResolvedValue(response);
    await forgotPassword('test@example.com')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'forgotPasswordSuccess', payload: 'Success' });
  });

  test('should dispatch forgotPasswordFailure action on failed API call', async () => {
    const error = { response: { data: { message: 'Failure' }}};
    axios.post.mockRejectedValue(error);
    await forgotPassword('test@example.com')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'forgotPasswordFailure', payload: 'Failure' });
  });
});
