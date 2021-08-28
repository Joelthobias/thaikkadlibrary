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

router.get('/find-gen-count',async(req,res)=>{
  let gen=req.query.coutn
  let gencount=1001
  let bkcount =1001
  bkcount=await bookHelpers.getbookcount()
  gencount=await bookHelpers.getgencount(gen)
   res.render('books/add-book',{gencount,gen,bkcount})
})

router.post('/add-book',(req,res)=>{
  let data =req.body

  bookHelpers.addbook(data).then((result)=>{
    res.redirect('/view-books')
  })
})
router.get('/view-books',(req,res)=>{
  bookHelpers.viewbooks().then((data)=>{
    console.log(data);
    res.render('books/view-books',{data})
  })
})
router.get('/view-book/:id',(req,res)=>{
  let id=req.params.id
  bookHelpers.viewbook(id).then((result)=>{
    res.render('books/view-book',{result})
  })
})
router.get('/search-book',(req,res)=>{
  res.render('books/searchbook')
})
module.exports = router;
