/**
 * Created by icekimi on 20.03.2017.
 */

class SlotMachine extends Component{

    constructor(options){
        // вся слот машина
        super(options);

        // общая длина ul прокрутки
        this._slotHeight = 0;

        // длина прокрутки после которой нужно замедлить скорость прокрутки, вплоть до полной остановки в конце
        this._oneSpinStepHeight = 0;

        // 3 слота(блоки в которых крутятся слова)
        this._slot1 = new Slot( { el : this._el.querySelector('.slot1'), minSpeedAddition : 0, maxSpeedAddition : 50} );
        this._slot2 = new Slot( { el : this._el.querySelector('.slot2'), minSpeedAddition : 50, maxSpeedAddition : 100} );
        this._slot3 = new Slot( { el : this._el.querySelector('.slot3'), minSpeedAddition : 100, maxSpeedAddition : 150} );

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

        this._inProgress = true;

        //зяполняем слот для очередной прокрутки
        this._allSlots.forEach((slot,i,arr)=>{
            this._prepareSlot( slot.el, {
                'words' : this._dataForSlots.wordsForSlotMachine,
                'theOne' : this._dataForSlots.chosenWords[i]
            });
        });

        // начинаем крутить все слоты
        this._allSlots.forEach((slot)=>{
            slot.startSpining(this._slotHeight, this._oneSpinStepHeight);
        });

    }

    _prepareSlot(slot,options){

        
        let theOne = options.theOne || 'Oopps! Something  is wrong!';

        let words = options.words || [];

        let wordsInSlot = words.length;

        let liHeight = this._el.querySelector('.slot_machine_wrapper').clientHeight;

        // общая длина ul прокрутки
        this._slotHeight = -(liHeight * wordsInSlot);

        // длина прокрутки после которой нужно замедлить скорость прокрутки, вплоть до полной остановки в конце
        this._oneSpinStepHeight = this._slotHeight / (wordsInSlot / 10);

        let slotItems = slot.querySelectorAll('li');

        // удаляем все элементы из слота
        slotItems.forEach( (item) => {
            slot.removeChild(item);
        });

        // добавляем новые элементы в слот
        words.forEach( (item) => {
            let newLi = document.createElement('li');
            newLi.innerHTML = item.toShow;
            slot.appendChild(newLi);
        });

        // элемент, который должен отобразиться последним, в конце вращения
        let theLastLi = document.createElement('li');
        theLastLi.innerHTML = theOne.toShow;
        theLastLi.setAttribute('translation',theOne.translation);
        slot.insertBefore(theLastLi,slot.firstElementChild);

    }


    _render(){

    }
}


class Slot {

    constructor(options){
        this.el = options.el;
        this._randomSpeenAddition = Randomizer.getRandomInteger(options.minSpeedAddition,options.maxSpeedAddition);
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
            this.speed += (100 + this._randomSpeenAddition);
            console.log(this.speed);
            this._spinOnce();
        }

    }

    startSpining(slotHeight,oneSpinStepHeight){
        
        this.speed = 200 + this._randomSpeenAddition;
        this._currentHeight = slotHeight;
        this._oneSpinStepHeight = -oneSpinStepHeight;
        this._spinOnce();
    }

}
