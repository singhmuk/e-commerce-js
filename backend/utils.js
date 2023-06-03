import jwt from "jsonwebtoken";

export const generateToke = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "abc123",
    { expiresIn: "1d" }
  );
};
