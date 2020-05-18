const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const raccoon = require('raccoon');


app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json({ extended: true, limit: '30mb' }));


app.get("/", async(req, res, next) => {
    res.sendFile(`${__dirname}/public/client.js`);
})
app.post("/", async(req, res, next) => {
    try{
        var { userId, itemId } = req.body;
        if(itemId || itemId!='null'){
            raccoon.liked(userId, itemId).then(() => {
                raccoon.recommendFor(userId, 5)
                    .then((recs) => {
                        console.log(recs);
                        return res.send(recs);
                    })
            })
        } else {
            raccoon.recommendFor(userId, 5)
                .then((recs) => {
                    console.log(recs);
                    return res.send(recs);
                })
        }
    } catch(err){
        return res.send([]);
    }
})

app.get("/test", async(req, res, next) => {
    res.render('test/index');
})


app.listen(80, () => {
    console.log(`오피스넥스 추천 서비스 가동`);
})