'use strict';

class AppCard extends Component {

    constructor(options) {
        super(options);
        this._render();
        this._words = null; // Объект со словами загруженными с сервера
    }


    _render() {

    }

    loadWords(){

        let xhr = new XMLHttpRequest();

        xhr.open('GET','../data/words.json',true);

        xhr.onload = () => {
            let data = JSON.parse(xhr.responseText);
            this._words = data;
        }

        xhr.onerror = () => {
            console.log(new Error(xhr.status + ' ' + xhr.statusText));
        }

        xhr.send();

    }

    formSetToTrain(settings) {

        // если по какой-то причине слова не получены с сервера то не продолжаем
        if (!this._words) return;

        let chosenLevels = settings.levels;
        let chosenTences = settings.tences;
        let rusFrequency = settings.rusFrequency;

        let tences = ['Present Simple', 'Past Simple', 'Future Simple','Present Perfect', 'Present Continues', 'Past Continues','Future Continues','Present Perfect Continues','Past Perfect','Past Perfect Continues','Future Perfect','Future Perfect Continues'];
        let sentenceTypes = ['Positive', 'Negative', 'Question'];

        let wordsToChooseOf = [];

        // из объекта со словами сделаем массив со словами, так как с числовыми индексами работать удобнее, но
        // сразу отберем только те слова, которые подъодят под выбранные левелы
        for (let wordObj in this._words) {

            if (chosenLevels.indexOf(+this._words[wordObj].level) !== -1){

                let randomNumber = Math.random();

                let toShow = (randomNumber > rusFrequency) ? wordObj : this._words[wordObj].ru;
                let translation = (randomNumber > rusFrequency) ? this._words[wordObj].ru : wordObj;

                let obj = {
                    'toShow' : toShow,
                    'translation' : translation
                };
                wordsToChooseOf.push(obj);
            }
        }

        // случайные слова, которые в конце вращения слот машины отобразятся пользователю
        let chosenWords = Randomizer.getArrayOfRandomElements(wordsToChooseOf,3);
        // случайные слова для вращения в слот машине, перед тем как выпадет нужное
        let wordsForSlots = Randomizer.getArrayOfRandomElements(wordsToChooseOf,50);
        // случайное время, которые в конце вращения слот машины отобразятся пользователю
        let tence = Randomizer.getRandomElementFromArray(chosenTences);
        // случайный тип предложения, который в конце вращения слот машины отобразится пользователю
        let sentenceType = Randomizer.getRandomElementFromArray(sentenceTypes);

        return {
            'chosenWords' : chosenWords,
            'wordsForSlotMachine' : wordsForSlots,
            'tence' : tence,
            'tencesForSlot' : tences,
            'sentenceType' : sentenceType,
            'sentenceTypes' : sentenceTypes
        };

    }


}