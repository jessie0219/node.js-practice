// 第一個區塊 內建模組
const path = require('path');

// 第二個區塊 第三方模組(套件)
const express = require('express');
const session = require('express-session');
const connectFlash = require('connect-flash');
const csrfProtection = require('csurf');
const bodyParser = require('body-parser');

// 第三個區塊 自建模組
const database = require('./utils/database');
const authRoutes = require('./routes/auth'); 
const shopRoutes = require('./routes/shop'); 
const errorRoutes = require('./routes/404');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

////////////////////////////////////////////////////////////////

const app = express();
const port = 3000;
const oneDay = 1000 * 60 * 60 * 24;

// middleware
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: oneDay,
    }
 })); 
app.use(connectFlash());
app.use(csrfProtection());

app.use((req, res, next) => {
    res.locals.pageTitle = 'ECHO Shop';
    res.locals.path = req.url;
    res.locals.isLogin = req.session.isLogin || false;
    res.locals.csrfToken = req.csrfToken();
    next();
});

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

app.use(authRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

database
    // .sync()
	.sync({ force: true }) // 和 db 連線職，強制重設 db
	.then((result) => {
        Product.bulkCreate(products);
		app.listen(port, () => {
			console.log(`Web Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.log('create web server error: ', err);
	});

    const products = [
        {
            title: 'Rick And Morty  / 檯燈',
            price: 1900,
            description: '帥的單品不需要多介紹，男朋友一直吵就是因為你沒買，妹子趕快來密我',
            imageUrl: 'https://cf.shopee.tw/file/0aed1fc0dc776365707909b94f8acf11'
        },
        {
            title: 'Rick and Morty / 爺爺的小酒壺',
            price: 1280,
            description: '口頭禪寫在上面還不買一個嗎？“Wubba Lubba Dub Dub!”',
            imageUrl: 'https://img.alicdn.com/imgextra/i2/2680007033/O1CN01tVSIuA21pA70IixSY_!!2680007033.jpg'
        },
        {
            title: 'Happi class 漢堡椅',
            price: 9500,
            description: '1/6 BUR-CHAIR!當初真的可以坐的漢堡椅不再產了，於是來自香港的HAPPI CLASS用1/6的微縮比例讓大家還是可以擁有他！看看盒子也好好看～是快餐造型🤣',
            imageUrl: 'https://img.ruten.com.tw/s2/2/da/50/22136037887568_318.png '
        },
        {
            title: 'Rick And Morty  / 檯燈',
            price: 1900,
            description: '帥的單品不需要多介紹，男朋友一直吵就是因為你沒買，妹子趕快來密我',
            imageUrl: 'https://cf.shopee.tw/file/0aed1fc0dc776365707909b94f8acf11'
        },
        {
            title: 'Rick and Morty / 爺爺的小酒壺',
            price: 1280,
            description: '口頭禪寫在上面還不買一個嗎？“Wubba Lubba Dub Dub!”',
            imageUrl: 'https://img.alicdn.com/imgextra/i2/2680007033/O1CN01tVSIuA21pA70IixSY_!!2680007033.jpg'
        },
        {
            title: 'Happi class 漢堡椅',
            price: 9500,
            description: '1/6 BUR-CHAIR!當初真的可以坐的漢堡椅不再產了，於是來自香港的HAPPI CLASS用1/6的微縮比例讓大家還是可以擁有他！看看盒子也好好看～是快餐造型🤣',
            imageUrl: 'https://img.ruten.com.tw/s2/2/da/50/22136037887568_318.png '
        }
    ];