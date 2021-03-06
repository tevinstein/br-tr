require('dotenv').config()
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const userAuth = require('./routes/auth.routes');
const categories = require('./routes/category.routes');
const messages = require('./routes/message.routes');
const forgotPassword = require('./routes/forgot_password.routes.js');
const models = require('./models')
const items = require('./routes/item.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

/** *********************************************************
 *  PassportJS
 ********************************************************* */
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
  function (username, password, done) {
    models.User.find({ where: {username: username, password: crypto.createHash('md5').update(password).digest("hex") } })
      .then(function (user) {
        if (user !== null) {
          return done(null, user);
        }
        else {
          return done(null, false);
        }
      })
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

const auth = function (req, res, next) {
  if (!req.isAuthenticated()){
    res.send(401);
  }else{
    next();
  }
};

app.use('/api', userAuth)
app.use('/api/categories', categories)
app.use('/api/messages', messages)
app.use('/api/forgot_password', forgotPassword)
app.use('/api/items', items)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
})

var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs')

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            if (req.url === '/') {
                log('Received message: ' + body);
            } else if (req.url = '/scheduled') {
                log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }

            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
            res.end();
        });
    } else {
        res.writeHead(200);
        res.end();
    }
});

// Listen on port 3000, IP defaults to 127.0.0.1
app.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/')
