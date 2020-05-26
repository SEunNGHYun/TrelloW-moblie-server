const crypto = require('crypto');
const { user } = require('../models/index');
const { makeToken, verify } = require('../createModules/jwt');
// models에서 불러오기

user.sync();
module.exports = {
  usercheck: (req, res, next) => {
    const id = verify(req.headers.authorization).id;
    return user.findOne({
      where: { id }
    })
      .then(data => {
        if(data.dataValues) {
          return next();
        }
      })
      .catch(err => {
        if(err) {
          res.status(400);
          return res.json({ check: false });
        }
      });
  },
  check: (req, res) => {
    if(req.headers.authorization) {
      res.status(200);
      return res.json({ check: true });
    }else{
      res.status(203);
      return res.json({ check: false });
    }
  },  
  userInfo: (req, res) => {
    const id = verify(req.headers.authorization).id;
    user.findOne({
      where: { id }
    })
      .then(result => {
        res.status(200);
        const { email, name } = result.dataValues; 
        console.log('sdd', email, name);
        res.status(200);
        return res.json({
          userInfo: {
            email,
            name
          }
        });
      })
      .catch(err => {
        if(err) {
          res.status(400);
          return res.json({ userIfo: false });
        }
      });
  },
  signup: (req, res) => {
    let { email, password, name } = req.body.data;
    password = crypto.createHash('sha512').update(password).digest('base64');
    console.log('password', password);  
    return user.findOrCreate({
      where: { email: email },
      defaults: { email, password, name }
    })
      .spread((memo, created) => {
        console.log('memo', req.body.data);
        if (created) {
          res.status(201);
          return res.json({ signup: true });
        } else{
          res.status(400);
          return res.json({ err: '이미 존재하는 회원입니다.' });
        }
      })
      .catch(err => {
        if(err) {
          res.status(400);
          return res.json({ signup: false });
        }
      });
  },
  login: (req, res) => {
    let { email, password } = req.body;
    password = crypto.createHash('sha512').update(password).digest('base64');
    user.findOne({ where: { email } })
      .then(result => {
        result = result.dataValues;
        if (result.password === password) {
          const token = makeToken(result);
          return res.status(201).json({ token: token });
        }else{
          res.status(500);
          res.json({ sign: false });
        }
      })
      .catch(err => {
        console.log('ERR', err);
        res.sendStatus(500);
      });
  },
  edit: (req, res) => {
    let { password, name } = req.body;
    const id = verify(req.headers.authorization).id;
    password = crypto.createHash('sha512').update(password).digest('base64'); 
    user.update(
      { password, name },
      { where: { id } }
    )
      .then(result => {
        console.log(result);
        res.status(200);
        return res.json({ edit: true });
      })
      .catch(err => {
        if(err) {
          res.status(400);
          return res.json({ edit: false });
        }
      });
  },
  delete: (req, res) => {
    const id = verify(req.headers.authorization).id;
    user.destroy({
      where: {
        id
      }
    }).then(data => {
      if(res) {
        res.status(200);
        return res.json({ delete: true });
      }else{
        res.status(400);
        return res.json({
          delete: false
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(400);
      return res.json({
        delete: false
      });
    });
  }
};