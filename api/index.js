const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter =  require('./routers/auth');
const userRouter =  require('./routers/users');
const movieRouter =  require('./routers/movies'); 
const listsRouter =  require('./routers/lists');
const bodyParser = require('body-parser');

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=> console.log('DB Connection Successfull!')).catch((err)=> console.log(err))

app.use(express.json());

app.use(bodyParser.json());
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listsRouter);

app.listen(8800, () => {
    console.log("servidor no ar");
})