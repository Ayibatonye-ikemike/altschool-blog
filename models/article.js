const mongoose = require('mongoose');
const { readingTime } = require('../utils/utils')

const ArticleModel = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
         unique: true
    },

    desc : String,
    
    author: {
        type: String,
        required: true,
       
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    state: {
        type: String,
        default: 'draft', enum: ['draft', 'published']
    },

    read_Count: {
        type: Number,
        default: 0
    },

    readingTime: Number,
    
    tags: {
       type: [String ],
       default: [],
    }

})

// calculate reading time before saving document
ArticleModel.pre('save', function (next) {
    let article = this
  
    // do nothing if the article body is unchanged
    if (!article.isModified('body')) return next()
  
    // calculate the time in minutes
    const timeToRead = readingTime(this.body)
  
    article.readingTime = timeToRead
    next()
  })

  
ArticleModel.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v
    },
  })


module.exports = mongoose.model('Article', ArticleModel);