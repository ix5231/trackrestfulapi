import express from "express";
import dayjs from "dayjs";

let fakeId = 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakeDb: { [id: number]: any } = {};

const app: express.Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.statusCode = 404;
    res.send();
});

app.get('/recipes', (req, res) => {
    res.send({
        "recipes": Object.values(fakeDb),
    });
});

app.post('/recipes', (req, res) => {
    console.log(req.body);
    const hasAllRequiredProps = ["title", "making_time", "serves", "ingredients", "cost"]
        .every((c) => Object.prototype.hasOwnProperty.call(req.body, c));
    if (hasAllRequiredProps) {
        fakeId++;
        const newRecipe =
        {
            "id": fakeId,
            "title": req.body.title,
            "preparation_time": req.body.preparation_time,
            "serves": req.body.serves,
            "ingredients": req.body.ingredients,
            "cost": req.body.cost,
        };
        fakeDb[fakeId] = newRecipe;
        res.send({
            "message": "Recipe successfully created!",
            "recipe": [
                {
                    ...newRecipe,
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

app.get('/recipes/:id', (req, res) => {
    console.log(req.body);
    res.send({
        "message": "Recipe details by id",
        "recipe": fakeDb[req.params.id as unknown as number]
    });
});

app.patch('/recipes/:id', (req, res) => {
    const id = req.params.id as unknown as number;
    const newData = { ...fakeDb[id], ...req.body };
    fakeDb[id] = newData;
    res.send({
        "message": "Recipe successfully updated!",
        "recipe": [
            newData
        ]
    });
});

app.delete('/recipes/:id', (req, res) => {
    const data = fakeDb[req.params.id as unknown as number];
    const resb = data ? { "message": "Recipe successfully removed!" } : { "message": "No recipe found" };
    if (data) {
        delete fakeDb[req.params.id as unknown as number];
    }
    res.send(resb);
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});