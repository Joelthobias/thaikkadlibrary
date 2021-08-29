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

// ROUTS RELATED TO BOOKS
/*----------------------------------------------------------*/

// ADD BOOK
router.get('/add-book',(req,res)=>{        
    res.render('books/select')
})

// SUB ROUTS FOR ADDING BOOK
    router.get('/find-gen-count',async(req,res)=>{
      let gen=req.query.coutn
      
      
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
// VIEW ALL BOOKS
router.get('/view-books',(req,res)=>{
  bookHelpers.viewbooks().then((data)=>{
    console.log(data);
    res.render('books/view-books',{data})
  })
})

// VIEW SING BOOK DETAILES 
router.get('/view-book/:id',(req,res)=>{
  let id=req.params.id
  bookHelpers.viewbook(id).then((result)=>{
    res.render('books/view-book',{result})
  })
})
//  BOOK SEARCH
router.get('/search-book',(req,res)=>{
  res.render('books/searchbook')
}) 
//  SUB ROUTS FOR BOOK SERACH
    router.get('/search-gen/:id',(req,res)=>{
      let id=req.params.id
      bookHelpers.viewgen(id).then((data)=>{
        res.render('books/view-books',{data})
      })
    })

   // ROUTS RELATED TO MEMBERS 
/*----------------------------------------------------------*/

module.exports = router;
