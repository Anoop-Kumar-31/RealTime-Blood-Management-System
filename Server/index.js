const express = require("express");
const bodyParser = require('body-parser');
// const mysql = require('mysql')
// const db = require('@vercel/postgres');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
require('dotenv').config();
console.log(process.env.POSTGRES_URL)

const { MongoClient } = require("mongodb");

//LyVQhObJ05eD0Aub

// const e = require("express");
let sendOtp=0

const app = express();
app.use(bodyParser.json());
// app.use(app.json());
const portNumber = process.env.PORT || 5432;//10000

const cors = require('cors');
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'application/json');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });



const allowedOrigins = ['https://bloodmanagementsystem-anoop.vercel.app', 'https://bloodmanagementsystem-anoop.vercel.app/Form','https://realtime-blood-management-system.onrender.com'];
// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
//   allowedHeaders: 'X-Requested-With,content-type',
//   credentials: true
// }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'POST,GET,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Content-Type', 'application/json');
//   req.header('Access-Control-Expose-Headers', 'Content-Type')
//   next();
// })

// const pool = new Pool({
//   connectionString: "postgres://anoop:UBPX01OmTQjjOx3qprqskQIwuozdDIc9@dpg-cp6b6m0l6cac738hrmcg-a.oregon-postgres.render.com/rdbms?sslmode=no-verify",
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// console.log('PostgreSQL Host:', process.env.POSTGRES_HOST);

// Test the PostgreSQL connection
// async function testDbConnection() {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     console.log('Connected to PostgreSQL:', result.rows[0]);
//   } catch (err) {
//     console.error('Error executing query', err.stack);
//   }
// }
// async function connectDb() {
//   const connectionString = "postgres://anoop:UBPX01OmTQjjOx3qprqskQIwuozdDIc9@dpg-cp6b6m0l6cac738hrmcg-a.oregon-postgres.render.com/rdbms?sslmode=no-verify";
//   if (!connectionString) {
//     throw new Error('POSTGRES_URL not set in environment variables');
//   }
//   return connectionString;
// }
// testDbConnection();


app.post('/api/register', async (req, res) => {
  const uri ="mongodb+srv://amt312002:ZeroToNine_0123456789@ak31.ptkvm4r.mongodb.net/?retryWrites=true&w=majority&appName=Ak31";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try{
    await client.connect();
    const database = client.db("RTBMSdatabase");
    const collection = database.collection("collection1");

    let { name, bloodtype, pin, phone, email, address, state, age } = req.body;
    let fetchBtype = bloodtype.length > 2 ? bloodtype.charAt(0) + bloodtype.charAt(1) + (bloodtype.charAt(2) === '1' ? '+' : '-') : bloodtype.charAt(0) + (bloodtype.charAt(1) === '1' ? '+' : '-');

    await collection.insertOne({ "Name":`${name}`, "Age":`${age}`, "PhoneNumber":`${phone}`, "Username":`${email}`, "Blood Group":`${fetchBtype}`, "Pincode": `${pin}`, "State":`${state}`,"Address":`${address}`, "Available":"Yes" });
    res.status(200).json({ success: true, message: 'Registration successful' });
    // await client.close();
  }catch (error) {
    console.error('Error :', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

app.get("/api/fetch",async (req, res) => {
  const uri = "mongodb+srv://amt312002:i8tdtdM0TkQYquVH@ak31.ptkvm4r.mongodb.net/RTBMSdatabase?retryWrites=true&w=majority&appName=Ak31"; // Replace with your actual MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("RTBMSdatabase");
    const collection = database.collection("collection1");
    let {pin, bloodtype} = req.query;

    let fetchBtype = bloodtype.length > 2 ? bloodtype.charAt(0) + bloodtype.charAt(1) + (bloodtype.charAt(2) === '1' ? '+' : '-') : bloodtype.charAt(0) + (bloodtype.charAt(1) === '1' ? '+' : '-');
    pin=Number(pin);
    const result = await collection.find({ 
      "Blood Group": `${fetchBtype}`, 
      "Pincode": { $gte: `${pin - 10}`, $lte: `${pin + 10}` } 
    }).toArray();

    console.log(result);
    // Assuming `res` is defined somewhere in your code
    res.json(result);
  } catch (error) {
    console.error('Error :', error);
  } finally {
    await client.close();
  }
});

// email OTP generation transport and verification
const emailUsername = 'amt312002@gmail.com';
const emailPassword = 'urew baqu jdwy nrpw';
const emailHost = 'smtp.gmail.com';

var smtpConfig = {
  host: emailHost,
  port: 465,
  secure: true, // use SSL
  auth: {
    user: emailUsername,
    pass: emailPassword
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

app.post('/api/send-otp', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate the OTP (you may use any OTP generation logic here)
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp)
  // Send email using Nodemailer
  const mailOptions = {
    from: emailUsername,
    to: email,
    subject: 'One Time Password from HeatBeat',
    html: `<div style="text-align: center;">
            <img src="cid:logo" alt="Logo" width="200px" height="auto">
            <h1 style="color: #FF9BA1;">Thank you for visiting our website.</h1>
            <p>If possible, please consider helping others by registering as a donor and saving the lives of people in need.</p>
            <p>Below is your One Time Password (OTP):</p>
            <h2>OTP: ${otp}</h2>
          /div><br/><br/><br/><br/>
          <div>
            <p style="font-weight:bold;">HeartBeat Pvt. Limited<br>Chandigarh University,<br>Mohali - 140413</p>
          </div>`,
    attachments: [{
      filename: 'LOGO.png',
      path: './LOGO.png',
      cid: 'logo'
    }]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send OTP', error);
      return res.status(500).json({ error: 'Failed to send OTP' });
    }

    // console.log('OTP sent:', info.response);
    sendOtp=otp;
    res.status(200).json({ success: true});
    // res.append({otpnumber:{otp}})
    // console.log(res)
  });
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  if (otp == sendOtp) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});


app.listen(portNumber, () => {
  console.log(`Server is listening on port ${portNumber}`)
})

// async function fetch() {
//   const uri ="mongodb+srv://amt312002:i8tdtdM0TkQYquVH@ak31.ptkvm4r.mongodb.net/RTBMSdatabase?retryWrites=true&w=majority&appName=Ak31";
//   const client = new MongoClient(uri);
//   await client.connect();
//   const database = client.db("RTBMSdatabase");
//   const collection = database.collection("collection1");

//   // const { name, bloodtype, pin, phone, email, address, state, age } = req.body;
//   // let fetchBtype = bloodtype.length > 2 ? bloodtype.charAt(0) + bloodtype.charAt(1) + (bloodtype.charAt(2) === '1' ? '+' : '-') : bloodtype.charAt(0) + (bloodtype.charAt(1) === '1' ? '+' : '-');
//   let fetchBtype="A+";
//   let pin=271001;
//   const result = await collection.find({ "Blood Group": `${fetchBtype}`, "Pincode": { $gte: `${pin - 10}`, $lte: `${pin + 10}`} }).toArray();
//   console.log(result);
//   res.json(result);
//   await client.close();
// }

// const { MongoClient } = require('mongodb');

// async function fetch() {
//   const uri = "mongodb+srv://amt312002:i8tdtdM0TkQYquVH@ak31.ptkvm4r.mongodb.net/RTBMSdatabase?retryWrites=true&w=majority&appName=Ak31"; // Replace with your actual MongoDB connection string
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("RTBMSdatabase");
//     const collection = database.collection("collection1");

//     let fetchBtype = "A+";
//     let pin = 271001;
//     const result = await collection.find({ 
//       "Blood Group": `${fetchBtype}`, 
//       "Pincode": { $gte: `${pin - 10}`, $lte: `${pin + 10}` } 
//     }).toArray();

//     console.log(result);
//     // Assuming `res` is defined somewhere in your code
//     // res.json(result);
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   } finally {
//     await client.close();
//   }
// }

// fetch();