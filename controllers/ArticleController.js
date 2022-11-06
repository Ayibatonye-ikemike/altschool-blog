const {ArticleModel} = require('../models')


exports.createArticle = ('/', async (req, res, next) => {
  
  
const newArticleCreated = {
    title: req.body.title,
    desc: req.body.desc,
    author: req.user._id,
    tags: req.body.tags,
    body: req.body.body,

}

  const newArticle = await ArticleModel.create(newArticleCreated);
  res.status(201).json({status: 'successful',
data: {
    ArticleModel: newArticle,
},

})
});


exports.getMyArticle = async(req, res) =>{
  const id = req.params.id 
  const info = req.body
  const userInfo = req.user
 
  const IdArticle = await ArticleModel.find({_id: id})
  IdArticle.read_Count++

  res.json({author: IdArticle.author, read_Count: IdArticle.read_Count, article: IdArticle})
}


     exports.deleteArticle = async (req, res) => {
       
      const id = req.params.id 
      const info = req.body 
      const userInfo = req.user

      let IdArticle = await ArticleModel.findByIdAndDelete(id, info)
      IdArticle = await ArticleModel.findById(id)

      res.status(200).json({status: 'successful' })
     }
     
      
    exports.updateArticle = async (req, res) => {
      const { id } = req.params;
      const { state } = req.body;
  
      const article = await ArticleModel.findById(id)
  
      if (!article) {
          return res.status(404).json({ status: false, article: null })
      }

      console.log(article)
  
      if (state == article.state) {
          return res.status(422).json({ status: false, article: null, message: 'Invalid operation' })
      }
  
      article.state = state;
  
      await article.save()
  
      return res.json({ status: true, article })
  }
  
  