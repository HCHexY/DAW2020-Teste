// Controlador para o modelo Batismo

var Batismo = require('../models/batismo')

// Devolve a lista de Batismos
module.exports.listar = () => {
    return Batismo
        .find()
        .exec()
}
module.exports.listarFiltered = (filter) => {
    return Batismo
        .find(filter)
        .exec()
}
module.exports.listarFilteredProject = (filter) => {
    return Batismo
        .find({},filter)
        .exec()
}
module.exports.stats = () => {
    return Batismo
    .aggregate(
        [
            {"$group":{_id:"$date","numTotal" :{"$sum":1}}}
        ]
    )   .exec()
}
