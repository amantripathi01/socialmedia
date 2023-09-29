const axios = require('axios');
const { updateProfile } = require('./User');
jest.mock('axios');

describe('updateProfile', () => {
  beforeAll(() => {
    axios.put.mockImplementation((url, body, headers) => {
      if (url === "/api/v1/update/profile") {
        return Promise.resolve({ data: { message: 'Profile updated successfully' } });
      }
      return Promise.reject({ response: { data: { message: 'Error updating profile' } } });
    });
  });

  test('should dispatch updateProfileRequest action', async () => {
    const dispatch = jest.fn();
    await updateProfile('John Doe', 'john.doe@example.com', 'avatar.png')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'updateProfileRequest' });
  });

  test('should call axios with correct parameters', async () => {
    const dispatch = jest.fn();
    await updateProfile('John Doe', 'john.doe@example.com', 'avatar.png')(dispatch);
    expect(axios.put).toHaveBeenCalledWith('/api/v1/update/profile', {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'avatar.png'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  test('should dispatch updateProfileSuccess action on successful update', async () => {
    const dispatch = jest.fn();
    await updateProfile('John Doe', 'john.doe@example.com', 'avatar.png')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'updateProfileSuccess', payload: 'Profile updated successfully' });
  });

  test('should dispatch updateProfileFailure action on failure', async () => {
    const dispatch = jest.fn();
    axios.put.mockImplementationOnce(() => Promise.reject({ response: { data: { message: 'Error updating profile' } } }));
    await updateProfile('John Doe', 'john.doe@example.com', 'avatar.png')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'updateProfileFailure', payload: 'Error updating profile' });
  });
});
