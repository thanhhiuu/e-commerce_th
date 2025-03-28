import User from '../models/user.js';

import asyncHandler from 'express-async-handler';

const register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      message: false,
      error: 'Not create user',
    });
  }
  const createdUser = await User.create(req.body);

  return res.status(200).json({
    message: true,
    data: createdUser,
  });
});

export { register };
