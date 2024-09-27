const axios = require('axios');
const { likePost } = require('./Post');

jest.mock('axios');

describe('likePost', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  test('should dispatch likeRequest and likeSuccess on successful API call', async () => {
    const dispatch = jest.fn();
    const mockData = { data: { message: 'Post liked successfully' } };

    axios.get.mockResolvedValue(mockData);

    await likePost('123')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'likeRequest' });
    expect(axios.get).toHaveBeenCalledWith('/api/v1/post/123');
    expect(dispatch).toHaveBeenCalledWith({ type: 'likeSuccess', payload: mockData.data.message });
  });

  test('should dispatch likeRequest and likeFailure on failed API call', async () => {
    const dispatch = jest.fn();
    const mockError = { response: { data: { message: 'Error liking post' } } };

    axios.get.mockRejectedValue(mockError);

    await likePost('123')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'likeRequest' });
    expect(axios.get).toHaveBeenCalledWith('/api/v1/post/123');
    expect(dispatch).toHaveBeenCalledWith({ type: 'likeFailure', payload: mockError.response.data.message });
  });
});
