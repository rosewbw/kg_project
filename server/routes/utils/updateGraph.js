const request = require('request');
const config = require('config');

const REQUEST_URL = {
    'publish': config.get('graphServer') + '/publishLesson',
    'unPublish': config.get('graphServer') + '/unPublishLesson',
    'search':config.get('graphServer') + '/search',
};

const UpdateGraph = function (data, type, callback) {
    let option = {
        method: "POST",
        url: REQUEST_URL[type],
        json: true,
        body: data,
        header: {
            'Content-Type': "application/json"
        }
    };

    config.get('debug') && config.get('debugConfig').noGraphServer
        ? callback && callback()
        : request(option, function (err, res) {
            if (err) {
                return console.log(err);
            }
            if (res.body.status === 'success') {
                return callback && callback(res.body.result);
            }
        });

};
module.exports = UpdateGraph;