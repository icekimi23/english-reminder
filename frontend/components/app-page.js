'use strict';

class AppPage extends Component{

    constructor(options) {
        super(options);
        this._initSettings();
        this._initCard();
    }

    _initCard(){
        this._card = new AppCard({el : this._el.querySelector('[data-component = "card"]')});

        // назначение обработчика на кнопку Start
        this._card.on('click',(event) => {

            let target = event.target;

            if (!target.dataset.action || target.dataset.action !== 'start') return;

            let settings = this._settings.returnCurrentSettings();

            this._card.formSetToTrain(settings);

        });
    }

    _initSettings(){
        this._settings = new AppSettings({el : this._el.querySelector('[data-component = "settings"]')});
    }


}
