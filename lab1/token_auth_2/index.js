const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const JWT_SECRET = 'security_system_labs';

app.get('/', (req, res) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const decoded = jwt.verify(token, JWT_SECRET);
            return res.json({
                username: decoded.username,
                logout: 'http://localhost:3000/logout'
            })
        }
    } catch {}
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/logout', (req, res) => {
    res.redirect('/');
});

const users = [
    {
        login: 'Login',
        password: 'Password',
        username: 'Username',
    },
    {
        login: 'Login1',
        password: 'Password1',
        username: 'Username1',
    },
    {
        login: 'LLumisS',
        password: '2024',
        username: 'Kyrylo',
    }
]

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;

    const user = users.find((user) => {
        if (user.login == login && user.password == password) {
            return true;
        }
        return false
    });

    if (user) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET);
        res.json({ token });
    }

    res.status(401).send();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
