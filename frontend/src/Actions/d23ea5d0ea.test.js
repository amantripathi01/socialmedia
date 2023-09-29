const axios = require('axios');
const { getFollowingPosts } = require('./User');

jest.mock('axios');

describe('getFollowingPosts', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  test('should dispatch postOfFollowingRequest action', async () => {
    const dispatch = jest.fn();
    await getFollowingPosts()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'postOfFollowingRequest' });
  });

  test('should dispatch postOfFollowingSuccess action when API call is successful', async () => {
    const dispatch = jest.fn();
    const posts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
    axios.get.mockResolvedValue({ data: { posts } });
    await getFollowingPosts()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'postOfFollowingSuccess', payload: posts });
  });

  test('should dispatch postOfFollowingFailure action when API call fails', async () => {
    const dispatch = jest.fn();
    const errorMessage = 'Error message';
    axios.get.mockRejectedValue({ response: { data: { message: errorMessage } } });
    await getFollowingPosts()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'postOfFollowingFailure', payload: errorMessage });
  });
});
