const { container } = require('../models/index');

container.sync();
module.exports = {
  get: (req, res) => {
    const boardId = req.params.board_id;
    console.log('boardId',boardId )
    return container.findAll({
      where: { boardId }
    })
      .then(data => {
        const result = [];
        if(data.length > 0) {
          for(let i = 0; i < data.length; i++) {
            result.push(data[i].dataValues);
          }
          res.status(200);
          return res.json({ list: {result} });
        }else{
          res.status(204);
          return res.json({ result });
        }
      })
      .catch(err => {
        console.log('err', err);
        res.status(400);
        return res.json({ gatBoard: false });
      });
  },
  create: (req, res) => {
    const boardId = req.params.board_id;
    console.log("boardID", boardId);
    const { title } = req.body;
    container.create({
      title,
      boardId
    })
      .then(data => {
        console.log('>>', data.dataValues);
        if(data.dataValues) {
          res.status(201);
          return res.json({ create: data.dataValues });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400);
        return res.json({ create: false });
      });
  },
  delete: (req, res) => {
    const id = req.params.container_id;
    console.log('id', id);
    container.destroy({
      where: {
        id
      }
    }).then(data => {
      console.log('data', data);
      res.status(204);
      return res.json({ delete: true });
    }).catch(err => {
      console.log('deleteERR', err);
      res.status(400);
      return res.json({ delete: false });
    });
  },
  edit: async (req, res) => {
    const id = req.params.container_id;
    const { title } = req.body;
    container.update(title, {
      where: { id }
    })
      .then(data => {
        res.status(204);
        console.log('data', data);
        return res.json({ edit: true });
      })
      .catch(err => {
        console.log('update', err);
        res.status(400);
        return res.json({
          edit: false
        });
      });
  }
};