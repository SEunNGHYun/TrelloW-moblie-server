const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const controller = require('./controller/user');
const checklistRoutes = require('./routes/checklistRoutes');
const { secretKey } = require('./config/secret_key');
const userRoutes = require('./routes/userroutes');
const boardRoutes = require('./routes/boardroutes');
const containerRoutes = require('./routes/containerroutes');
const cardRoutes = require('./routes/cardroutes');



app.use(cors({
  origin: '*',
  credentials: true
}));
app.set('jwt-secret', secretKey);
// app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.all('/*', controller.usercheck);
app.get('/', controller.check);

app.use('/boards', boardRoutes);
app.use('/containers', containerRoutes);
app.use('/cards', cardRoutes);
app.use('/checklists', checklistRoutes);

app.listen('9000', () => {
  console.log('????연결 되었습니다');
});



