const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
const route = require('./routes/index');

app.use(express.json());
app.use('/', route);

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
