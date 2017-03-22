/**
 * Created by icekimi on 20.03.2017.
 */

class SlotMachine{

    constructor(options){
        // вся слот машина
        this._el = options.el;

        // общая длина ul прокрутки
        this._slotHeight = 0;

        // длина прокрутки после которой нужно замедлить скорость прокрутки, вплоть до полной остановки в конце
        this._oneSpinStepHeight = 0;

        this._slot1 = new Slot( { el : this._el.querySelector('.slot1'), minSpeedAddition : 0, maxSpeedAddition : 100} );
        this._slot2 = new Slot( { el : this._el.querySelector('.slot2'), minSpeedAddition : 100, maxSpeedAddition : 200} );
        this._slot3 = new Slot( { el : this._el.querySelector('.slot3'), minSpeedAddition : 200, maxSpeedAddition : 300} );

        this._allSlots = [this._slot1,this._slot2,this._slot3];

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
        
        // зяполняем слот для очередной прокрутки
        this._prepareSlot( this._slot1.el, {
            'words' : this._dataForSlots.wordsForSlotMachine,
            'theOne' : this._dataForSlots.chosenWords[0]
        } );

        // зяполняем слот для очередной прокрутки
        this._prepareSlot( this._slot2.el, {
            'words' : this._dataForSlots.wordsForSlotMachine,
            'theOne' : this._dataForSlots.chosenWords[1]
        } );

        // зяполняем слот для очередной прокрутки
        this._prepareSlot( this._slot3.el, {
            'words' : this._dataForSlots.wordsForSlotMachine,
            'theOne' : this._dataForSlots.chosenWords[2]
        } );

        this._inProgress = true;


        this._allSlots.forEach((slot)=>{
            slot.startSpining(this._slotHeight, this._oneSpinStepHeight);
        });

        //
        //this._slot1.startSpining(this._slotHeight, this._oneSpinStepHeight);

        // пробуем прокрутить слот 2
        //$(this._slot2.el).css('top', -this._slotHeight).animate({ 'top' : '0px' },1500,'linear',() => {this._inProgress = false});

        // пробуем прокрутить слот 3
        //$(this._slot3.el).css('top', -this._slotHeight).animate({ 'top' : '0px' },1500,'linear',() => {this._inProgress = false});

    }

    _prepareSlot(slot,options){

        
        let theOne = options.theOne || 'Oopps! Something  is wrong!';

        let words = options.words || [];

        const wordsInSlot = words.length;

        //let liHeight = slot.querySelector('li').clientHeight;
        // выстоту li берем как заданную высоту внешнего div'a
        let liHeight = this._el.querySelector('.slot_machine_wrapper').clientHeight;

        // общая длина ul прокрутки
        this._slotHeight = -(liHeight * wordsInSlot);

        // длина прокрутки после которой нужно замедлить скорость прокрутки, вплоть до полной остановки в конце
        this._oneSpinStepHeight = this._slotHeight / (wordsInSlot / 5);

        let slotItems = slot.querySelectorAll('li');

        // удаляем все элементы из слота
        slotItems.forEach( (item) => {
            slot.removeChild(item);
        });

        // добавляем новые элементы в слот
        words.forEach( (item) => {
            let newLi = document.createElement('li');
            newLi.innerHTML = item.en;
            slot.appendChild(newLi);
        });

        // элемент, который должен отобразиться последним, в конце вращения
        let theLastLi = document.createElement('li');
        theLastLi.innerHTML = theOne.en;
        slot.insertBefore(theLastLi,slot.firstElementChild);

    }


    _render(){

    }
}


class Slot {
    constructor(options){
        this.el = options.el;
        this._randomSpeenAddition = Randomizer.getRandomInteger(options.minSpeedAddition,options.maxSpeedAddition);
        this.speed = 300 + this._randomSpeenAddition;
    }

    _spinOnce(){

        // величина, c которой нужно начинать скролить на текущем шаге
        let startingHeight = this._currentHeight;
        // величина, до которой нужно скролить на текущем шаге
        let heightToScroll = this._currentHeight + this._oneSpinStepHeight;

        this._currentHeight = heightToScroll;

        // пробуем прокрутить слот
        $(this.el).css('top',startingHeight).animate({ 'top' : heightToScroll + 'px' },this.speed,'linear',() => {
            this._decreaseSpeed();
        });
    }

    _decreaseSpeed(){

        // если еще есть что прокрутить, то крутим, предварительно снизив скорость
        if (this._currentHeight < 0) {
            this.speed += (200 + this._randomSpeenAddition);
            this._spinOnce();
        }

    }

    startSpining(slotHeight,oneSpinStepHeight){
        
        this.speed = 300 + this._randomSpeenAddition;
        this._currentHeight = slotHeight;
        this._oneSpinStepHeight = -oneSpinStepHeight;
        this._spinOnce();
    }

}
