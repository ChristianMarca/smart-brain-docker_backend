

const handleRegister=(req,res,db,bcrypt) => {
  let { email, name, password } = req.body;
  if(!email || !name || !password){
    return res.status(400).json('Incorrecto Form Submition')
  }
  bcrypt.hash(password, 10, function(err, hash) {
      if(err){
          console.log('Falied')
      }
      else{
          db.transaction(trx=>{
              trx.insert({
                  hash,
                  email
              })
              .into('login')
              .returning('email')
              .then(loginEmail=>{
                  console.log(loginEmail)
                  return trx('users')
                  .returning('*')
                  .insert({
                      email: loginEmail[0],
                      name,
                      joined: new Date()
                  })
                  .then(user=>{
                      res.json(user[0])
                  })
              })
              .then(trx.commit)//continua con la operacion
              .catch(trx.rollback)//Si no es posible elimna el proces0
          }).catch(err=> res.status(400).json('unable to register'))
      }
  });
  //Transacciones on importantes
  
}

module.exports={
  handleRegister,
};