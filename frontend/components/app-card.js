'use strict';

class AppCard extends Component {

    constructor(options) {
        super(options);
        this._render();
        //this._randomInteger = this._randomInteger.bind(this);
        this._el.addEventListener('click', this._onStartButtonClick.bind(this));
    }


    _render() {

    }

    _onStartButtonClick(event) {

        let target = event.target;

        if (!target.dataset.action || target.dataset.action !== 'start') return;

        this._formSetToTrain();

    }

    _formSetToTrain() {

        let words = [{
            'en': 'table',
            'ru': 'стол',
            'level': '1'
        }, {
            'en': 'chin',
            'ru': 'подбородок',
            'level': '2'
        }, {
            'en': 'spoon',
            'ru': 'ложка',
            'level': '1'
        }, {
            'en': 'kind',
            'ru': 'добрый',
            'level': '2'
        }, {
            'en': 'annoying',
            'ru': 'раздражающий',
            'level': '3'
        }];

        let tences = ['Present Simple', 'Past Simple', 'Future Simple'];

        let word = words[Randomizer.getRandomInteger(0, words.length - 1)].en;
        let tence = tences[Randomizer.getRandomInteger(0, tences.length - 1)];

        alert("word : " + word + ", tence : " + tence);

    }


}