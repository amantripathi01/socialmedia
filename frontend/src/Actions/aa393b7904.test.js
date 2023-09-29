const axios = require('axios');
const { deleteMyProfile } = require('./User');

jest.mock('axios');

describe("deleteMyProfile", () => {
  beforeEach(() => {
    axios.delete.mockClear();
  });

  test("should dispatch deleteProfileRequest action", async () => {
    const dispatch = jest.fn();

    await deleteMyProfile()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "deleteProfileRequest"
    });
  });

  test("should call axios delete method", async () => {
    const dispatch = jest.fn();

    await deleteMyProfile()(dispatch);

    expect(axios.delete).toHaveBeenCalledWith("/api/v1/delete/me");
  });

  test("should dispatch deleteProfileSuccess action if request is successful", async () => {
    const dispatch = jest.fn();
    const message = "Profile deleted successfully";

    axios.delete.mockResolvedValueOnce({
      data: { message }
    });

    await deleteMyProfile()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "deleteProfileSuccess",
      payload: message
    });
  });

  test("should dispatch deleteProfileFailure action if request fails", async () => {
    const dispatch = jest.fn();
    const message = "Error deleting profile";

    axios.delete.mockRejectedValueOnce({
      response: { data: { message } }
    });

    await deleteMyProfile()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "deleteProfileFailure",
      payload: message
    });
  });
});
