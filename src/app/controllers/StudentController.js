import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    let student = await Student.findOne({ where: { email: req.body.email } });
    if (student) {
      return res
        .status(400)
        .json({ error: 'A student with this email already exists' });
    }
    student = await Student.create(req.body);
    return res.json({ student });
  }

  async update(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'User not found!' });
    }
    await student.update(req.body);
    return res.json(student);
  }

  async getAll(req, res) {
    const students = await Student.findAll();
    return res.json({ students });
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(401).json({ error: 'Student does not exists!' });
    }
    await student.destroy();
    return res.json({ message: 'Student has been deleted' });
  }
}

export default new StudentController();
