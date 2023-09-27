const axios = require('axios');
const { updateProfile } = require('./User');

jest.mock('axios');

describe('updateProfile', () => {
  beforeAll(() => {
    axios.put.mockClear();
  });

  test('should dispatch updateProfileRequest action', async () => {
    const dispatch = jest.fn();
    await updateProfile('John Doe', 'john@example.com', 'avatar.png')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'updateProfileRequest' });
  });

  test('should make a PUT request to /api/v1/update/profile', async () => {
    const dispatch = jest.fn();
    await updateProfile('John Doe', 'john@example.com', 'avatar.png')(dispatch);
    expect(axios.put).toHaveBeenCalledWith('/api/v1/update/profile', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'avatar.png'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  test('should dispatch updateProfileSuccess action on successful request', async () => {
    const dispatch = jest.fn();
    axios.put.mockResolvedValue({ data: { message: 'Profile updated successfully' } });
    await updateProfile('John Doe', 'john@example.com', 'avatar.png')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'updateProfileSuccess', payload: 'Profile updated successfully' });
  });

  test('should dispatch updateProfileFailure action on failed request', async () => {
    const dispatch = jest.fn();
    axios.put.mockRejectedValue({ response: { data: { message: 'Update failed' } } });
    await updateProfile('John Doe', 'john@example.com', 'avatar.png')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'updateProfileFailure', payload: 'Update failed' });
  });
});
