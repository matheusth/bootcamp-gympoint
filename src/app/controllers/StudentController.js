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
    return res.json(student);
  }
}

export default new StudentController();
