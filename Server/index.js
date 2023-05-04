const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql')
const app = express();
app.use(bodyParser.json());
const portNumber = 3001
// const PORT = process.env.PORT || 3001;
// app.get('/api/donors', (req, res) => {
//   res.json(donors);
// });

// const donors = [
//   { id: 1, name: 'John Doe', address: '123 Main St, Anytown USA' },
//   { id: 2, name: 'Jane Smith', address: '456 Oak St, Anytown USA' },
//   { id: 3, name: 'Bob Johnson', address: '789 Maple St, Anytown USA' },
// ];


// app.post('/api/data', (req, res) => {
//   console.log(req.body);
//   res.json(donors);
// });





// app.get('/api', (req, res) => {
//   console.log(req.body);
//   res.json({ message: 'Welcome to landing page' });
// });
// app.get("/api", (req, res) => {
//   res.json(
//     {
//       Name: "Anoop Kumar",
//       BloodGroup: "A+",
//       Phone: "7985345837",
//       Location: "Chandigarh University, Mohali",
//       PINCODE: "140413"
//     }
//   );
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
// const express = require('express');



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'RTBMS'
})

connection.connect((err) => {
  if(err){
      console.log(err)
  }else{
      console.log("Database connected")
  }
})

app.get("/api/fetch", (req, res) =>{
  var data;
  console.log(req.query)
  const fetchpin = req.query.pin
  const fetchType = req.query.type
  let fetchBtype
  if(fetchType.length>2){
      fetchBtype = fetchType.charAt(0) +fetchType.charAt(1)+ (fetchType.charAt(2) === "1" ? "+" : "-");
  }else{
      fetchBtype = fetchType.charAt(0)+ (fetchType.charAt(1) === "1" ? "+" : "-");
  }
  console.log(typeof(fetchType))
  console.log(fetchType)
  connection.query(`Select * from Donors where pincode=${fetchpin} and Btype=\"${fetchBtype}\"`, (err, result,fields) => {
      if(err){
          console.log(err)
          res.json({"Message":"error"})
      }else{
          console.log(result)
          data = JSON.parse(JSON.stringify(result))
          res.json(data)
      }
  })
})



//port in which it is running
app.listen(portNumber, () => {
  console.log(`Server is listening on port ${portNumber}`)
})