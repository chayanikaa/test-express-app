const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Express World! Test3');
});


app.listen(port, () => {
  console.log(`Example app deployed through ECS test`);
});
