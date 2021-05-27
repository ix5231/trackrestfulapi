import express from "express";

const app: express.Express = express();
const port = 3000;

app.get('/', function (req, res) {
    res.send('Hello, world!');
});

app.listen(port, () =>{
    console.log(`listening at http://localhost:${port}`);
});