const mongoose = require('mongoose');
mongoose.set("useFindAndModify", false)
const Model = require('../../models/Jobs')
const appliedJobs = require('../../models/appliedJobs')

exports.list = (req, res, next) => {
    try {

        let query = {};
        if (req.query.search) {
            query["jobTitle"] = { "$regex": req.query.search, $options: "i" };
        }
        Model.find(query).sort({createdAt: -1}).then((result) => {
            res.send({ "message": "Success", data: result })
        })

    } catch (err) {
        res.send({ message: "Error", Error: err });
    }
};


exports.authList = (req, res, next) => {
    try {
        appliedJobs.find({ userId: req.user.user_id }).then((result) => {
            let userJobs = result.map(ele => ele.jobId.toString());
            let query = {};
            if (req.query.search) {
                query["jobTitle"] = { "$regex": req.query.search, $options: "i" };
            }
            let output=[];
            Model.find(query).lean().then((jobResult) => {
                let checkResult=jobResult;
                checkResult.forEach(element => {
                    element.applied=false;
                    if(userJobs.indexOf(element._id.toString())>-1){
                        element.applied=true;
                    }
                    output.push(element);
                });
                res.send({ "message": "Success", data: output })
            })
        })



    } catch (err) {
        res.send({ message: "Error", Error: err });
    }
};
