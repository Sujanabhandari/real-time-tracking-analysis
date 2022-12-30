# Sentics Fullstack Test Case

For this project, there is server/data_sync where FilteredDataHuman file will be placed.
As soon as the server starts then it will check if the data has already been synced or not.
It is checked by latest timestamp that was put to database.

For react part I couldn't complete all functionality as I could only manage

- to sync data to db in real time
- to listen any changes to file and sync to db
- docker-compose to run all of them and debug as well
- basic layout

But as I have already submitted react part previously, you already have idea about it.
If you provide me more time then I could finish client part and re-sumbit as well.

## Initial Setup

- Create server/data_sync directory
- Add FilteredDataHuman named json file. This file will be synced to database real-time.
- Place your file there.
- Go to server and clients and do `npm install`.
- Use mongodb compass or similar to connect to the mongodb service using url `mongodb://localhost:27017`

## Start server

- `docker-compose up --build web mongodb client` will start all necessary containers.
- You can also use debug_client and debug services to debug instead.
