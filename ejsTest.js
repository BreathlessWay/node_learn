const path = require('path');
const app = require('express')();
const useRouter = require('./routes/users');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/user', useRouter);

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});