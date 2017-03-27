'use strict';

class AppSettings extends Component{

    constructor(options){
        super(options);

        this._el.addEventListener('click',this._onBackClick.bind(this));

        this._currentSettings = {
            'levels' : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
            'tences' : ['Present Simple', 'Past Simple', 'Future Simple','Present Perfect', 'Present Continues', 'Past Continues'],
            'sentenceTypes' : ['positive','negative','question']
        };

        //this._el.onmousedown = () => false;

        this._getSettings();
        this._render();
    }

    // поменяем внешний вид после выбора или отмены выбора элемента и отразим это в настройках
    changeItemStatusAndApperance(li){
        li.classList.toggle('settings_picked');
        li.firstElementChild.checked = !li.firstElementChild.checked;
    }

    // установим cookie с текущими настройками
    _setSettings(){
        this._getSettingsFromPage();

        // устанавливаем сразу лет на 5
        var expirationDate = new Date;
        expirationDate.setDate(expirationDate.getDate() + 1825);

        setCookie('levels',this._currentSettings.levels.toString(),{ expires : expirationDate });
        setCookie('tences',this._currentSettings.tences.toString(),{ expires : expirationDate });
    }

    // получим настройки хранимые в cookie
    _getSettings(){
        let levelsCookie = getCookie('levels');
        let tencesCookie = getCookie('tences');

        if (levelsCookie) {
            this._currentSettings.levels =  levelsCookie.split(',');
            this._currentSettings.levels.forEach((item,i,arr) => {arr[i] = +item});
        }

        if (tencesCookie) {
            this._currentSettings.tences =  tencesCookie.split(',');
        }

        // заполним чекбоксы согласно настройкам
        this._displaySettingsFlags();
    }

    _displaySettingsFlags(){

        let LevelsItems = this._el.querySelector('[data-item = "settings-levels"]').querySelectorAll('li');
        let TencesItems = this._el.querySelector('[data-item = "settings-tences"]').querySelectorAll('li');

        LevelsItems.forEach((liElem)=>{
            //if (this._currentSettings.levels.indexOf(+liElem.lastChild.data) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.levels.indexOf(+liElem.lastChild.data) !== -1) this.changeItemStatusAndApperance(liElem);
        });

        TencesItems.forEach((liElem)=>{
            //if (this._currentSettings.tences.indexOf(liElem.lastChild.data.trim()) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.tences.indexOf(liElem.lastChild.data.trim()) !== -1) this.changeItemStatusAndApperance(liElem);
        });


    }

    _getSettingsFromPage(){

        this._currentSettings.levels.length = 0;
        this._currentSettings.tences.length = 0;

        let LevelsItems = this._el.querySelector('[data-item = "settings-levels"]').querySelectorAll('li');
        let TencesItems = this._el.querySelector('[data-item = "settings-tences"]').querySelectorAll('li');

        for (let i = 0; i < LevelsItems.length ; i++) {
            if (!LevelsItems[i].firstElementChild.checked) continue;

            this._currentSettings.levels.push(+LevelsItems[i].lastChild.data);
        }

        for (let i = 0; i < TencesItems.length ; i++) {
            if (!TencesItems[i].firstElementChild.checked) continue;

            this._currentSettings.tences.push(TencesItems[i].lastChild.data.trim());
        }

    }

    _onBackClick(event){

        /*let target = event.target;

        if (!target.dataset.action) return;

        if (target.dataset.action === 'back') {
            // запишем настройки в cookie
            this._setSettings();
        }*/

        let target = event.target;

        let backEl = target.closest('[data-action = "back"]');

        if (!backEl) return;

        this._setSettings();


    }

    returnCurrentSettings(){
        return this._currentSettings;
    }

    _render(){

    }

}
