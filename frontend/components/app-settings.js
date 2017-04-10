'use strict';

class AppSettings extends Component{

    constructor(options){
        super(options);

        this._el.addEventListener('click',this._onBackClick.bind(this));
        this._el.addEventListener('click',this._onShowOnlyWordsClick.bind(this),false);

        this._currentSettings = {
            'levels' : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
            'tences' : ['Present Simple', 'Past Simple', 'Future Simple','Present Perfect', 'Present Continues', 'Past Continues'],
            'sentenceTypes' : ['positive','negative','question'],
            'rusFrequency' : 0.25,
            'onlyWords' : false
        };

        this._el.onmousedown = () => false;

        /*this._render();*/
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
        setCookie('onlyWords',this._currentSettings.onlyWords,{ expires : expirationDate });
    }

    // получим настройки хранимые в cookie
    _getSettings(){
        let levelsCookie = getCookie('levels');
        let tencesCookie = getCookie('tences');
        let rusFrequencyCookie = getCookie('rusFrequency');
        let onlyWords = getCookie('onlyWords');

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

        if (onlyWords === 'true') {
            this._currentSettings.onlyWords = true;
        }


        // заполним чекбоксы согласно настройкам
        this._displaySettingsFlags();
    }

    _displaySettingsFlags(){

        let levelsItems = this._el.querySelector('[data-item = "settings-levels"]').querySelectorAll('li');
        let tencesItems = this._el.querySelector('[data-item = "settings-tences"]').querySelectorAll('li');
        let frequencyItems = this._el.querySelector('[data-item = "settings-frequencies"]').querySelectorAll('li');
        let onlyWords = this._el.querySelector('[data-item="only_words_settings"]').querySelector('input');

        [].forEach.call(levelsItems,(liElem)=>{
            //if (this._currentSettings.levels.indexOf(+liElem.lastChild.data) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.levels.indexOf(+liElem.firstElementChild.value) !== -1) {
                this.changeItemStatus(liElem,true);
            } else {
                this.changeItemStatus(liElem,false);
            }
        });

        // используем одалживание так как на коллекции NodeList forEach работает только в Chrome
        [].forEach.call(tencesItems,(liElem)=>{
            //if (this._currentSettings.tences.indexOf(liElem.lastChild.data.trim()) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.tences.indexOf(liElem.firstElementChild.value.trim()) !== -1) {
                this.changeItemStatus(liElem,true);
            } else {
                this.changeItemStatus(liElem,false);
            }
        });


        [].forEach.call(frequencyItems,(liElem)=>{
            //if (this._currentSettings.tences.indexOf(liElem.lastChild.data.trim()) !== -1) liElem.firstElementChild.checked = true;
            if (this._currentSettings.rusFrequency === +liElem.firstElementChild.value) {
                this.changeItemStatus(liElem,true);
            } else {
                this.changeItemStatus(liElem,false);
            };
        });

        if (this._currentSettings.onlyWords) {
            onlyWords.checked = true;
            /*let el = document.querySelector('.not_words_slots_wrapper');
            if (el) el.classList.add('js-hidden');*/
        } else {
            onlyWords.checked = false;
            /*let el = document.querySelector('.not_words_slots_wrapper');
            if (el) el.classList.remove('js-hidden');*/
        }
    }

    // поменяем внешний вид после выбора или отмены выбора элемента и отразим это в настройках
    changeItemStatus(li,state){
        li.firstElementChild.checked = state;
    }

    _getSettingsFromPage(){

        this._currentSettings.levels.length = 0;
        this._currentSettings.tences.length = 0;

        let levelsItems = this._el.querySelector('[data-item = "settings-levels"]').querySelectorAll('li');
        let tencesItems = this._el.querySelector('[data-item = "settings-tences"]').querySelectorAll('li');
        let frequencyItems = this._el.querySelector('[data-item = "settings-frequencies"]').querySelectorAll('li');
        let onlyWords = this._el.querySelector('[data-item="only_words_settings"]').querySelector('input');

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

        this._currentSettings.onlyWords = onlyWords.checked;

    }

    _onBackClick(event){

        let target = event.target;

        let backEl = target.closest('[data-action = "back"]');

        if (!backEl) return;

        this._setSettings();

    }

    _onShowOnlyWordsClick(event){
/*
        // назначение обработчика на переклаючатель "Show only words"
        let target = event.target;

        // обрабатываем только клик на label
        if (target.tagName === 'INPUT') return;

        let el = target.closest('.only_words_settings');

        if (!el) return;

        let elToHide = document.querySelector('.not_words_slots_wrapper');

        if (!elToHide) return;

        elToHide.classList.toggle('js-hidden');
*/

    }

    returnCurrentSettings(){
        return this._currentSettings;
    }

    _render(){
        this._getSettings();
    }

}
