'use strict';

class Randomizer {

    constructor(){

    }

    static getRandomInteger(min,max){

        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;

    }

    static getArrayOfRandomElements(arr,quantity){

        // скопируем в новый массив, чтобы не менять изначальный
        let copiedArr = arr.slice();

        if (copiedArr.length <= quantity) return copiedArr;

        let newArr = [];

        // выберем quantity случайных элемента массива
        for (let i = 0; i < quantity; i++) {
            let randNum = Randomizer.getRandomInteger(0,copiedArr.length - 1);
            // вырежем из массива выбранный случайный элемент, чтобы больше его не выбирать
            let randElement = copiedArr.splice(randNum,1)[0];
            newArr.push(randElement);
        }

        return newArr;
    }

    static getRandomElementFromArray(arr){
        return Randomizer.getArrayOfRandomElements(arr,1)[0];
    }


}
