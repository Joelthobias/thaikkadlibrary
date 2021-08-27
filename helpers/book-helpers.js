
var db=require('../config/connection')
var objectId = require("mongodb").ObjectID;
module.exports={
    addbook:(book,callback)=>{
        book.id=parseInt(book.id)
        book.price=parseInt(book.price)
        book.gen_id=parseInt(book.gen_id)
        book.bk_id=parseInt(book.bk_id)

        return new Promise(async(resolve,reject)=>{
          db.get().collection("book").insertOne(book)
          resolve(true)
        })
    },
    viewbooks:()=>{
        return new Promise(async(resolve,reject)=>{
            let book=await db.get().collection('book').find().toArray()
            resolve(book);
        })
    },
    viewbook:(id)=>{
        return new Promise(async(resolve,reject)=>{
            id=parseInt(id)
            let book=await db.get().collection('book').findOne({bk_id:id})
            resolve(book)
        })
    },
    updatebook: (id, book) => {
    // let price=parseInt(pro.price)
    book.price=parseInt(book.price)
    return new Promise((resolve, reject) => {
      db.get()
        .collection('book').updateOne({ _id:objectId(id) },
          {
            $set: {
              bk_name: book.bk_name,
              au_name: book.au_name,
              price: book.price,
              lg: book.lg,
              dop:book.dop,
              cat:book.cat,
              pub:book.pub,
              img:book.img,
              nop:book.nop
            },
          }
        )
        .then((response) => {
          resolve(response);
          //   console.log(product);
        });
    });
  },
    getbookcount: () => {
        return new Promise(async (resolve, reject) => {
        let cart = 0;
        cart = await db.get().collection('book').countDocuments();
        console.log(cart);
        cart=cart+1000
        resolve(cart)
        });
  },
      getgencount: (gen) => {
        return new Promise(async (resolve, reject) => {
        let cart = 0;
        cart = await db.get().collection('book').countDocuments({cat:gen});
        console.log(cart);
        cart=cart+1001
        resolve(cart)
        });
  },
  rendbook:(body)=>{
    body.yy=parseInt(body.yy)
    body.status=false
    if(body.mm<10){
      body.mm='0'+body.mm
      

    }
    body.sl=body.yy+''+ body.mm +'' +'01'
    body.sl=parseInt(body.sl)

    return new Promise ((resolve,reject)=>{
      db.get().collection('rendbook').insertOne(body).then(()=>{
      console.log(body);
      resolve(true)
      })

    })
  },
  findrend:(id)=>{
    return new Promise (async(resolve,reject)=>{
      let rend=await db.get().collection('rendbook').find({mem_id:id}).toArray()
      resolve(rend)
      
    })
  }      
}