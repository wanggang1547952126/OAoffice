exports.getUser = function(req,res){
    res.send(req.session.user);
}