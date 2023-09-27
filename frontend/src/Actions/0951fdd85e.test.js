// Test generated by RoostGPT for test SocialMediaTest using AI Type Open AI and AI Model gpt-4

const axios = require("axios");
const { getUserProfile } = require("./User");
const { store } = require('./store'); // Assuming you have a Redux store setup

jest.mock('axios');

describe('getUserProfile', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  it('dispatches userProfileRequest action when called', async () => {
    const mockId = '1';
    await getUserProfile(mockId)(store.dispatch);
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'userProfileRequest' });
  });

  it('dispatches userProfileSuccess action when request is successful', async () => {
    const mockId = '1';
    const mockUser = { id: '1', name: 'John Doe' };
    axios.get.mockResolvedValueOnce({ data: { user: mockUser } });
    await getUserProfile(mockId)(store.dispatch);
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'userProfileSuccess', payload: mockUser });
  });

  it('dispatches userProfileFailure action when request fails', async () => {
    const mockId = '1';
    const mockError = new Error('Request failed');
    axios.get.mockRejectedValueOnce({ response: { data: { message: mockError.message } } });
    await getUserProfile(mockId)(store.dispatch);
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'userProfileFailure', payload: mockError.message });
  });
});
