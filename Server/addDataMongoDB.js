const fs = require('fs');
const { MongoClient } = require('mongodb');
const csv = require('csv-parser');

async function processCsvData(filePath) {
  const results = [];
  const readStream = fs.createReadStream(filePath);

  readStream
    .on('error', (error) => {
      console.error(`Error reading file at ${filePath}:`, error);
    })
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      const client = new MongoClient('mongodb+srv://amt312002:ZeroToNine_0123456789@ak31.ptkvm4r.mongodb.net/?retryWrites=true&w=majority&appName=Ak31', { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        await client.connect();
        const database = client.db('RTBMSdatabase');
        const collection = database.collection('collection1');
        console.log(results);
        for (const row of results) {
          try {
            await collection.insertOne(row);
            console.log(`Record inserted: ${row['Name']}`);
          } catch (error) {
            console.error(`Error inserting row: ${row}`, error);
          }
        }
      } finally {
        await client.close();
      }
    });
}

async function main() {
  try {
    const csvFilePath = 'C:\\Users\\HP\\OneDrive\\Documents\\GitHub\\RealTime-Blood-Management-System\\Server\\form.csv'; // Update with your actual file path
    await processCsvData(csvFilePath);
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);