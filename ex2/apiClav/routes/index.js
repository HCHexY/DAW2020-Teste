const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
var tokenGetter = require("../app");


/* GET cod classe */
router.get('/classe/:id', function(req, res, next) {
axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id+"?token="+tokenGetter.getToken().token)
.then(data=>{
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id+"/descendencia?token="+tokenGetter.getToken().token)
  .then(desc=>{
    axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id+"/procRel?token="+tokenGetter.getToken().token)
    .then(rel=>{
      
      res.render('pagclass',{classe :data.data, desc : desc.data});
    })
    .catch(e=>res.render('error',{error:e}))
    
  })
  .catch(e=>res.render('error',{error:e}))
})
.catch(e=>res.render('error',{error:e}))

});

/* GET home page. */

router.get('/termosIndice', function(req, res, next) {
axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token="+tokenGetter.getToken().token)
.then(data=>{
  res.render('termos',{lista :data.data});
})
.catch(e=>res.render('error',{error:e}))
});
router.get('/classes', function(req, res, next) {
axios.get("http://clav-api.di.uminho.pt/v2/classes?token="+tokenGetter.getToken().token)
.then(data=>{
  res.render('classes',{lista :data.data});
})
.catch(e=>res.render('error',{error:e}))
});


router.get('/', function(req, res, next) {
  res.render('index');

});
module.exports = router;
