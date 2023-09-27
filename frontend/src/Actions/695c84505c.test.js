// Test generated by RoostGPT for test SocialMediaTest using AI Type Open AI and AI Model gpt-4

const axios = require('axios');
const { getMyPosts } = require('./User');

jest.mock('axios');

describe('getMyPosts', () => {
  it('dispatches myPostsRequest and myPostsSuccess actions if the fetch response was successful', async () => {
    const dispatch = jest.fn();
    const response = { data: { posts: ['post1', 'post2'] } };

    axios.get.mockResolvedValue(response);

    await getMyPosts()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'myPostsRequest' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'myPostsSuccess', payload: ['post1', 'post2'] });
  });

  it('dispatches myPostsRequest and myPostsFailure actions if the fetch response fails', async () => {
    const dispatch = jest.fn();
    const error = { response: { data: { message: 'Error message' } } };

    axios.get.mockRejectedValue(error);

    await getMyPosts()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'myPostsRequest' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'myPostsFailure', payload: 'Error message' });
  });
});
