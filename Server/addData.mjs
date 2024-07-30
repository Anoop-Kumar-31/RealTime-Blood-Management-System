////for vercel db
// import { db } from '@vercel/postgres';
// import csv from 'csv-parser';
// import fs from 'fs';
// import dotenv from 'dotenv';

// // Load environment variables from .env.local file
// dotenv.config({ path: '.env.local' });

// // Ensure the connection string is loaded correctly
// const connectionString = process.env.POSTGRES_URL;
// console.log('Connection String:', connectionString); // This should print your connection string

// if (!connectionString) {
//   throw new Error('POSTGRES_URL not set in environment variables');
// }

// // Function to connect to the database and run queries
// async function main() {
//   // Drop the table if it already exists (optional)
//   await db.query('DROP TABLE IF EXISTS donors');

//   // Create the donors table with appropriate data types
//   await db.query(`
//     CREATE TABLE donors (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       age VARCHAR(3),
//       phone VARCHAR(15) UNIQUE NOT NULL,
//       email VARCHAR(50),
//       blood_group VARCHAR(5),
//       pincode INTEGER,
//       state VARCHAR(50),
//       address VARCHAR(100),
//       day_free VARCHAR(500)
//     );
//   `);

//   console.log('Donors table created successfully!');

//   // Function to process CSV data and insert into the database
//   async function processCsvData(filePath) {
//     const csvStream = fs.createReadStream(filePath).pipe(csv());
//     console.log('Processing CSV data...');
//     let count=1;
//     for await (const row of csvStream) {
//       console.log(row);
//       // Check if "Yes" is present in the "Day Free" column and phone number is not empty
//       if (true) {
//         try {
//           // Use parameterized query to prevent SQL injection

//           // console.log(count,row['Name'], row['Age'], row['PhoneNumber'], row['Username'], row['Blood Group'], row['Pincode'], row['State'], row['Address'], row['Available days']);

//           await db.query(`
//             INSERT INTO donors (id, name, age, phone, email, blood_group, pincode, state, address, day_free)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//           `, [count,row['Name'], row['Age'], row['PhoneNumber'], row['Username'], row['Blood Group'], row['Pincode'], row['State'], row['Address'], row['Available days']]);
//           count++;
//           console.log(`Record inserted: ${row['Name']}`);
//         } catch (error) {
//           console.error(`Error inserting row: ${row}`, error);
//         }
//       }
//     }
//   }

//   // Specify the path to your CSV file
//   const csvFilePath = 'C:/Users/HP/Downloads/form.csv'; // Replace with your actual file path

//   // Process the CSV data
//   await processCsvData(csvFilePath);

//   // Retrieve and display all records from the donors table
//   const result = await db.query('SELECT * FROM donors ORDER BY id');
//   console.log('Donors data:');
//   console.table(result.rows);
// }

// // Run the main function
// main().catch(console.error);



////for render db
import csv from 'csv-parser';
import fs from 'fs';
import dotenv from 'dotenv';
import pg from 'pg'; // Use require() for CommonJS modules
const { Client } = pg; // Destructure Client from the default export

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

// Ensure the connection string is loaded correctly
const connectionString = "postgresql://anoop:IRftr19sqPs1EmzVMvI28tLlmdulQMYO@dpg-cqjt71tds78s73f4o16g-a.oregon-postgres.render.com/rdbms_e5ra?sslmode=no-verify";
console.log('Connectionstring:', connectionString); // This should print your connection string

if (!connectionString) {
  throw new Error('POSTGRES_URL not set in environment variables');
}

// Function to connect to the database and run queries
async function main() {
  const client = new Client({
    connectionString,
  });

  try{
    await client.connect();
  }catch(err){
    console.error('Connection error',err);
  }

  // Drop the table if it already exists (optional)
  await client.query('DROP TABLE IF EXISTS donors');

  // Create the donors table with appropriate data types
  await client.query(`
    CREATE TABLE donors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age VARCHAR(3),
      phone VARCHAR(15) UNIQUE NOT NULL,
      email VARCHAR(50),
      blood_group VARCHAR(5),
      pincode INTEGER,
      state VARCHAR(50),
      address VARCHAR(100),
      day_free VARCHAR(500)
    );
  `);

  console.log('Donors table created successfully!');

  // Function to process CSV data and insert into the database
  async function processCsvData(filePath) {
    const csvStream = fs.createReadStream(filePath).pipe(csv());
    console.log('Processing CSV data...');
    let count=1;
    for await (const row of csvStream) {
      console.log(row);
      // Check if "Yes" is present in the "Day Free" column and phone number is not empty
      if (row['Intrested'] == "Yes") {
        try {
          // Use parameterized query to prevent SQL injection

          // console.log(count,row['Name'], row['Age'], row['PhoneNumber'], row['Username'], row['Blood Group'], row['Pincode'], row['State'], row['Address'], row['Available days']);

          await client.query(`
            INSERT INTO donors (id, name, age, phone, email, blood_group, pincode, state, address, day_free)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          `, [count,row['Name'], row['Age'], row['PhoneNumber'], row['Username'], row['Blood Group'], row['Pincode'], row['State'], row['Address'], row['Available']]);
          count++;
          console.log(`Record inserted: ${row['Name']}`);
        } catch (error) {
          console.error(`Error inserting row: ${row}`, error);
        }
      }
    }
  }

  // Specify the path to your CSV file
  const csvFilePath = 'form.csv'; // Replace with your actual file path

  // Process the CSV data
  await processCsvData(csvFilePath);

  // Retrieve and display all records from the donors table
  const result = await client.query('SELECT * FROM donors ORDER BY id');
  console.log('Donors data:');
  console.table(result.rows);

  await client.end();
}
main();
