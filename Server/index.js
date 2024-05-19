// import dotenv from 'dotenv';
// // Load environment variables from .env.local file
// dotenv.config({ path: '.env.local' });

const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql')
const nodemailer = require('nodemailer');
const e = require("express");
// import {db} from '@vercel/postgres';
let sendOtp=0

const app = express();
app.use(bodyParser.json());
const portNumber = process.env.PORT || 3001;



const connection = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: 'root',
  // database: 'RTBMS'
  host : process.env.POSTGRES_HOST,
  user : process.env.POSTGRES_USER,
  password : process.env.POSTGRES_PASSWORD,
  database : process.env.POSTGRES_DATABASE,
})

connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Database connected")
  }
})

app.get("/api/fetch", (req, res) => {
  var data;
  console.log(req.query)
  const fetchpin = req.query.pin
  const fetchType = req.query.type
  let fetchBtype
  if (fetchType.length > 2) {
    fetchBtype = fetchType.charAt(0) + fetchType.charAt(1) + (fetchType.charAt(2) === "1" ? "+" : "-");
  } else {
    fetchBtype = fetchType.charAt(0) + (fetchType.charAt(1) === "1" ? "+" : "-");
  }
  console.log(typeof (fetchType))
  console.log(fetchType)
  connection.query(`Select * from donors where BloodGrp=\"${fetchBtype}\" and pincode between ${fetchpin - 10} and ${fetchpin + 10} ORDER BY pincode`, (err, result, fields) => {
    if (err) {
      console.log(err)
      res.json({ "Message": "error" })
    } else {
      console.log(result)
      data = JSON.parse(JSON.stringify(result))
      res.json(data)
    }
  })
})

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
  // console.log(otp)
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
          /div>
          <div><br><br><br><br>
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



app.post('/api/register', (req, res) => {
  // console.log(req)
  const name = req.body.name;
  const bloodtype = req.body.bloodtype;
  const pin = req.body.pin;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const state = req.body.state;
  const age = req.body.age;

  let countt;
  let fetchBtype;
  if (bloodtype.length > 2) {
    fetchBtype = bloodtype.charAt(0) + bloodtype.charAt(1) + (bloodtype.charAt(2) === '1' ? '+' : '-');
  } else {
    fetchBtype = bloodtype.charAt(0) + (bloodtype.charAt(1) === '1' ? '+' : '-');
  }

  connection.query('SELECT COUNT(id) AS count FROM donors', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    } else {
      console.log(result);
      countt = result[0].count;

      const query = `INSERT INTO donors VALUES (\"${countt+1}\", \"${name}\", \"${age}\", \"${phone}\", \"${email}\", \"${fetchBtype}\", \"${pin}\", \"${state}\", \"${address}\","")`;
      connection.query(query, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
          console.log(result);
          res.status(200).json({ success: true, message: 'Registration successful' });
        }
      });
    }
  });
});

app.listen(portNumber, () => {
  console.log(`Server is listening on port ${portNumber}`)
})
