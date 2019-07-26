const Mock = require('mockjs');
const util = require('./util');

// body for post
// query for get

module.exports = {
    // APIs
    'GET /api/check': function (req, res) {                 // with url param ?username=xxx
        if (req.query.username == "admin" || req.query.username == "user") {
            res.send({
                error: 1,
                errmsg: "用户名已被占用 !",
            });
        } else {
            res.send({
                error: 0,
                errmsg: "",
            }); 
        }
    },

    'GET /api/taglist': function (req, res) {                 // with url param ?text=xxx
        var rand = Math.random();
        if (rand > 0.5) {
            var json = util.getJsonFile('./wordsuggest.json');
        } else {
            var json = {error: 0, errmsg:"", data: []};
        }
        setTimeout( () => {
            res.json(json);
        }, rand * 1000);
    },

    // Register
    'POST /user/register': function (req, res) {             // json post:
                                                             // {"username":"username","password":"password","confirm":"password","name":"name","prefix":"86","phone":"1234567890","captcha":"114514"}
        if (req.body.captcha != "114514") {
            res.send({
                error: 1,
                errmsg: "验证码错误 !",
            });
        } else {
            res.send({
                error: 0,
                errmsg: "",
            }); 
        }
    },

    // Login
    'POST /login': function (req, res) {                // urlencode post: username=...&password=...
        var rand = Math.random();
        if (req.body.username == "admin" && req.body.password == "admin") {
            // res.cookie('username', 'admin');
            res.send({
                error: 0,
                errmsg: "",
            });
            return;
        } else if (req.body.username == "user" && req.body.password == "user") {
            // res.cookie('username', 'user');
            res.send({
                error: 0,
                errmsg: "",
            });
            return;
        } else
            res.send({
                error: 404,
                errmsg: "用户名或密码错误 !",
            });
    },

    'POST /logout': function (req, res) {
        res.send({
            error: 0,
            errmsg: "",
        });
    },

    // User Info
    'GET /user/info': function (req, res) {
        res.send(Mock.mock({
            "error": 0,
            "errmsg": "",
            "data":{
                "userid": "@id()",
                "userType": 0,
                "username": "user",
                "name": "@cname()",
                "telephone": "13800138000"
            }
        }));
    },


    // Job
    'GET /user/job': function (req, res) {
        res.send(Mock.mock({
            "error": 0,
            "errmsg": "",
            "data": {                                      // or null
                "id": 1, "name": "产品经理", "score": 95
            }
        }));
    },

    'POST /user/job': function (req, res) {                    // json post: {id:..., name:...}
        res.send(Mock.mock({
            "error": 0,
            "errmsg": ""
        }));
    },

    'GET /user/joblist': function (req, res) {
        res.send({
            "error":0,
            "errmsg": "",
            "data": [
                {"id": 1, "name": "产品经理", "score": 95},
                {"id": 6, "name": "UI 设计师", "score": 84},
                {"id": 2, "name": "Java 工程师", "score": 67},
                {"id": 4, "name": "大数据工程师", "score": 21},
                {"id": 7, "name": "算法工程师", "score": 5}
            ]
        });
    },

    // Tags
    'GET /user/tags': function (teq, res) {
        res.send({
            error: 0,
            errmsg: "",
            data: [
                {"id": 34, "name": "PPT", "level": 5},
                {"id": 10, "name": "UI", "level": 4},
                {"id": 75, "name": "MindManager", "level": 3},
                {"id": 15, "name": "墨刀", "level": 2},
                {"id": 12, "name": "思维能力", "level": 1}
            ]
        }); 
    },

    'POST /user/tags': function (req, res) {                    // json post: {id: level, ...}
        res.send({
            error: 0,
            errmsg: "",
        }); 
    },

    // Analysis
    'GET /analysis/jobs': function (req, res) {
        res.send({
            "error":0,
            "errmsg": "",
            "data": [
                {"id": 1, "name": "产品经理", "score": 95},
                {"id": 6, "name": "UI 设计师", "score": 84},
                {"id": 2, "name": "Java 工程师", "score": 67},
                {"id": 4, "name": "大数据工程师", "score": 21},
                {"id": 7, "name": "算法工程师", "score": 5}
            ]
        });
    },

    'GET /analysis/tags': function (req, res) {             // with url param ?job=jobid
        res.send({
            "error": 0,
            "errmsg": "",
            "data": [                                       // sorted by expected
                {"id": 34, "name": "PPT", "level": 5, "expected": 99},
                {"id": 10, "name": "UI", "level": 4, "expected": 75},
                {"id": 75, "name": "MindManager", "level": 0, "expected": 34},
                {"id": 12, "name": "思维能力", "level": 1, "expected": 23},
                {"id": 15, "name": "墨刀", "level": 2, "expected": 12},
            ]
        });
    },


}
