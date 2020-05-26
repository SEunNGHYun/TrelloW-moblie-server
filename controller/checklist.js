const { checklist } = require('../models/index');

checklist.sync();

module.exports = {
    list: (req, res) => {
        const cardId = req.query.card_id;
        checklist.findAll({
            cardId: cardId
        })
        .then((data)=> {
            console.log("data",data)})
        .catch(err => res.sendStatus(500))
    },
    create: (req, res) => {
      const cardId = req.query.card_id;
      let { title, contents, ranking } = req.body;
      ranking = Number(ranking);
      card.create({
        title,
        contents,
        ranking,
        containerId
      })
        .then(data => {
          console.log('>>', data.dataValues);
          if(data.dataValues) {
            res.status(201);
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
      const id = req.query.card_id;
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
      const id = req.query.card_id;
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
    }
  };