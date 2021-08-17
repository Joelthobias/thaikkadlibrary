var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-book',(req,res)=>{
  // bookHelpers.getbookcount().then((count) => {
    // let counts = count + 1001    
    // res.render('add-book',{counts})
    res.render('books/add-book')
  // })
})


module.exports = router;
