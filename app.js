const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());

const factorial = (n) => {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
};

app.get('/', (req, res) => {
  res.send('Hello Express World! Test1');
});

app.get('/factorial', (req, res) => {
  const number = Math.round(Math.random() * 100);
  console.log(number)
  res.send(`Factorial of ${number} is ${factorial(number)}`);
});


app.listen(port, () => {
  console.log(`Example app deployed through ECS test`);
});
