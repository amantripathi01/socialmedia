const axios = require('axios');
const { updateProfile } = require('./User');

jest.mock('axios');

describe('updateProfile', () => {
  beforeEach(() => {
    axios.put.mockClear();
  });

  it('dispatches updateProfileRequest action when called', async () => {
    const dispatch = jest.fn();
    axios.put.mockResolvedValue({ data: { message: 'Success' } });

    await updateProfile('John Doe', 'john@example.com', 'avatar.png')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'updateProfileRequest' });
  });

  it('makes a PUT request to /api/v1/update/profile', async () => {
    const dispatch = jest.fn();
    axios.put.mockResolvedValue({ data: { message: 'Success' } });

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

  it('dispatches updateProfileSuccess action on successful request', async () => {
    const dispatch = jest.fn();
    axios.put.mockResolvedValue({ data: { message: 'Success' } });

    await updateProfile('John Doe', 'john@example.com', 'avatar.png')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'updateProfileSuccess', payload: 'Success' });
  });

  it('dispatches updateProfileFailure action on failed request', async () => {
    const dispatch = jest.fn();
    axios.put.mockRejectedValue({ response: { data: { message: 'Error' } } });

    await updateProfile('John Doe', 'john@example.com', 'avatar.png')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'updateProfileFailure', payload: 'Error' });
  });
});
