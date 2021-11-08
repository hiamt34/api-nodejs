var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var adminsRouter = require('./routes/admins');
var categorysRouter = require('./routes/categorys');
var sizesRouter = require('./routes/sizes');
var collorsRouter = require('./routes/collors');
var brandsRouter = require('./routes/brands');
var bannersRouter = require('./routes/banners');
var slicesRouter = require('./routes/slices');
var tagsRouter = require('./routes/tags');
var blogsRouter = require('./routes/blogs');
var ordersRouter = require('./routes/orders');

const mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/api_banhang', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  //hppt thì xóa dòng này
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser("Chuỗi này để dùng signedcookie authen"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/admins', adminsRouter);
app.use('/categorys', categorysRouter);
app.use('/sizes', sizesRouter);
app.use('/collors', collorsRouter);
app.use('/brands', brandsRouter);
app.use('/banners', bannersRouter);
app.use('/slices', slicesRouter);
app.use('/tags', tagsRouter);
app.use('/blogs', blogsRouter);
app.use('/orders', ordersRouter);

//lưu ảnh
app.use('/IMG', express.static('IMG'));
app.use('/imgBlog', express.static('imgBlog'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("NOT FOUND");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {

  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  return res.status(status).json({
    error: {
      message: error.message
    }
  })
});

module.exports = app;