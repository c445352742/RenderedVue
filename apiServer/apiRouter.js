const router = require('express').Router();
module.exports = function (db) {

  // 登录
  router.post('/login', function (req, res, next) {
    let pwdC = false;
    let nameC = false;
    user = db.get({cmd:'login'});
    for (let i in user) {
      if (user[i].name === req.body.name) {
        nameC = true;
        if (user[i].pwd === req.body.pwd) {
          pwdC = true
        }
        break;// 登录成功，
      }
    }
    if (nameC && pwdC) {
      req.session.userName = req.body.name;// 设置 session
      res.send({ status: 'success', data: { msg: 'login done!' } })
    } else if (nameC) {
      res.send({ status: 'error', errCode: 'pwdErr', data: { msg: 'wrong password' } })
    } else {
      res.send({ status: 'error', errCode: 'noAcc', data: { msg: 'no such user' } })
    }
  })

  // 注册
  router.post('/register', function (req, res, next) {
    let o = {
      status: 'success', data: { msg: 'register done!' }
    };
    db.create({
      name: req.body.name,
      pwd: req.body.pwd
    }, (msg) => { //error callback
      o.status = 'failed';
      o.data.msg = msg
    })
    res.send(o)
  })

  // 刷新个人信息
  router.post('/refreshAll', function (req, res, next) {
    let o = {
      status: 'success', data: { msg: 'get personal info done!' }
    };
    o.data.package = db.get({cmd:'package'});
    o.data.property = db.get({cmd:'property'});
    res.send(o)
  })
  return router;
};