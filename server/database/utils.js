import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSONStream from 'JSONStream';
import Data from '../models/Data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getLatestTimestamp() {
    try {
        // Read the latest timestamp from the file
        const latestTimestamp = fs.readFileSync(
            path.join(__dirname, 'latest-timestamp'),
            'utf8'
        );
        return latestTimestamp;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

function updateLatestTimestamp(timestamp) {
    try {
        // Read the latest timestamp from the file
        const latestTimestamp = getLatestTimestamp();

        // Check if the timestamp is newer than the latest timestamp in the file
        if (timestamp > latestTimestamp) {
            // Write the updated timestamp value to the file
            fs.writeFileSync(
                path.join(__dirname, 'latest-timestamp'),
                timestamp
            );
        }
    } catch (error) {
        console.error(error);
    }
}

function isFirstTime() {
    try {
        fs.accessSync(path.join(__dirname, 'data-migration-flag'));
        return false;
    } catch (err) {
        return true;
    }
}

// Migrate the data from the array to the database
async function migrateData(dataArray) {
    try {
        // Get latestTimestamp for which the data was synced to database
        let latestTimestamp = getLatestTimestamp();
        // Save each object in the array to the database
        dataArray.forEach((data) => {
            // Extract the timestamp and instances from the data
            const { timestamp, instances } = data;
            const timestampNumber = timestamp.$date.$numberLong;

            // Check if the timestamp is newer than the latest timestamp that has been processed
            if (timestampNumber > latestTimestamp) {
                console.log(data);
                // Update the latest timestamp
                latestTimestamp = timestampNumber;

                // Create a new Data object with the extracted data
                const newData = new Data({
                    timestamp: timestampNumber,
                    instances,
                });

                // Save the Data object to the database
                newData.save((saveErr) => {
                    if (saveErr) throw saveErr;
                    console.log('Data saved successfully');
                });
            }
        });
        // Save new latestTimestamp to file
        updateLatestTimestamp(latestTimestamp);
    } catch (err) {
        console.error(err);
    }
}

// Read the JSON file and parse its content
async function readJSONFile() {
    const stream = fs.createReadStream(
        path.join(__dirname, '..', '/data_sync/FilteredDataHuman')
    );
    const parser = JSONStream.parse('*');
    stream.pipe(parser);

    parser.on('data', (data) => {
        migrateData([data]);
    });
    parser.on('end', () => {
        // After the data migration process has completed, write a flag file to the filesystem
        console.log('Reached the end of the file');
        // TODO : Do we need it?
        // fs.writeFileSync(
        //     path.join(__dirname, 'data-migration-flag'),
        //     'Data migration complete'
        // );
    });
    parser.on('error', (error) => {
        console.error(error);
    });
}

export {
    updateLatestTimestamp,
    getLatestTimestamp,
    isFirstTime,
    migrateData,
    readJSONFile,
};
