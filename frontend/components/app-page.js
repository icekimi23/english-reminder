'use strict';

class AppPage extends Component{

    constructor(options) {
        super(options);
        this._initMenu();
        this._initSettings();
        this._initCard();
        this._initSlotMachine();
        this._initAbout();
    }

    _initMenu(){

        this._menu = new AppMenu( { el : this._el.querySelector('[data-component = "menu"]') } )

        // назначение обработчиков на кнопки
        this._menu.on('click',(event) => {

            let target = event.target;

            if (target.closest('[data-action = "show-settings"]')) {
                //this._card.hide();
                //this._settings.show();
                this.showComponent(this._settings);
            } else if  (target.closest('[data-action = "show-about"]')) {
                //this._card.hide();
                //this._settings.show();
                this.showComponent(this._about);
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
            //this._settings.hide();
            //this._card.show();
            this.showComponent(this._card);

        });

    }

    _initSlotMachine() {
        this._slotMachine = new SlotMachine( { el : this._el.querySelector('[data-component = "slot-machine"]') } );

        // обработчик нажатия на кнопку смены перевода
        this._slotMachine.on('click',(event) => {

            let target = event.target;

            let translationBtn = target.closest('[data-action = "switch-translation"]');

            if (!translationBtn) return;

            // найдем сначала слот в котором находимся, а уже в нем нужный li
            let li = translationBtn.closest('.slot_machine_wrapper').querySelector('[translation]');

            // меняем местами английский и русский вариант
            if (li) {
                let savedInnerHTML = li.innerHTML;
                li.innerHTML = li.getAttribute('translation');
                li.setAttribute('translation',savedInnerHTML);
            }


        });
    }

    _initAbout(){
        this._about = new AppAbout( { el : this._el.querySelector('[data-component = "about"]') } );

        this._about.on('click',()=>{

            let target = event.target;

            let backEl = target.closest('[data-action = "back"]');

            if (!backEl) return;

            window.history.back();
            //this._settings.hide();
            //this._card.show();
            this.showComponent(this._card);

        });
    }

    showComponent(component){

        let components = this._el.querySelectorAll('[data-component]');

        [].forEach.call(components,(el)=>{
            if (el.dataset.component === 'menu' || el.dataset.component === 'slot-machine') return;
            el.classList.add('js-hidden');
        });

        component.show();

    }
}
