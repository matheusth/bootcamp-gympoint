import User from '../models/User';

class UserController {
  async store(req, res) {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res
        .status(400)
        .json({ error: 'A user with this email already exists' });
    }
    user = await User.create({ ...req.body, created_by: req.userId });
    return res.json(user);
  }

  async update(req, res) {
    const user = await User.findByPk(req.userId);
    const { email, oldPassword } = req.body;
    if (email !== user.email) {
      const userExists = User.findOne({ where: { email } });
      if (userExists) {
        return res
          .status(400)
          .json({ error: 'There is another user with this email' });
      }
    }
    if (req.body.password) {
      if (!user.checkPassword(oldPassword)) {
        return res.status(401).json('password does not match');
      }
    }
    await user.update(req.body);
    return res.json(user);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    user.destroy();
    return res.json({ message: 'You just delete your account' });
  }
}
export default new UserController();
