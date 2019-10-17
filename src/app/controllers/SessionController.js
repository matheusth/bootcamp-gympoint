import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    return res.json({
      user,
      token: jwt.sign(
        { id: user.id },
        '71850e7e4dcd551e9a0f87e5d4a8b6efe9fb05e5',
        { expiresIn: '7d' }
      ),
    });
  }
}
export default new SessionController();
