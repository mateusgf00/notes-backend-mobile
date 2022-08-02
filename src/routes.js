const {Router} = require('express');

const noteController = require('./app/controllers/noteController');

const router = Router();

router.get('/notes', noteController.show);
router.get('/notes/:id', noteController.showOne);
router.post('/notes', noteController.create);
router.put('/notes/:id', noteController.update);
router.delete('/notes/:id', noteController.delete);

module.exports = router;