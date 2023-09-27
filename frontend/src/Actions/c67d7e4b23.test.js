const axios = require("axios");
const { loginUser } = require("./User");
jest.mock("axios");

describe("User Login", () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test("should dispatch LoginRequest and LoginSuccess on successful login", async () => {
    const dispatch = jest.fn();
    const response = {
      data: {
        user: {
          id: 1,
          email: "test@example.com",
          password: "password"
        }
      }
    };
    axios.post.mockResolvedValue(response);

    await loginUser("test@example.com", "password")(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "LoginRequest" });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: "LoginSuccess", payload: response.data.user });
    expect(axios.post).toHaveBeenCalledWith("/api/v1/login", { email: "test@example.com", password: "password" }, { headers: { "Content-Type": "application/json" } });
  });

  test("should dispatch LoginRequest and LoginFailure on failed login", async () => {
    const dispatch = jest.fn();
    const error = {
      response: {
        data: {
          message: "Invalid email or password"
        }
      }
    };
    axios.post.mockRejectedValue(error);

    await loginUser("test@example.com", "wrongpassword")(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "LoginRequest" });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: "LoginFailure", payload: error.response.data.message });
    expect(axios.post).toHaveBeenCalledWith("/api/v1/login", { email: "test@example.com", password: "wrongpassword" }, { headers: { "Content-Type": "application/json" } });
  });
});
