class User{
    get(req,res){
        return res.json('Xin chao ' + req.query.word);
    }
    post(req,res){
        return res.json('Tam biet');
    }
}

module.exports = new User();