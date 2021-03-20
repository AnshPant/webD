//jshint esversion:6


var superheroes = require("superheroes");
var supervillain = require("supervillains");

var mySuperheroName = superheroes.random();
var mySuperVillainsName = supervillain.random();

console.log(mySuperheroName);
console.log(mySuperVillainsName);