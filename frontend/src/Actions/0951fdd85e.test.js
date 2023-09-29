const axios = require('axios');
const { getUserProfile } = require('./User');

jest.mock('axios');

describe('getUserProfile', () => {
  const id = '123';
  const user = { id: '123', name: 'John Doe'};
  const error = { response: { data: { message: 'Not Found' } } };

  afterEach(() => {
    axios.get.mockReset();
  });

  test('fetches successfully data from an API', async () => {
    axios.get.mockResolvedValue({ data: { user } });

    const dispatch = jest.fn();

    await getUserProfile(id)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'userProfileRequest' });
    expect(axios.get).toHaveBeenCalledWith(`/api/v1/user/${id}`);
    expect(dispatch).toHaveBeenCalledWith({ type: 'userProfileSuccess', payload: user });
  });

  test('fetches erroneously data from an API', async () => {
    axios.get.mockRejectedValue(error);

    const dispatch = jest.fn();

    await getUserProfile(id)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'userProfileRequest' });
    expect(axios.get).toHaveBeenCalledWith(`/api/v1/user/${id}`);
    expect(dispatch).toHaveBeenCalledWith({ type: 'userProfileFailure', payload: error.response.data.message });
  });
});
