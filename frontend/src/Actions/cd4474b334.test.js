// Importing required modules
const axios = require('axios');
const User = require('./User');

// Mocking axios module
jest.mock('axios');

// Test suite for User
describe('User', () => {
  // Test suite for logoutUser
  describe('logoutUser', () => {
    // Clearing the axios.get mock before each test
    beforeEach(() => {
      axios.get.mockClear();
    });

    // Test for successful logout
    it('should dispatch LogoutUserRequest and LogoutUserSuccess on successful logout', async () => {
      // Mocking axios.get to resolve to an empty object
      axios.get.mockResolvedValue({});

      // Mocking dispatch function
      const dispatch = jest.fn();

      // Calling logoutUser
      await User.logoutUser()(dispatch);

      // Expectations
      expect(dispatch).toHaveBeenCalledWith({ type: 'LogoutUserRequest' });
      expect(axios.get).toHaveBeenCalledWith('/api/v1/logout');
      expect(dispatch).toHaveBeenCalledWith({ type: 'LogoutUserSuccess' });
    });

    // Test for failed logout
    it('should dispatch LogoutUserRequest and LogoutUserFailure on failed logout', async () => {
      // Creating error object
      const error = new Error('Logout failed');
      error.response = { data: { message: 'Logout failed' } };

      // Mocking axios.get to reject with error
      axios.get.mockRejectedValue(error);

      // Mocking dispatch function
      const dispatch = jest.fn();

      // Calling logoutUser
      await User.logoutUser()(dispatch);

      // Expectations
      expect(dispatch).toHaveBeenCalledWith({ type: 'LogoutUserRequest' });
      expect(axios.get).toHaveBeenCalledWith('/api/v1/logout');
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LogoutUserFailure',
        payload: 'Logout failed',
      });
    });
  });
});
