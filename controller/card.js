const { card } = require('../models/index');

card.sync();
module.exports = {
  get: (req, res) => {
    const containerId = req.params.container_id;
    return card.findAll({
      where: { containerId }
    })
      .then(data => {
        const result = [];
        if(data.length > 0) {
          res.status(200);
          for(let i = 0; i < data.length; i++) {
            result.push(data[i].dataValues);
          }
          return res.json({ result });
        }else{
          res.status(201);
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
    const containerId = req.params.container_id;
    let { title, contents } = req.body;
    console.log("title", title,"contents",contents);
    card.create({
      title,
      contents,
      containerId
    })
      .then(data => {
        console.log("Data", data.dataValues)
        if(data.dataValues) {
          res.status(200);
          return res.json({ result: data.dataValues });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400);
        return res.json({ create: false });
      });
  },
  delete: (req, res) => {
    const id = req.params.card_id;
    console.log('id', id);
    card.destroy({
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
  edit: (req, res) => {
    const id = req.params.card_id;
    let { title, contents, ranking } = req.body;
    ranking = Number(ranking);
    card.update({
      title,
      contents,
      ranking
    }, {
      where: { id }
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
    const containerId = req.params.container_id;
    card.findAll({ 
      where: {
      containerId 
    }}).then(data => {
      let CardList = data.map(obj => obj.dataValues)
      res.status(201);
      return res.json({ CardList:CardList });
    }).catch(err => {
      console.log('deleteERR', err);
      res.status(400);
      return res.json({ delete: false });
    });
  }
};