const connectDB = require('./connect');
const express = require('express');
const cors = require("cors")


///////////////////creatiing express server/////////////////////
const app = express()
const port = 5000           

app.use(express.json())     ////to deal with json request and response
///////////////////connect to database///////////////////////////
app.use(cors())
app.listen(port, async () => {
    await connectDB();
  console.log(`Example app listening on port ${port}`)
})
////////////////////routes through end point//////////////////
app.use('/user' , require('./routs/user'));
app.use('/note' , require('./routs/note'));

app.get('/', (req, res) => {
  res.send('home page e ki marachis end point e kaj kor')
})
