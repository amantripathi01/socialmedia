const axios = require('axios');
const { getMyPosts } = require('./User');
const { useDispatch } = require('react-redux');
jest.mock('axios');
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('getMyPosts', () => {
  let dispatch;

  beforeAll(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  });

  beforeEach(() => {
    dispatch.mockClear();
  });

  test('dispatches myPostsRequest action', async () => {
    axios.get.mockResolvedValueOnce({ data: {} });

    await getMyPosts()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'myPostsRequest' });
  });

  test('dispatches myPostsSuccess action on success', async () => {
    const posts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
    axios.get.mockResolvedValueOnce({ data: { posts } });

    await getMyPosts()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'myPostsSuccess', payload: posts });
  });

  test('dispatches myPostsFailure action on failure', async () => {
    const error = new Error('Error message');
    axios.get.mockRejectedValueOnce({ response: { data: { message: error.message } } });

    await getMyPosts()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'myPostsFailure', payload: error.message });
  });
});
