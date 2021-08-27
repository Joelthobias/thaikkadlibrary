const { response } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs')
const bookHelpers = require('../helpers/book-helpers');
const memberHelpers = require('../helpers/member-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-book',(req,res)=>{        
    res.render('books/select')
})

router.get('/find-gen-count',(req,res)=>{
  let gen=req.query.coutn
  let gencount=1000
  let bkcount =1000
  bkcount=bookHelpers.getbookcount().then(response)
   res.render('books/add-book',{gencount,gen,bkcount})
})

router.post('/add-book',(req,res)=>{
  let data =req.body

  bookHelpers.addbook(data).then((result)=>{
    res.send(data)
  })
})
router.get('/view-books',(req,res)=>{
  bookHelpers.viewbooks().then((result)=>{
    res.render('books/view-book')
  })
})
module.exports = router;
