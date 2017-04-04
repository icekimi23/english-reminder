/**
 * Created by icekimi on 20.03.2017.
 */

class SlotMachine extends Component{

    constructor(options){
        // вся слот машина
        super(options);

        // общая длина ul прокрутки
        //this._slotHeight = 0;

        // длина прокрутки после которой нужно замедлить скорость прокрутки, вплоть до полной остановки в конце
        //this._oneSpinStepHeight = 0;

        // 3 слота(блоки в которых крутятся слова)
        this._slot1 = new Slot( { el : this._el.querySelector('.slot1'), minSpeedAddition : 0, maxSpeedAddition : 50} );
        this._slot2 = new Slot( { el : this._el.querySelector('.slot2'), minSpeedAddition : 50, maxSpeedAddition : 100} );
        this._slot3 = new Slot( { el : this._el.querySelector('.slot3'), minSpeedAddition : 100, maxSpeedAddition : 150} );
        this._slot4 = new Slot( { el : this._el.querySelector('.slot4'), minSpeedAddition : 0, maxSpeedAddition : 50} );
        this._slot5 = new Slot( { el : this._el.querySelector('.slot5'), minSpeedAddition : 0, maxSpeedAddition : 50} );

        this._allSlots = [this._slot1,this._slot2,this._slot3,this._slot4,this._slot5];

        this._dataForSlots = {};
        this._inProgress = false;

        this._render();
    }

    checkStatus(){
        return this._inProgress;
    }

    loadDataForSlots(data){
        this._dataForSlots = data;
    }

    rotateSlots(){

        this._inProgress = true;

        //зяполняем слот для очередной прокрутки
        this._allSlots.forEach((slot,i,arr)=>{
            this._prepareSlot( slot, {
                'words' : this._dataForSlots.wordsForSlotMachine,
                'theOne' : this._dataForSlots.chosenWords[i],
                'tence' : this._dataForSlots.tence,
                'tencesForSlot' : this._dataForSlots.tencesForSlot,
                'sentenceType' : this._dataForSlots.sentenceType,
                'sentenceTypes' : this._dataForSlots.sentenceTypes
            });
        });

        // начинаем крутить все слоты
        this._allSlots.forEach((slot)=>{
            //slot.startSpining(this._slotHeight, this._oneSpinStepHeight);
            slot.startSpining();
        });

    }

    _prepareSlot(slot,options){

        // подготавливаем слоты, они могут быть раного типа, разного размера и с разным количеством элементов

        if (slot.type === 'words'){
            var theOne = options.theOne || 'Oopps! Something is wrong!';
            var elementsForSlots = options.words || [];
        } else if (slot.type === 'tences'){
            var theOne = options.tence || 'Oopps! Something is wrong!';
            var elementsForSlots = options.tencesForSlot || [];
        } else if (slot.type === 'sentence-forms'){
            var theOne = options.sentenceType || 'Oopps! Something is wrong!';
            var elementsForSlots = options.sentenceTypes || [];

        }

        let elementsInSlot = elementsForSlots.length;

        let liHeight = slot.el.closest('.slot_machine_wrapper').clientHeight;

        // общая длина ul прокрутки
        slot._slotHeight = -(liHeight * elementsInSlot);

        // длина прокрутки после которой нужно замедлить скорость прокрутки, вплоть до полной остановки в конце

        let divider = 1;

        if (elementsInSlot > 12) {
            divider = elementsInSlot / 10;
        }

        slot._oneSpinStepHeight = -(slot._slotHeight / divider);

        let slotItems = slot.el.querySelectorAll('li');

        // удаляем все элементы из слота
        [].forEach.call(slotItems,(item) => {
            slot.el.removeChild(item);
        });

        // для слов создаем перевод(в виде атрибута), для остальных слотов возможно только одно значение
        if (slot.type === 'words') {

            // добавляем новые элементы в слот
            elementsForSlots.forEach( (item) => {
                let newLi = document.createElement('li');
                newLi.innerHTML = item.toShow;
                slot.el.appendChild(newLi);
            });

            // элемент, который должен отобразиться последним, в конце вращения
            let theLastLi = document.createElement('li');
            theLastLi.innerHTML = theOne.toShow;
            theLastLi.setAttribute('translation',theOne.translation);
            slot.el.insertBefore(theLastLi,slot.el.firstElementChild);
            slot.el.style.top = '' + slot._slotHeight + 'px';

        } else {

            // добавляем новые элементы в слот
            elementsForSlots.forEach( (item) => {
                let newLi = document.createElement('li');
                newLi.innerHTML = item;
                slot.el.appendChild(newLi);
            });

            // элемент, который должен отобразиться последним, в конце вращения
            let theLastLi = document.createElement('li');
            theLastLi.innerHTML = theOne;
            slot.el.insertBefore(theLastLi,slot.el.firstElementChild);
            slot.el.style.top = '' + slot._slotHeight + 'px';
        }

    }

    _render(){

    }
}


class Slot {

    constructor(options){
        this.el = options.el;
        this.type = this._getSlotType();
        this._randomSpeenAddition = Randomizer.getRandomInteger(options.minSpeedAddition,options.maxSpeedAddition);
    }

    _getSlotType(){

        // по умолчанию пусть будет словом
        let type = 'words';

        if (this.el.classList.contains('slot_type_tences')) {
            type = 'tences';
        } else if (this.el.classList.contains('slot_type_sentence-forms')){
            type = 'sentence-forms';
        }

        return type;
    }

    _spinOnce(){

        // величина, c которой нужно начинать скролить на текущем шаге
        //let startingHeight = this._currentHeight;
        let startingHeight = this._slotHeight;
        // величина, до которой нужно скролить на текущем шаге
        let heightToScroll = this._slotHeight + this._oneSpinStepHeight;

        //this._currentHeight = heightToScroll;
        this._slotHeight = heightToScroll;

        // пробуем прокрутить слот
        /*$(this.el).css('top',startingHeight).animate({ 'top' : heightToScroll + 'px' },this.speed,'linear',() => {
            this._decreaseSpeed();
        });*/
        //$(this.el).css('top',startingHeight);
        this.el.classList.add('spinning');
        this.el.style.top = '0px';
        setTimeout(()=>{
            this.el.classList.remove('spinning');
        },2500)

    }

    _decreaseSpeed(){

        // если еще есть что прокрутить, то крутим, предварительно снизив скорость
        if (this._slotHeight < 0) {
            this.speed += (100 + this._randomSpeenAddition);
            //console.log(this.speed);
            this._spinOnce();
        }

    }

    startSpining(slotHeight,oneSpinStepHeight){

        /*console.log("Анимация начата");*/

        this.el.classList.add('spinning');
        this.el.style.top = '0px';

        let self = this;

        this.el.addEventListener('transitionend',function onTransitionEnd(){
            /*console.log("Анимация окончена");*/
            self.el.classList.remove('spinning');
            self.el.removeEventListener('transitionend',onTransitionEnd);
        });


        /*setTimeout(()=>{
            this.el.classList.remove('spinning');
        },2500)*/
        
        //this.speed = 200 + this._randomSpeenAddition;
        //this._currentHeight = slotHeight;
        //this._oneSpinStepHeight = -oneSpinStepHeight;
        //this._spinOnce();
    }

}
