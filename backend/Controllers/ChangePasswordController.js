const asyncHandler = require('express-async-handler')
const User = require('../Models/User');
const bcrypt = require('bcrypt')

const ChangePasswordBackend = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body
  console.log('Passwords:', currentPassword, newPassword);

  const user = await User.findById(req.user._id)

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) {
    return res.json({ error: 'Current Password is not match' })
  }

  const hashPassword = await bcrypt.hash(newPassword, 12)
  user.password = hashPassword
  await user.save()
  res.json({ success: true, message: 'Password successfully changed' })
})
module.exports = { ChangePasswordBackend }