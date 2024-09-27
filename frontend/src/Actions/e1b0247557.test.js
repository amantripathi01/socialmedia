const axios = require('axios');
const { updatePost } = require('./Post');

jest.mock('axios');

describe('updatePost', () => {
  beforeEach(() => {
    axios.put.mockClear();
  });

  test('should dispatch updateCaptionRequest and updateCaptionSuccess on successful update', async () => {
    const dispatch = jest.fn();
    const response = { data: { message: 'Update successful' } };

    axios.put.mockResolvedValue(response);

    await updatePost('New caption', '123')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'updateCaptionRequest' });
    expect(axios.put).toHaveBeenNthCalledWith(1, '/api/v1/post/123', { caption: 'New caption' }, { headers: { "Content-Type": "application/json" } });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'updateCaptionSuccess', payload: 'Update successful' });
  });

  test('should dispatch updateCaptionRequest and updateCaptionFailure on failure', async () => {
    const dispatch = jest.fn();
    const error = { response: { data: { message: 'Update failed' } } };

    axios.put.mockRejectedValue(error);

    await updatePost('New caption', '123')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'updateCaptionRequest' });
    expect(axios.put).toHaveBeenNthCalledWith(1, '/api/v1/post/123', { caption: 'New caption' }, { headers: { "Content-Type": "application/json" } });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'updateCaptionFailure', payload: 'Update failed' });
  });
});
