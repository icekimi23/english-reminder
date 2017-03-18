'use strict';

class AppCard extends Component {

    constructor(options) {
        super(options);
        this._render();
        //this._el.addEventListener('click', this._onStartButtonClick.bind(this));
    }


    _render() {

    }

    formSetToTrain(settings) {

        let chosenLevels = settings.levels;
        let chosenTences = settings.tences;
        let chosenSentTypes = settings.sentenceTypes;

        let words = [{
            'en': 'table',
            'ru': 'стол',
            'level': 16
        }, {
            'en': 'chin',
            'ru': 'подбородок',
            'level': 2
        }, {
            'en': 'spoon',
            'ru': 'ложка',
            'level': 15
        }, {
            'en': 'kind',
            'ru': 'добрый',
            'level': 2
        }, {
            'en': 'annoying',
            'ru': 'раздражающий',
            'level': 3
        }, {
            'en': 'dress up',
            'ru': 'наряжаться',
            'level': 8
        }, {
            'en': 'hit on',
            'ru': 'флиртовать',
            'level': 3
        }, {
            'en': 'wound',
            'ru': 'рана',
            'level': 3
        }];

        let tences = ['Present Simple', 'Past Simple', 'Future Simple','Present Perfect', 'Present Continues', 'Past Continues'];

        // выбираем слова только из выбранных в настройках левелов
        let wordsToChooseOf = words.filter((word) => {
            return chosenLevels.indexOf(word.level) !== -1;
        });

        // выбираем времена только из выбранных в настройках времен
        let tencesToChooseOf = tences.filter((tence) => {
            return chosenTences.indexOf(tence) !== -1;
        });

        let chosenWords = Randomizer.getArrayOfRandomElements(wordsToChooseOf,3);
        let tence = Randomizer.getRandomElementFromArray(tencesToChooseOf);

        let str = 'words : ';

        chosenWords.forEach((item) => {
            str += item.en + ', ';
        });

        alert(str + "tence : " + tence);

    }


}