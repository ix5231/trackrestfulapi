import express from "express";
import dayjs from "dayjs";

const app: express.Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Hello, world!');
});

app.post('/recipes', function (req, res) {
    console.log(req.body);
    const hasAllRequiredProps = ["title", "preparation_time", "serves", "ingredients", "cost"]
        .every((c) => Object.prototype.hasOwnProperty.call(req.body, c));
    if (hasAllRequiredProps) {
        res.send({
            "message": "Recipe successfully created!",
            "recipe": [
                {
                    "id": "3",
                    "title": req.body.title,
                    "preparation_time": req.body.preparation_time,
                    "serves": req.body.serves,
                    "ingredients": req.body.ingredients,
                    "cost": req.body.cost,
                    "created_at": dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    "updated_at": dayjs().format('YYYY-MM-DD HH:mm:ss')
                }
            ]
        });
    } else {
        res.send({
            "message": "Recipe creation failed!",
            "required": "title, preparation_time, serves, ingredients, cost"
        });
    }
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});