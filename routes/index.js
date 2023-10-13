var express = require('express');
var router = express.Router();
const Place = require('../models/places');

router.post('/places', (req, res) => {
    const { nickname, name, latitude, longitude } = req.body;
    const newPlace = new Place({ nickname, name, latitude, longitude });
   
    newPlace.save().then(() => {
      res.json({ result: true });
    });
   });
   
   router.get('/places/:nickname', (req, res) => {
    const { nickname } = req.params;
    Place.find({ nickname: nickname })
    .then(data => {
        if (data) {
            res.json(data);
        } else {
            res.json({ result: false, error: 'Error for the Marker' });
        }
    });
    })
  
    router.delete('/places', (req, res) => {
        const { nickname, name } = req.body;
       
        Place.deleteOne({ nickname, name }).then((deletedDoc) => {
          if (deletedDoc.deletedCount > 0) {
            res.json({ result: true });
          } else {
            res.json({ result: false, error: 'Place not found' });
          }
        });
       });

module.exports = router;
