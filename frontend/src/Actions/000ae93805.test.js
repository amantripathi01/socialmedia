const axios = require("axios");
const { updatePassword } = require('./User.js');

jest.mock('axios');

describe('updatePassword', () => {
  beforeEach(() => {
    axios.put.mockClear();
  });

  it('should dispatch updatePasswordRequest and updatePasswordSuccess when the request is successful', async () => {
    const dispatch = jest.fn();
    const oldPassword = 'oldPassword';
    const newPassword = 'newPassword';
    const response = { data: { message: 'Password updated successfully' } };

    axios.put.mockResolvedValue(response);

    await updatePassword(oldPassword, newPassword)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'updatePasswordRequest' });
    expect(axios.put).toHaveBeenCalledWith('/api/v1/update/password', { oldPassword, newPassword }, { headers: { 'Content-Type': 'application/json' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'updatePasswordSuccess', payload: response.data.message });
  });

  it('should dispatch updatePasswordRequest and updatePasswordFailure when the request fails', async () => {
    const dispatch = jest.fn();
    const oldPassword = 'oldPassword';
    const newPassword = 'newPassword';
    const error = { response: { data: { message: 'Error updating password' } } };

    axios.put.mockRejectedValue(error);

    await updatePassword(oldPassword, newPassword)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'updatePasswordRequest' });
    expect(axios.put).toHaveBeenCalledWith('/api/v1/update/password', { oldPassword, newPassword }, { headers: { 'Content-Type': 'application/json' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'updatePasswordFailure', payload: error.response.data.message });
  });
});
