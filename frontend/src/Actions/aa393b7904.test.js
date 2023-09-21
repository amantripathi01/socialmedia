const axios = require("axios");
const { deleteMyProfile } = require("./User");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk");

jest.mock('axios');

describe("deleteMyProfile", () => {
  let store;
  let mockDispatch;

  beforeEach(() => {
    const initialState = {};
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case "deleteProfileRequest":
        case "deleteProfileSuccess":
        case "deleteProfileFailure":
          return { ...state, message: action.payload };
        default:
          return state;
      }
    };
    store = createStore(reducer, applyMiddleware(thunk));
    mockDispatch = jest.fn();
  });

  it("should dispatch deleteProfileRequest and deleteProfileSuccess on successful delete", async () => {
    const mockData = { message: "Profile deleted successfully" };
    axios.delete.mockResolvedValue({ data: mockData });

    await store.dispatch(deleteMyProfile());

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "deleteProfileRequest" });
    expect(actions[1]).toEqual({ type: "deleteProfileSuccess", payload: mockData.message });
  });

  it("should dispatch deleteProfileRequest and deleteProfileFailure on failed delete", async () => {
    const mockError = { response: { data: { message: "Failed to delete profile" } } };
    axios.delete.mockRejectedValue(mockError);

    await store.dispatch(deleteMyProfile());

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "deleteProfileRequest" });
    expect(actions[1]).toEqual({ type: "deleteProfileFailure", payload: mockError.response.data.message });
  });
});
