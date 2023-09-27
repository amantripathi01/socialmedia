// Test generated by RoostGPT for test SocialMediaTest using AI Type Open AI and AI Model gpt-4

const axios = require('axios');
const { getFollowingPosts } = require('./User');
const { act } = require('react-dom/test-utils');

jest.mock('axios');

describe('getFollowingPosts', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  test('dispatches postOfFollowingRequest and postOfFollowingSuccess on successful axios request', async () => {
    const dispatch = jest.fn();
    const mockData = {
      data: {
        posts: ['post1', 'post2'],
      },
    };
    axios.get.mockResolvedValue(mockData);

    await act(async () => {
      await getFollowingPosts()(dispatch);
    });

    expect(dispatch).toHaveBeenCalledWith({ type: 'postOfFollowingRequest' });
    expect(axios.get).toHaveBeenCalledWith('/api/v1/posts');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'postOfFollowingSuccess',
      payload: mockData.data.posts,
    });
  });

  test('dispatches postOfFollowingRequest and postOfFollowingFailure on failed axios request', async () => {
    const dispatch = jest.fn();
    const mockError = {
      response: {
        data: {
          message: 'Error message',
        },
      },
    };
    axios.get.mockRejectedValue(mockError);

    await act(async () => {
      await getFollowingPosts()(dispatch);
    });

    expect(dispatch).toHaveBeenCalledWith({ type: 'postOfFollowingRequest' });
    expect(axios.get).toHaveBeenCalledWith('/api/v1/posts');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'postOfFollowingFailure',
      payload: mockError.response.data.message,
    });
  });
});
