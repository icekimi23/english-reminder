'use strict';

class AppPage extends Component{

    constructor(options) {
        super(options);
        this._initCard();
        this._initSettings();
    }

    _initCard(){
        this._card = new AppCard({el : this._el.querySelector('[data-component = "card"]')});
    }

    _initSettings(){
        this._settings = new AppSettings({el : this._el.querySelector('[data-component = "settings"]')});
    }


}
