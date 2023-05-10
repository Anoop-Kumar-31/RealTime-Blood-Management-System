const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql')
const nodemailer = require('nodemailer');

let sendOtp=0

const app = express();
app.use(bodyParser.json());
const portNumber = 3001

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'RTBMS'
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
  connection.query(`Select * from Donors where Btype=\"${fetchBtype}\" and pincode between ${fetchpin - 10} and ${fetchpin + 10} ORDER BY pincode`, (err, result, fields) => {
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



//port in which it is running









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

// ==============================================================================
// const otpMap = new Map();

// app.post('/api/send-otp', (req, res) => {
//   const { phoneNumber } = req.body;

//   // Generate OTP
//   const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

//   // Save the OTP in memory
//   otpMap.set(phoneNumber, otp);

//   // Send OTP to the provided phone number (mocked for demonstration purposes)
//   // You would typically use an SMS service provider to send the OTP

//   // Simulate success response
//   res.sendStatus(200);
// });

// app.post('/api/verify-otp', (req, res) => {
//   const { phoneNumber, otp } = req.body;

//   // Retrieve the OTP from memory
//   const savedOtp = otpMap.get(phoneNumber);

//   if (savedOtp && savedOtp === otp) {
//     // OTP verification succeeded
//     // You may want to remove the OTP from memory after successful verification
//     otpMap.delete(phoneNumber);
//     res.sendStatus(200);
//   } else {
//     // OTP verification failed
//     res.sendStatus(401);
//   }
// });

const emailUsername = 'amt312002@gmail.com';
const emailPassword = 'kviwlgpkztmfreqa';
const emailService = 'www.gmail.com';

var smtpConfig = {
  host: 'smtp.gmail.com',
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
    subject: 'Your OTP',
    text: `Your OTP: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send OTP', error);
      return res.status(500).json({ error: 'Failed to send OTP' });
    }

    console.log('OTP sent:', info.response);
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

  // In a real-world scenario, you would compare the received OTP with the stored OTP in your database

  // Assuming the received OTP is valid for the sake of this example
  if (otp == sendOtp) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});



























app.listen(portNumber, () => {
  console.log(`Server is listening on port ${portNumber}`)
})
