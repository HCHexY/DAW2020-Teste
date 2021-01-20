var express = require('express');
var router = express.Router();
var Batismo = require('../controllers/batismo');
var mongoose = require('mongoose');
const e = require('express');


router.get('/batisado', function(req, res, next) {

  Batismo.listarFilteredProject({title :1})
  .then(data=>{
    var newData=[];
    data.forEach(element => {
     newData.push({nome :element.title.split(':')[1].split('.')[0]});
    });
    res.status(200).jsonp(newData.sort((n1,n2)=>(n1.nome==n2.nome)? 0 :((n1.nome>n2.nome)? 1 : -1) ));
    //console.log(data);
  })
    .catch(e=>res.jsonp({error: e})); 
})

router.get('/progenitores', function(req, res, next) {

  Batismo.listarFilteredProject({ref:1,mae:1,pai:1})
  .then(data=>{
    var nData=[];
    data.forEach(e=>{
      e.id= e.ref.split('/').join('_')
      delete e.ref;
      nData.push({id: e.ref.split('/').join('_'),mae:e.mae,pai:e.pai});
    })
    res.status(200).jsonp(nData);
    //console.log(data);
  })
    .catch(e=>res.jsonp({error: e})); 
})

router.get('/stats', function(req, res, next) {

  Batismo.stats()
  .then(data=>{
    res.status(200).jsonp(data);
    //console.log(data);
  })
    .catch(e=>res.jsonp({error: e})); 
})

router.get('/:id', function(req, res, next) {
  //console.log(qs)
  //PT_ABM_PCML02_001_00007_000003
  Batismo.listarFiltered({ref:req.params.id.split('_').join('/')})
  .then(data=>{
    res.status(200).jsonp(data);
    //console.log(data);
  })
    .catch(e=>res.jsonp({error: e})); 
})

router.get('/', function(req, res, next) {
  qs= req.query;
  console.log(qs)
  if(!qs.ano){
  Batismo.listarFilteredProject({_id:1,date:1,title:1,ref:1})
  .then(data=>res.status(200).jsonp(data))
    .catch(e=>res.jsonp({error: e})); 
  }
  else{
    if(qs.ano){
      var ano = qs.ano;
      //{date :{ "$regex": "1862", "$options": "i" }}
      Batismo.listarFiltered({date :{ "$regex": ano, "$options": "i" }})
      .then(data=>res.jsonp(data))
      .catch(e=>res.jsonp({error: e}));
    }
    }
});

module.exports = router;
