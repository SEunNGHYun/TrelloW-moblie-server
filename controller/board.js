const { board } = require('../models/index');
const { verify } = require('../createModules/jwt');

board.sync();

module.exports = {
  create: (req, res) => {
    const { title , visibility } = req.body;
    const id = verify(req.headers.authorization).id;   
    board.create({
      title,
      visibility,
      userId: id
    })
      .then(data => {
        if(data.dataValues) {
          res.status(200);
          return res.json(data.dataValues);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400);
        return res.json({ create: false });
      });
  },
  delete: (req, res) => {
    const boardId = req.params.id;
    console.log('id', boardId);
    board.destroy({
      where: {
        id: boardId
      }
    }).then(data => {
      res.status(204);
      return res.json({ delete: true });
    }).catch(err => {
      console.log('deleteERR', err);
      res.status(400);
      return res.json({ delete: false });
    });
  },
  edit: async (req, res) => {
    const boardId = req.params.id;
    const { title } = req.body;
    board.update(title, {
      where: { id: boardId }
    })
      .then(data => {
        res.status(204);
        return res.json({ edit: true });
      })
      .catch(err => {
        console.log('update', err);
        res.status(400);
        return res.json({
          edit: false
        });
      });
  },
  list: (req, res) => {
    const id = verify(req.headers.authorization).id;      
    board.findAll({
      where: { userId: id },
      attributes: ['id', 'title']
    }).then(data => {
      const result = [];
      if(data.length > 0) {
        for(let i = 0; i < data.length; i++) {
          result.push(data[i].dataValues);
        }
        res.status(201);
        return res.json({ list: result });
      }
      res.status(200);
      return res.json({ list: result });
    })
      .catch(err => {
        console.log(err);
        res.status(400);
        return res.json({ list: false });
      });
  } 
};