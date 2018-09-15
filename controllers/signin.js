const handleSignin=(db,bcrypt) =>(req, res)=> {
  const{password,email}=req.body;
  db.select('email','hash').from('login')
  .where('email','=',req.body.email)
  .then(data=>{
      return bcrypt.compare(password, data[0].hash, function(err, resp) {
          if(err){
             return res.status(400).json('ERROR Signing')
          }  
          if (resp){
              return db.select('*').from('users')
              .where('email','=',email)
              . then(user=>{
                  res.json(user[0])
              }).catch(err=>{
                  res.status(400).json('Unable to get user')
              })
          }
          else{
              return res.json('Fail')
          }
      })
  }).catch(err=>res.status(400).json('Wrong Credentiales'))

}

module.exports={
  handleSignin,
};