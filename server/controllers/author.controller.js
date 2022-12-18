const Author = require('../models/authors.model')

module.exports.getOne = (req, res) => {
    Author.findOne({_id:req.params.id})
        .then(item => res.json(item))
        .catch(err => res.json(err));
}

module.exports.getAll = (req, res) => {
    Author.find({}).collation({locale:"en"}).sort({name:'ascending'}).exec(function(err, items) {
        if(err) {
            return res.json(err)
        } else {
            return res.json(items)
        }
    })
}

module.exports.updateOne = (req, res) => {
    Author.findByIdAndUpdate({ _id: req.params.id}, req.body, {runValidators:true})
    .then(item => res.json(item))
    .catch(err => res.json(err))
    }

module.exports.deleteOne = (req, res) => {
    Author.findByIdAndDelete({ _id: req.params.id})
    .then(item => res.json(item))
    .catch(err => res.json(err))
}

module.exports.createOne = (req, res) => {
    Author.create(req.body)
    .then((item) => res.json(item))
    .catch((err) => res.json(err))
}

module.exports.searchForText = (req, res) => {
    Author.find({ name: req.query.name }).setOptions({ sanitizeFilter: true })
        .then(item => res.json(item))
        .catch(err => res.json(err))
}