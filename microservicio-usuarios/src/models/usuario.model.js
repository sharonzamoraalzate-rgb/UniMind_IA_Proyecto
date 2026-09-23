let usuarios = [];
let idCounter = 1;

module.exports = { usuarios, idCounter, incrementarId: () => idCounter++ };