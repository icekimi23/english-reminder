'use strict';

class AppSettings extends Component{

    constructor(options){
        super(options);

        this._el.addEventListener('click',this._onBackClick.bind(this));

        this._currentSettings = {
            'levels' : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
            'tences' : ['Present Simple', 'Past Simple', 'Future Simple','Present Perfect', 'Present Continues', 'Past Continues'],
            'sentenceTypes' : ['positive','negative','question'],
            'rusFrequency' : 0.25
        };

        this._el.onmousedown = () => false;

        this._getSettings();
        this._render();
    }

    // поменяем внешний вид после выбора или отмены выбора элемента и отразим это в настройках
    changeItemStatus(li){
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
        setCookie('rusFrequency',this._currentSettings.rusFrequency,{ expires : expirationDate });
    }

    // получим настройки хранимые в cookie
    _getSettings(){
        let levelsCookie = getCookie('levels');
        let tencesCookie = getCookie('tences');
        let rusFrequencyCookie = getCookie('rusFrequency');

        if (levelsCookie) {
            this._currentSettings.levels =  levelsCookie.split(',');
            this._currentSettings.levels.forEach((item,i,arr) => {arr[i] = +item});
        }

        if (tencesCookie) {
            this._currentSettings.tences =  tencesCookie.split(',');
        }

        if (rusFrequencyCookie) {
            this._currentSettings.rusFrequency = +rusFrequencyCookie;
        }

        // заполним чекбоксы согласно настройкам
        this._displaySettingsFlags();
    }

    _displaySettingsFlags(){

        let levelsItems = this._el.querySelector('[data-item = "settings-levels"]').querySelectorAll('li');
        let tencesItems = this._el.querySelector('[data-item = "settings-tences"]').querySelectorAll('li');
        let frequencyItems = this._el.querySelector('[data-item = "settings-frequencies"]').querySelectorAll('li');

        [].forEach.call(levelsItems,(liElem)=>{
            //if (this._currentSettings.levels.indexOf(+liElem.lastChild.data) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.levels.indexOf(+liElem.firstElementChild.value) !== -1) this.changeItemStatus(liElem);
        });

        // используем одалживание так как на коллекции NodeList forEach работает только в Chrome
        /*levelsItems.forEach((liElem)=>{
            //if (this._currentSettings.levels.indexOf(+liElem.lastChild.data) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.levels.indexOf(+liElem.firstElementChild.value) !== -1) this.changeItemStatus(liElem);
        });*/

        [].forEach.call(tencesItems,(liElem)=>{
            //if (this._currentSettings.tences.indexOf(liElem.lastChild.data.trim()) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.tences.indexOf(liElem.firstElementChild.value.trim()) !== -1) this.changeItemStatus(liElem);
        });

        /*tencesItems.forEach((liElem)=>{
            //if (this._currentSettings.tences.indexOf(liElem.lastChild.data.trim()) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.tences.indexOf(liElem.firstElementChild.value.trim()) !== -1) this.changeItemStatus(liElem);
        });*/

        [].forEach.call(frequencyItems,(liElem)=>{
            //if (this._currentSettings.tences.indexOf(liElem.lastChild.data.trim()) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.rusFrequency === +liElem.firstElementChild.value) this.changeItemStatus(liElem);
        });

        /*frequencyItems.forEach((liElem)=>{
            //if (this._currentSettings.tences.indexOf(liElem.lastChild.data.trim()) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.rusFrequency === +liElem.firstElementChild.value) this.changeItemStatus(liElem);
        });*/

    }

    _getSettingsFromPage(){

        this._currentSettings.levels.length = 0;
        this._currentSettings.tences.length = 0;

        let levelsItems = this._el.querySelector('[data-item = "settings-levels"]').querySelectorAll('li');
        let tencesItems = this._el.querySelector('[data-item = "settings-tences"]').querySelectorAll('li');
        let frequencyItems = this._el.querySelector('[data-item = "settings-frequencies"]').querySelectorAll('li');

        for (let i = 0; i < levelsItems.length ; i++) {

            let input = levelsItems[i].firstElementChild;
            if (!input.checked) continue;
            this._currentSettings.levels.push(+input.value);
        }

        for (let i = 0; i < tencesItems.length ; i++) {

            let input = tencesItems[i].firstElementChild;
            if (!input.checked) continue;
            this._currentSettings.tences.push(input.value.trim());
        }

        for (let i = 0; i < frequencyItems.length ; i++) {
            let input = frequencyItems[i].firstElementChild;
            if (!input.checked) continue;
            this._currentSettings.rusFrequency = (+input.value);
            break;
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
