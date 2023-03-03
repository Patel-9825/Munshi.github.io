const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'patelp',
        password: 'password',
        database: 'munshidb'
    }
})

const app = express();


let initialPath = path.join(__dirname, "/")
app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(initialPath, "login.html"));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(initialPath, "register.html"));
});

app.post('/register-user', (req, res) => {
    const { user_email_address, user_password, user_fname, user_lname, user_phone, user_address, user_type_id} = req.body;

    if(!user_email_address.length || !user_password.length || !user_fname.length || !user_lname.length || !user_phone.length || !user_address.length || !user_type_id.length) {
        res.json('fill all the fields');
    } else{
        db("users").insert({
            user_email_address: user_email_address,
            user_password: user_password.value,
            user_fname: user_fname.value,
            user_lname: user_lname.value,
            user_address: user_address.value,
            user_phone: user_phone.value,
            user_type_id: user_type_id.value
        })
        .returning(["user_fname", "user_lname"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('user already exists')
            }
        })
    }
});

app.listen(4000, (req, res) => {
    console.log('server running on port 4000');
});