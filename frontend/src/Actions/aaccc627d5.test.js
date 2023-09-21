const axios = require("axios");
const { registerUser } = require("./User");

jest.mock('axios');

describe("User Registration", () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test("should dispatch RegisterRequest and RegisterSuccess when registration is successful", async () => {
    const mockDispatch = jest.fn();
    const mockUser = { name: "John Doe", email: "john@doe.com", password: "password", avatar: "avatar.jpg" };
    axios.post.mockResolvedValue({ data: { user: mockUser } });

    await registerUser("John Doe", "john@doe.com", "password", "avatar.jpg")(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "RegisterRequest" });
    expect(axios.post).toHaveBeenCalledWith("/api/v1/register", mockUser, { headers: { "Content-Type": "application/json" } });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "RegisterSuccess", payload: mockUser });
  });

  test("should dispatch RegisterRequest and RegisterFailure when registration fails", async () => {
    const mockDispatch = jest.fn();
    const mockError = { response: { data: { message: "Registration failed" } } };
    axios.post.mockRejectedValue(mockError);

    await registerUser("John Doe", "john@doe.com", "password", "avatar.jpg")(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "RegisterRequest" });
    expect(axios.post).toHaveBeenCalledWith("/api/v1/register", { name: "John Doe", email: "john@doe.com", password: "password", avatar: "avatar.jpg" }, { headers: { "Content-Type": "application/json" } });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "RegisterFailure", payload: "Registration failed" });
  });
});
