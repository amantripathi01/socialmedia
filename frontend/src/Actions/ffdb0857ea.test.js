const axios = require("axios");
const { likePost } = require("./Post");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk");
const { Provider } = require("react-redux");

jest.mock("axios");

describe("likePost", () => {
  let store;
  let mockDispatch;

  beforeEach(() => {
    store = createStore(() => ({}), applyMiddleware(thunk));
    mockDispatch = jest.fn();
    axios.get.mockClear();
  });

  const testLikePost = async (mockValue, isError = false, actionType, payload) => {
    isError ? axios.get.mockRejectedValue(mockValue) : axios.get.mockResolvedValue(mockValue);
    await likePost(1)(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "likeRequest" });
    expect(axios.get).toHaveBeenCalledWith("/api/v1/post/1");
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionType,
      payload: payload
    });
  };

  test("Should dispatch likeRequest and likeSuccess when API call is successful", async () => {
    const mockData = { data: { message: "Post liked successfully" } };
    await testLikePost({ data: mockData }, false, "likeSuccess", mockData.message);
  });

  test("Should dispatch likeRequest and likeFailure when API call fails", async () => {
    const mockError = { response: { data: { message: "Error" } } };
    await testLikePost(mockError, true, "likeFailure", mockError.response.data.message);
  });
});
