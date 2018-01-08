module.exports = function(app, passport) {

    // route for home page
    var appDetail=require("../package.json"),
    appName=appDetail.name.replace(/-/g," ");
    app.get('/polls', function(req, res,next) {
        var getter=require("./getpolls.js");
        getter.getAll(req,res,next);
    });
    app.get('/getmypolls', isLoggedIn2,function(req, res,next) {
        var getter=require("./getmypolls.js");
        getter.getAll(req,res,next);
    });
    app.get('/pollDetail/:string', function(req, res,next) {
        var pollGetter=require("./getpoll.js");
        pollGetter.getById(req,res,next);
    });
    app.post('/removepoll/:string',isLoggedIn2, function(req, res,next) {
        var pollRemover=require("./deletepoll.js");
        pollRemover.deleteById(req,res,next);
    });
    app.get('/getvotes/:string', function(req, res,next) {
        var votesGetter=require("./getvotes.js");
        votesGetter.getById(req,res,next);
    });
    app.post('/insertpoll',isLoggedIn2, function(req, res,next) {
        var inserter=require("./insertpoll.js");
        inserter.insertNew(req,res,next);
    });
    app.post('/insertvote', function(req, res,next) {
        var insertVote=require("./insertvote.js");
        insertVote.insertNew(req,res,next);
    });
    app.post('/insertoption',isLoggedIn2, function(req, res,next) {
      var optionInserter=require("./insertoption.js");
      optionInserter.insertNew(req,res,next);
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/checklogged',isLoggedIn2, function(req, res) {
      res.end('1');
    });

    // facebook routes
    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/login/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/login/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/'
            }));

    app.get('*', function(req, res) {
        res.render('index.ejs',{
            logged:req.isAuthenticated(),
            appName:appName
        }); // load the index.ejs file
    });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
function isLoggedIn2(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).json("Not logged in");
}
