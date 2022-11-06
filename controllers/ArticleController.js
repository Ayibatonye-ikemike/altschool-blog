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
    //const body = request.body

  //const user = await ArticleModel.findById(body.userId)

  //const article = new article({
    //title: body.title,
    //date: new Date(),
    //author: user._id

  //})

})


exports.getMyArticle = async(req, res) =>{
  const id = req.params.id 
  const info = req.body
  const userInfo = req.user
 
  const IdArticle = await ArticleModel.find({_id: id})
  IdArticle.read_Count++

  res.json({author: IdArticle.author, read_Count: IdArticle.read_Count, article: IdArticle})
}


// exports.getMyArticle = ('/', async (req, res, next) => {
//     const articles = await ArticleModel
//     .findOne({
//     _id: req.params.id,
//     state: 'published',
// }).populate('articles', { author: 1, name: 1 });

// if(!articles) return next(new Error('post not found', 404));

// articles.read_Count++;

// await articles.save();
//   res.status(200).json({
//     status: 'succesful',
//     data: {
//         articles,
//     },
//   });


 // });


// exports.getMyArticles = async (req, res, next) => {
//    try {
//     const articles = await ArticleModel
//     .find({state: 'published'})
//     .select({title: 2})
//     .populate('author', {username:1})

//     return res.json({
//       status: true,
//       data: articles
//     })
//    } catch (err) {
//     err.source = 'get published blog authcontroller'
//     next(err)
//    }
// }


//exports.updateArticle = ('/', async (req, res, next) =>{
     
    //  const { ArticleId } = req.params

    //  const article = await ArticleModel.findById(ArticleId);

    //  if(!article) return next(new Error('post not found', 404));

    //  if(req.user.id !==article.author.id)
      
    //  return next(new Error('user not authorised to update this post', 401))

    //  article.state = "published"

    //  const updateArticle = await article.save();

    //  if(!updateArticle) return next(new Error('post not updated', 401));
     
    
    // res.status(200).json({status: 'successful',
    // data: {updateArticle}})
    // })
    
    // exports.updateArticle = async (req, res) => {
    //   const id = req.params.id
    //   const info = req.body
    //   const userInfo = req.user

    //   let IdArticle = await ArticleModel.findByIdAndUpdate(id, info)
    //   IdArticle = await ArticleModel.findById(id)

    //   res.send(IdArticle)

    // }



     exports.deleteArticle = async (req, res) => {
       
      const id = req.params.id 
      const info = req.body 
      const userInfo = req.user

      let IdArticle = await ArticleModel.findByIdAndDelete(id, info)
      IdArticle = await ArticleModel.findById(id)

      res.status(200).json({status: 'successful' })
     }
     
    // exports.deleteArticle = (async (req, res, next) => {

    //   const article = await ArticleModel.findByIdAndDelete({id: req.params.id});
    //   if(!article) return next(new Error('post not found', 404));

    //   if(req.user.id !==article.author.id)

    //   return next(new Error('You are not authorised to delete this post', 401));

    //   const deleteArticle = await ArticleModel.findByIdAndDelete(req.params.id)

    //   if(!deleteArticle) return next(new Error('Article not deleted', 401));
    //   res.status(204).json({
    //     status: "successful",
    //     data: "null",
    //   })

    // });

  
      
    exports.updateArticle = async (req, res) => {
      const { id } = req.params;
      const { state } = req.body;
  
      const article = await ArticleModel.findById(id)
  
      if (!article) {
          return res.status(404).json({ status: false, article: null })
      }
  
      if (state !== article.state) {
          return res.status(422).json({ status: false, article: null, message: 'Invalid operation' })
      }
  
      article.state = state;
  
      await article.save()
  
      return res.json({ status: true, article })
  }
  
  