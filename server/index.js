require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const aws = require('aws-sdk');
const path = require('path')

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

const authCtrl = require('./controllers/authController')
const vehiclesCtrl = require('./controllers/vehiclesController')
const modsCtrl = require('./controllers/modsController')
const picCtrl = require('./controllers/imagesController')

const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log('Database Connected')
    app.listen(SERVER_PORT, () => console.log(`Catch-a-riiiiiiiide!!!! on ${SERVER_PORT}`))
})
.catch(err => console.log(err))

app.get('/api/signs3', (req, res) => {
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    return res.send(returnData);
  });
});

//Auth
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/getuser', authCtrl.getUser)

//Vehicles
app.post('/api/getvehicles', vehiclesCtrl.getVehicles)
app.post('/api/addvehicle', vehiclesCtrl.addVehicle)
app.get('/api/readvehicle/:id', vehiclesCtrl.readVehicle)
app.put('/api/deletevehicle/:vehicle_id', vehiclesCtrl.deleteVehicle)

//Mods
app.get('/api/getmods/:id', modsCtrl.getMods)
app.post('/api/addmod', modsCtrl.addMod)
app.put('/api/editmod/:id', modsCtrl.editMod)
app.put('/api/deletemod/:mod_id', modsCtrl.deleteMod)

//Images
app.get('/api/getphotos/:id', picCtrl.getPhotos)

app.use(express.static(__dirname + '/../build'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})