const axios = require('axios');
const { loadUser } = require('./User');

jest.mock('axios');

describe('loadUser', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  test('should dispatch LoadUserRequest and LoadUserSuccess actions when the request is successful', async () => {
    const dispatch = jest.fn();
    const data = { user: { name: 'John Doe', email: 'john.doe@example.com' } };
    axios.get.mockResolvedValueOnce({ data });

    await loadUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'LoadUserRequest' });
    expect(axios.get).toHaveBeenCalledWith('/api/v1/me');
    expect(dispatch).toHaveBeenCalledWith({ type: 'LoadUserSuccess', payload: data.user });
  });

  test('should dispatch LoadUserRequest and LoadUserFailure actions when the request fails', async () => {
    const dispatch = jest.fn();
    const error = { response: { data: { message: 'Request failed' } } };
    axios.get.mockRejectedValueOnce(error);

    await loadUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'LoadUserRequest' });
    expect(axios.get).toHaveBeenCalledWith('/api/v1/me');
    expect(dispatch).toHaveBeenCalledWith({ type: 'LoadUserFailure', payload: error.response.data.message });
  });
});
