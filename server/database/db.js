import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { isFirstTime, readJSONFile } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

mongoose.set('strictQuery', false);

// Wrap the code in an async function
async function connectDb() {
    try {
        const client = await mongoose.connect(
            process.env.DATABASE_CONNECTION_URL,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log(`Connected to MongoDB @ ${client.connection.host}`);
        // Perform operations on the connection here
        if (isFirstTime()) {
            // Run the data migration process
            console.log('Running data migration for the first time...');
            readJSONFile();
        } else {
            console.log('Data migration has already been run, skipping...');
        }
        // Set up a fs.watch listener on the JSON file
        fs.watch(
            path.join(__dirname, '..', '/data_sync/FilteredDataHuman'),
            (eventType, filename) => {
                if (
                    eventType === 'change' &&
                    filename === 'FilteredDataHuman'
                ) {
                    console.log('Changes detected in Sync Data');
                    readJSONFile();
                }
            }
        );
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

connectDb();
