const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const article = require('./article');

const Schema = mongoose.Schema;

const UserModel = new Schema({

  firstname: { type: String,
     required: true
     },
  
  lastname: { type: String,
     required: true
     },
  
  email: { type: String,
     required: true,
      unique: true 
    },
  
  password: { type: String,
     required: true 
    },

    article: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      }
    ],
  })
  
  UserModel.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.password
    },

});

// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
// UserModel.pre(
//   'save',
//   async function (next) {
//       const user = this;
        
//         const hash = await bcrypt.hash(this.password, 10);

//         this.password = hash;

//       // if the password is modified do something

//       if (user.isModified('password'))
//       { const hash =await bcrypt.hash(user.password, 10)
//         user.password = hash
//       }
//       next();
//   }
// );

// // You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
// UserModel.methods.isValidPassword = async function(password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);

//   return compare;
// }
UserModel.pre('save', function(next) {
  const user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

  // hash the password using our new salt
  bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
  });
});


UserModel.methods.isValidPassword = function(password){ 
 
  const passwordHash = this.password 
  return new Promise((resolve,reject) => { 
  bcrypt.compare(password,passwordHash,(err,same)=>{ 
  if(err){ 
  return reject(err) 
  } 
  resolve(same) 
  })
 })
 }

const User = mongoose.model('User', UserModel);

module.exports = User;
