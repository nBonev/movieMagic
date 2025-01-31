import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';

import showRatingHelper from './helpers/ratingHelper.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';


const app = express();

// db configuration
try {
    const defaultUri = 'mongodb://localhost:27017/magic-movies';
    await mongoose.connect(process.env.DATABASE_URI ?? defaultUri);

    console.log('DB Connected Successfully!');
    
}catch(err) {
    console.log('Cannot connect to DB!');
    console.error(err.message);
}

// handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRatingHelper,
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');


// express configuration
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false})); // Learn express to parse form data
app.use(cookieParser());
app.use(authMiddleware);


// setup routes
app.use(routes);

// start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
