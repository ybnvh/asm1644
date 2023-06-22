var express = require('express');
const ToyModel = require('../Model/ToyModel');
var router = express.Router();

router.get('/', async (req, res) => {
  var toys = await ToyModel.find({});

  // var total = await ToyModel.count();
  //console.log(Toys);
  //res.send(toys);
  res.render('index', { toys : toys })
})

router.get('/product_page', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('product_page', { toys: toys });
})

router.get('/delete/:id', async(req, res) => {
  await ToyModel.findByIdAndDelete(req.params.id)
  res.redirect('/');
})

router.get('/drop', async(req, res) => {
  await ToyModel.deleteMany({})
  .then(() => { console.log ('Delete all toys succeed !')});
  
  res.redirect('/');
})

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var toy = await ToyModel.findById(id);
  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
  var total_price = price * order_quantity;
  res.render('order_confirm', { toy: toy, order_quantity : order_quantity, total_price : total_price});
})

router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var toy = req.body;
  await ToyModel.create(toy)
  .then(() => { console.log ('Add new toy succeed !')});
  res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
  var toy = await ToyModel.findById(req.params.id);
  res.render('edit', { toy : toy});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData = req.body;
  await ToyModel.findByIdAndUpdate(id, updatedData)
    .then(() => { console.log('Edit toy succeed !') });
  res.redirect('/')

})

// //search function
// router.post('/search', async (req, res) => {
//   var keyword = req.body.keyword;
//   var movies = await MovieModel.find({ title: new RegExp(keyword, "i") })
//   res.render('movie/index', { movies: movies })
// })

//sort function
router.get('/ascending', async (req, res) => {
  var toys = await ToyModel.find().sort({ price: 1 })
  res.render('product_page', { toys: toys })
})

router.get('/descending', async (req, res) => {
  var toys = await ToyModel.find().sort({ price: -1 })
  res.render('product_page', { toys: toys })
})

// router.post('/filter',async (req,res) => {
//   var brandName = req.body.brand;
//   var toys = await ToyModel.find({ brand : brandName})
//   res.render('product_page',{toys: toys})
// })



module.exports = router;

