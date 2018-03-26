let request = require('request');
let UpdateGraph = function (data, type, callback) {
    let options = {
        graphType:type,
        data:data
    };
    let option = {
        method: "POST",
        url: 'http://localhost:5000/updateGraph',
        form: options,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(option, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            callback(data);
            console.log('update Success');
        }
    })

};
module.exports = UpdateGraph;