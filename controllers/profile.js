const handleProfile=(req, res,db) => {
  let { id } = req.params;
  // let found = false;
  db.select('*').where({id}).from('users').then(user=>{
      if (user.length) {
          return res.json(user[0])
      }else{
          return res.status(404).json('No Found')
      }
  }).catch(err=>{
      res.status(400).json('ERROR Gettng User')
  })
}

const handleProfileUpdate=(req, res,db) => {
    let { id } = req.params;
    let {name,age,pet}=req.body.formInput;
    db('users')
        .where({id})
        .update({name})
        .then(resp=>{
            if(resp){
                res.json('Suceess')
            }else{
                res.status(400).json('Unable to Update')
            }
        })
        .catch(err=>{res.status(400).json('Error Updating User')})
}

module.exports={
  handleProfile,
  handleProfileUpdate,
}