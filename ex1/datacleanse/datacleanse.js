fs = require('fs');

console.log("INIT")
var batismos =JSON.parse(fs.readFileSync("../../batismos.json"));
batismos.forEach(element => {

    element._id= element.ref.split(/\//).join("_")

    var pais = element.title.split(';');
    console.log(pais);
    var maet= pais[pais.length-1].split(':');
    var pait= pais[pais.length-2].split(':');

    
    element.mae=maet[maet.length-1];
    element.pai=pait[pait.length-1];
    
});

fs.writeFileSync("../batismosready.json",JSON.stringify(batismos));
console.log('Done')