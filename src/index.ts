import express from 'express';
const app = express();

app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('app'));

let listenPort = process.env.PORT || 3000;

app.listen(listenPort, () => {
    console.log('Express server running at port: ' + listenPort)
});
app.get('/', function (req, res) {
    res.send('Hello World!')
})
