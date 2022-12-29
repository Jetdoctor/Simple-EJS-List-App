const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs')

const items = ["Buy Games", "Install Games", "Play Games"]
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', function (req, res) {

    const day = date.getDate()

    res.render('list', { listTitle: day, newlistItems: items })
});

app.post('/', function (req, res) {

    const item = req.body.newItem

    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")
    }

    console.log(req.body.list);

});

app.get("/work", function (req, res) {

    res.render("list", { listTitle: "Work List", newlistItems: workItems })

});

app.listen(3000, function () {
    console.log('server started on port 3000');
});