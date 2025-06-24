import express from 'express';
const app = express();

app.use(express.json());

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

app.post('/api/user', (req, res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({error:'The user name is missing'});
    }
    const newUser={
        id:users.length+1,
        name:name
    };
    users.push(newUser);
    res.status(201).json(newUser);
})

export default app;
