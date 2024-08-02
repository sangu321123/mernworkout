const mongoose=require('mongoose');
//bcrypt-hashing fn that hash our pwd in a secure way
const bcrypt=require('bcrypt');
const validator=require('validator');
const Schema=mongoose.Schema;
const userSchema=new Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
});

//static signup method like fineone ,find
//since we are using this arrow fn can't be used
userSchema.statics.signup=async  function(email,password){

  //validation
  if(!email||!password){
    throw Error('All fields must be filled');
  };
  if(!validator.isEmail(email)){
    throw Error('Email i not valid');
  };
  if(!validator.isStrongPassword(password)){
    throw Error('Password not strong enough');
  };
  const exists=await this.findOne({email});
  if (exists){
    throw Error('Email already in use')
  }
  const salt=await bcrypt.genSalt(10);//no of rounds//additional letters for the pwd
  const hash=await bcrypt.hash(password,salt);
  const user=await this.create({email,password:hash});//creates a document
  return user;
};
//static login method
userSchema.statics.login=async function(email,password){
  if(!email||!password){
    throw Error('All fields must be filled');
  };
  const user=await this.findOne({email});
  if (!user){
    throw Error('Incorrect email');
  };
  const match=await bcrypt.compare(password,user.password);
  if(!match){
    throw Error('Incorrect password');
  };
  return user;
}
module.exports=mongoose.model('User',userSchema);