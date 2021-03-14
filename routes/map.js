const router = require('express').Router();


router.route('/')
.get( (req, res) => {
  res.text('ok');
});

module.exports = router;
