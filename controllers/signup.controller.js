class Signup {
  get(req, res) {
    return res.json("xin chao");
  }
  post(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    return res.json({ email: email, username: username, password: password });
  }
}

module.exports = new Signup();
