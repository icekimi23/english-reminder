'use strict';

class AppCard extends Component {

    constructor(options) {
        super(options);
        this._render();
        this._words = null; // Объект со словами загруженными с сервера
        //this._el.addEventListener('click', this._onStartButtonClick.bind(this));
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
        let chosenSentTypes = settings.sentenceTypes;
        let rusFrequency = settings.rusFrequency;

        let tences = ['Present Simple', 'Past Simple', 'Future Simple','Present Perfect', 'Present Continues', 'Past Continues'];


        let words = [];

        // из объекта со словами сделаем массив со словами, так как с числовыми индексами работать удобнее
        for (let wordObj in this._words) {

            let obj = {
                en : wordObj,
                ru : this._words[wordObj].ru,
                level : +this._words[wordObj].level
            };
            words.push(obj);

        }

        // выбираем слова только из выбранных в настройках левелов
        /*let wordsToChooseOf = words.filter((word) => {
            return chosenLevels.indexOf(word.level) !== -1;
        });*/

        // импользуем map и возвращаем не объект, а значение, английской или русское в зависимости от параметра rusFrequency
        let wordsToChooseOf = words.map((word) => {
             if (chosenLevels.indexOf(word.level) !== -1) {
                 return (Math.random() > rusFrequency) ? word.en : word.ru;
             }
        });

        // выбираем времена только из выбранных в настройках времен
        let tencesToChooseOf = tences.filter((tence) => {
            return chosenTences.indexOf(tence) !== -1;
        });

        // случайные слова, которые в конце вращения слот машины отобразятся пользователю
        let chosenWords = Randomizer.getArrayOfRandomElements(wordsToChooseOf,3);

        // случайные слова для вращения в слот машине, перед тем как выпадет нужное
        let wordsForSlots = Randomizer.getArrayOfRandomElements(wordsToChooseOf,50);
        let tence = Randomizer.getRandomElementFromArray(tencesToChooseOf);

        return {
            'chosenWords' : chosenWords,
            'wordsForSlotMachine' : wordsForSlots,
            'tence' : tence
        }

        /*let str = 'words : ';

        chosenWords.forEach((item) => {
            str += item.en + ', ';
        });

        alert(str + "tence : " + tence);*/

    }


}