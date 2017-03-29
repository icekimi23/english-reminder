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

        // выбираем слова только из выбранных в настройках левелов
        /*let wordsToChooseOf = words.filter((word) => {
            return chosenLevels.indexOf(word.level) !== -1;
        });*/

        // импользуем map и возвращаем не объект, а значение, английской или русское в зависимости от параметра rusFrequency
        /*let wordsToChooseOf = words.map((word) => {
             if (chosenLevels.indexOf(word.level) !== -1) {
                 return (Math.random() > rusFrequency) ? word.en : word.ru;
             }
        });*/

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