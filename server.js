const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//app.set('views', __dirname + '/views');
//app.engine('handlebars', exphbs({partialsDir: __dirname + '/views/partials/'}));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to appendFile');
        }
    });
    next();
});

/*
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
*/

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Homepage',
        welcomeMessage: 'Welcome to our website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad Request',
        status: 400
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
