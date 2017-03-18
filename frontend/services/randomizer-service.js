'use strict';

class Randomizer {

    constructor(){

    }

    static getRandomInteger(min,max){

        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;

    }

}
