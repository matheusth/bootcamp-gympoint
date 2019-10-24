import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    let student = await Student.findOne({ where: { email: req.body.email } });
    if (student) {
      return res
        .status(400)
        .json({ error: 'A student with this email already exists' });
    }
    student = await Student.create({ ...req.body, created_by: req.userId });
    return res.json(student);
  }

  async update(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'User not found!' });
    }
    if (student.created_by !== req.userId && req.userId !== 1) {
      return res
        .status(401)
        .json({ error: 'You are not allowed to edit this user' });
    }
    await student.update(req.body);
    return res.json(student);
  }
}

export default new StudentController();
