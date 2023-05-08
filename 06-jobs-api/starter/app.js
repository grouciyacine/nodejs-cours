require('dotenv').config();
require('express-async-errors');
const helmet=require('helmet')
const cors=require('cors')
const xss=require('xss-clean')
const rateLimit=require('express-rate-limit')
const express = require('express');
const app = express();
//connect db
const connectDb=require('./db/connect')
//toke middleware
const AuthenticateUser=require('./middleware/authentication')
//router
const authRouter=require('../starter/routes/auth')
const jobsRouter=require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages
//Security
app.use(
  rateLimit({
    windowMs:15*60*1000 , //15min
    max:100, //limit each IP to 100 req per windows
  })
)
app.use(cors())
app.use(rateLimit)
app.use(helmet())
app.use(xss())
// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',AuthenticateUser,jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
//6:47
