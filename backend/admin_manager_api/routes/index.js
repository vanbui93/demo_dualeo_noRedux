var express = require('express');
var router = express.Router();
var pool = require('./connectDb');

//thêm đoạn dưới vào để xử lý lỗi CORS PROXY
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// /* GET product edit. */
router.get('/api/products', function(req, res) {
  pool.connect(function(error){
    pool.query('SELECT * FROM product_info', (err, response) => {
      if(error) {  // nếu lỗi thì trả về error
        return console.error('error running query', err);
      } else {   // Nếu thành công trả về response
        // console.log(response.rows); //console chỉ xem được trên backend thôi
        res.send(response.rows);  //send dữ liệu phía api
      }
      // pool.end(); // đóng cổng kết nói csdl
    })
  })
});


// tạo router method="post"
router.post('/api/add', function(req, res, next) {
  pool.connect(function(error){   // phải có pool.connect ở đây thì mới được
    var product_name = req.body.product_name,
    product_price = req.body.product_price,
    description = req.body.description,
    quantity = req.body.quantity,
    product_image = req.body.product_image,
    product_vendor = req.body.vendor,
    type_product = req.body.type_product,
    product_variant = req.body.variant,
    p_collection = req.body.collection,
    comparison_price = req.body.comparison_price;
    sql = "insert into product_info (product_name,product_price,description,quantity,product_image,vendor,type_product,variant,collection,comparison_price) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
    pool.query(sql,[product_name,product_price,description,quantity,product_image,product_vendor,type_product,product_variant,p_collection,comparison_price],(err,result) => {
      if(error) {
        return res.send(err);
      } else {
        res.json({data: result});
      }
    })
  })
});

/* DELETE a product. */
router.delete('/api/delete/:id', (req, res) => {
  //lấy id ở đường dẫn req.params.id
  pool.connect(function(error){
    var sql = "DELETE FROM product_info " + "WHERE id='"+req.params.id+"'";
      pool.query(sql, function(err, results) {
        if(err) {
          return res.send(error);
        } else {
          return res.json({results});
        }
        });
})
});

// /* GET product page. */
router.get('/api/edit/:id', function(req, res) {
  pool.connect(function(error){
    var sql = "SELECT * FROM product_info " + "WHERE id='"+req.params.id+"'";
    pool.query(sql, (err, results) => {
      if(error) {  // nếu lỗi thì trả về error
        return console.error('error running query', err);
      } else {   // Nếu thành công trả về response
        // console.log(response.rows); //console chỉ xem được trên backend thôi
        res.send(results.rows);
      }
      // pool.end(); // đóng cổng kết nói csdl
    })
  })
});

router.put('/api/edit/:id', function(req, res) {
  pool.connect(function(error){ 
    var sql = "UPDATE product_info SET " + 
    "product_name = '"+req.body.product_name+"'," + 
    "product_price = '"+req.body.product_price+"'," + 
    // "description = '"+req.body.description+"'," + 
    // "quantity = '"+req.body.quantity+"'," + 
    "product_image = '"+req.body.product_image+"'" + 
    // "vendor = '"+req.body.vendor+"'," + 
    // "type_product = '"+req.body.type_product+"'," + 
    // "variant = '"+req.body.variant+"'," + 
    // "collection = '"+req.body.collection+"'," + 
    // "comparison_price = '"+req.body.comparison_price+"'" + 
    "WHERE id='"+req.params.id+"'";
    pool.query(sql, function(err, results) {
      if(err) {
        return res.send(error);
      } else {
        res.json({results});
      }
      });
  })

})

module.exports = router; 