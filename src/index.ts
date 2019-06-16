import express from 'express';
const app = express();

app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('app'));
app.listen(3000, () => {
    console.log('Express server running at http://127.0.0.1:3000')
});
app.get('/', function (req, res) {
    res.send('Hello World!')
})
