// Test generated by RoostGPT for test ExpressJs using AI Type Open AI and AI Model gpt-4

const axios = require('axios');
const { getUserProfile } = require('./User');

jest.mock('axios');

describe('User Profile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should dispatch userProfileSuccess when api call is successful', async () => {
    const dispatch = jest.fn();
    const response = { data: { user: { name: 'John Doe', email: 'john@example.com' } } };

    axios.get.mockResolvedValue(response);

    await getUserProfile('1')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'userProfileRequest' });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'userProfileSuccess', payload: response.data.user });
  });

  test('should dispatch userProfileFailure when api call fails', async () => {
    const dispatch = jest.fn();
    const error = { response: { data: { message: 'User not found' } } };

    axios.get.mockRejectedValue(error);

    await getUserProfile('1')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'userProfileRequest' });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'userProfileFailure', payload: error.response.data.message });
  });
});
