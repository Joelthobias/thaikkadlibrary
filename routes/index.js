const { response } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs')
const bookHelpers = require('../helpers/book-helpers');
const memberHelpers = require('../helpers/member-helpers')

/* GET home page. */
router.get('/', async(req, res)=>{
  let t=await bookHelpers.getbookcount()
  t=t-1001
  u=await bookHelpers.getgencount('U')
  u=u-1001
  n=await bookHelpers.getgencount('N')
  n=n-1001
  dn=await bookHelpers.getgencount('DN')
  dn=dn-1001
  c=await bookHelpers.getgencount('C')
  c=c-1001
  b=await bookHelpers.getgencount('B')
  b=b-1001
  d=await bookHelpers.getgencount('D')
  d=d-1001
  e=await bookHelpers.getgencount('E')
  e=e-1001
  h=await bookHelpers.getgencount('H')
  h=h-1001
  s=await bookHelpers.getgencount('S')
  s=s-1001
  p=await bookHelpers.getgencount('P')
  p=p-1001
  res.render('index', {t,u,n,dn,c,b,d,e,h,s,p});
});

// ROUTS RELATED TO BOOKS
/*----------------------------------------------------------*/

// ADD BOOK

router.get('/add-book',(req,res)=>{        
    res.render('books/add-book')
})

// SUB ROUTS FOR ADDING BOOK
    // router.get('/find-gen-count',async(req,res)=>{
    //   let gen=req.query.coutn
      
      
    //   bkcount=await bookHelpers.getbookcount()
    //   gencount=await bookHelpers.getgencount(gen)
    //   res.render('books/add-book',{gencount,gen,bkcount})
    // })

router.get('/add-book',(req,res)=>{  

    res.render('books/add-book')
})

// // SUB ROUTS FOR ADDING BOOK
//     router.get('/find-gen-count',async(req,res)=>{
//       let gen=req.query.coutn
      
      
//       bkcount=await bookHelpers.getbookcount()
//       gencount=await bookHelpers.getgencount(gen)
//       res.render('books/add-book',{gencount,gen,bkcount})
//     })


    router.post('/add-book',(req,res)=>{
      let data =req.body
      console.log(data);
      bookHelpers.addbook(data).then((result)=>{
        res.redirect('/add-book')
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

// Edit BOOK

router.get('/edit-book/:id', async (req, res) => {
    let id = req.params.id
    console.log(id);
    let result = await bookHelpers.viewbook(id)
    res.render('books/edit-book', {result})

}),

  // SUB ROUTE FOR EDIT BOOK
  router.post('/edt-book/:id',(req,res)=>{
    let id=req.params.id
    let data =req.body
    bookHelpers.updatebook(id,data).then(()=>{
      res.redirect('/view-books')
    })
}),

   // ROUTS RELATED TO MEMBERS 
/*----------------------------------------------------------*/

// Route for member create
router.get('/add-membs',(req,res)=>{
  memberHelpers.getmembercount().then((counts) => {
    res.render('member/add-member',{counts})
  })
})
    // subroute for adding books
    router.post('/add-membs',(req,res)=>{
      let data=req.body
      memberHelpers.addmember(data).then(()=>{
        res.redirect('/add-membs')
      })
    })

// Route for listing all members
router.get('/view-membs',(req,res)=>{
  memberHelpers.viewmembers().then((members)=>{
    res.render('member/view-members',{members})
  })
})

// Route for viewing single member details
router.get('/view-member/:id',(req,res)=>{
  let id =req.params.id
  memberHelpers.viewmember(id).then((member)=>{
    bookHelpers.findrend(id).then((result)=>{
      res.render('member/view-member',{member,result})
    })
  })
}) 

// route for Rending book
router.get('/rend-book/:id',async(req,res)=>{
  let id=req.params.id
  let date=new Date()
  console.log(date);
  let dt=date.getDate()
  let month=date.getMonth() +1
  let yer=date.getFullYear()
  let dat =date.getTime()
  if(month<=9){
    month='0'+month 
  }
  thismonthcount=await bookHelpers.findthismonth(month,yer)
  console.log(thismonthcount);
  bookHelpers.viewbook(id).then((result)=>{
    
    res.render('books/rend-book',{result,month,yer,thismonthcount,dt,})
  })

})
    router.post('/rend-book',(req,res)=>{
      let data=req.body
      data.date=new Date()
      data.status=false
      bookHelpers.rendbook(data).then(()=>{ 
        let loc=data.mem_id
        let ads='/view-member/'+loc
        res.redirect(ads)
      })
    })
// get member details
router.get('/get-member/:id',(req,res)=>{
  let id=req.params.id
  
  memberHelpers.view(id).then((member)=>{
    res.json({member})
  })
})
router.get('/rend',(req,res)=>{
  memberHelpers.getallrend().then((rend)=>{
    for (let index = 0; index < rend.length; index++) {
        const element = rend[index]; 
        if(element.bkdatestatus===false){ 
          let dt=element.date.getTime()
          let Cdate=new Date().getTime()   
          let Ddate= Cdate -dt
          let diff = Math.floor(Ddate / (1000 * 60 * 60 * 24))
          console.log(diff);
              if(diff>15 ){
                  element.bkdatestatus=true
              }
              console.log(element.bkdatestatus);                   
        }
    }
    res.render('member/rend',{rend})


    
  })
})
router.get('/return-book/:id',(req,res)=>{
  let id=req.params.id
  memberHelpers.returnbook(id).then(()=>{
    res.redirect('/rend')
  })
})
module.exports = router;
