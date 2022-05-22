////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// setup
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const seedData = require('./models/seed.js')
const Budget = require('./models/budgetschema.js')
require('dotenv').config()

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , () => {
    console.log('connected to mongo')
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


// Seed data => only run this once
app.get('/seed', (req, res) => {
    Budget.create(seedData, (err, createData) => {
        console.log('seed data registered')
    })
    res.redirect('/')
})

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// RESTful routes
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//___________________
// Routes
//___________________
//localhost:3000


// CREATE => POST
app.post('/', (req,res) => {
    Budget.create(req.body, (error, createdBudget) => {
        if (error) {
            console.log(error)
        } else {
            console.log(createdBudget)
        }
        res.redirect('/');
    })
})



// INDEX => GET
app.get('/' , (req, res) => {
    Budget.find({}, (error, allBudgets) => {
        res.render('index.ejs', {
            budgets: allBudgets
        });
    });
});


// NEW => GET
app.get('/new', (req, res) => {
    res.render('new.ejs')
});

// EDIT => GET
// app.get('/edit/:id', (req, res) => {
//     Budget.findById(req.params.id, (err, foundBudget) => {
//         res.render('edit.ejs', {
//             budget: foundBudget
//         });
//     });
// });

// SHOW => GET
app.get('/:id', (req, res) => {
    Budget.findById(req.params.id, (err, foundBudget) => {
        res.render('show.ejs', {
            budget: foundBudget
        });
    });
});



// UPDATE => PUT
// app.put('/:id', (req, res) => {
//     Budget.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBudget) => {
//         // console.log(updatedBudget)
//         res.redirect('/')
//     });
// });

// DESTROY => DELETE
app.delete('/:id', (req, res) => {
    Budget.findByIdAndRemove(req.params.id, (err, deleteBudget) => {
        res.redirect('/')
    });
});



////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// connection
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));