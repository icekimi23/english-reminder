'use strict';

class AppPage extends Component{

    constructor(options) {
        super(options);
        this._initSettings();
        this._initCard();
    }

    _initCard(){
        this._card = new AppCard({el : this._el.querySelector('[data-component = "card"]')});

        // загрузим слова
        this._card.loadWords();



        // назначение обработчиков на кнопки
        this._card.on('click',(event) => {

            let target = event.target;

            if (!target.dataset.action) return;

            if (target.dataset.action === 'start') {
                let settings = this._settings.returnCurrentSettings();
                this._card.formSetToTrain(settings);
            } else if (target.dataset.action === 'show-settings') {
                this._card.hide();
                this._settings.show();
            }

        });

    }

    _initSettings(){
        this._settings = new AppSettings({el : this._el.querySelector('[data-component = "settings"]')});

        // назначение обработчиков на кнопки
        this._settings.on('click',(event) => {

            let target = event.target;

            if (!target.dataset.action) return;

            if (target.dataset.action === 'back') {
                this._settings.hide();
                this._card.show();
            }

        });
    }


}
