import express from 'express';

const app = express();

app.get('/', () => {
  console.log('hello world');
});
app.listen(3000);
