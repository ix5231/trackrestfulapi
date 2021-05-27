python -m httpie POST localhost:3000/recipes title="a" preparation_time=2 serves=3 ingredients=4 cost=5
python -m httpie POST localhost:3000/recipes title="b" preparation_time=2 serves=3 ingredients=4 cost=5
python -m httpie GET localhost:3000/recipes