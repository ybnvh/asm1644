var express = require('express');
const ToyModel = require('../Model/ToyModel');
var router = express.Router();

router.get('/', async (req, res) => {
  var toys = await ToyModel.find({});

  // var total = await ToyModel.count();
  //console.log(Toys);
  //res.send(mobiles);
  res.render('index', { toys : toys })
})

router.get('/list', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('list', { toys: toys });
})

router.get('/delete/:id', async(req, res) => {
  // var id = req.params.id;
  // var mobile = await MobileModel.findById(id);
  // await MobileModel.deleteOne(mobile);

  await ToyModel.findByIdAndDelete(req.params.id)
  // .then(() => { console.log ('Delete mobile succeed !')})
  // .catch((err) => { console.log ('Delete mobile failed !')});

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
  res.render('order_confirm', { mobile: mobile, order_quantity : order_quantity, total_price : total_price});
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
  await ToyModel.findByIdAndUpdate(id)
  .then(() => { console.log('Edit toy succeed !') });
  res.redirect('/');
})

module.exports = router;
