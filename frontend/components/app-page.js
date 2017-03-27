'use strict';

class AppPage extends Component{

    constructor(options) {
        super(options);
        this._initMenu();
        this._initSettings();
        this._initCard();
        this._initSlotMachine();
    }

    _initMenu(){

        this._menu = new AppMenu( { el : this._el.querySelector('[data-component = "menu"]') } )

        // назначение обработчиков на кнопки
        this._menu.on('click',(event) => {

            let target = event.target;

            if (target.closest('[data-action = "show-settings"]')) {
                this._card.hide();
                this._settings.show();
            }

        });

    }

    _initCard(){
        this._card = new AppCard( { el : this._el.querySelector('[data-component = "card"]') } );

        // загрузим слова
        this._card.loadWords();

        // назначение обработчиков на кнопки
        this._card.on('click',(event) => {

            let target = event.target;

            if (target.closest('[data-action = "start"]')) {

                /*if (this._slotMachine.checkStatus()) return;*/

                let settings = this._settings.returnCurrentSettings();

                if (settings.levels.length > 0) {
                    let dataForSlots = this._card.formSetToTrain(settings);
                    this._slotMachine.loadDataForSlots(dataForSlots);
                    this._slotMachine.rotateSlots();
                } else {
                    alert("Choose at least one level in settings!");
                }

            }

        });

    }

    _initSettings(){
        this._settings = new AppSettings( { el : this._el.querySelector('[data-component = "settings"]') } );

        // назначение обработчиков на кнопки
        this._settings.on('click',(event) => {

            let target = event.target;

            let backEl = target.closest('[data-action = "back"]');

            if (!backEl) return;

            window.history.back();
            this._settings.hide();
            this._card.show();

        });

        // назначение обработчиков на кнопки
        this._settings.on('click',(event) => {

            let target = event.target;

            let li = target.closest('[data-item = "settings-level"]') || target.closest('[data-item = "settings-tence"]');

            if (!li) return;

            this._settings.changeItemStatusAndApperance(li);

        });
    }

    _initSlotMachine() {
        this._slotMachine = new SlotMachine( { el : this._el.querySelector('[data-component = "slot-machine"]') } );
    }


}
