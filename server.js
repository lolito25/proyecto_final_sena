const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoute');
const salesRoutes = require('./routes/salesRoute');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const app = express();
const port = 3000;
dotenv.config();

// Configuración de la sesión
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Configuración de flash
app.use(flash());

// Middleware para pasar mensajes flash a las vistas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use(authRoutes);
app.use(productRoutes);
app.use(salesRoutes);
app.use(dashboardRoutes);

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
