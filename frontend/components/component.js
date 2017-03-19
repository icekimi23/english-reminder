'use strict';

class Component{

    constructor(options){
        this._el = options.el;
    }


    on(eventName,handler){
        this._el.addEventListener(eventName,handler);
    }

    off(eventName,handler){
        this._el.removeEventListener(eventName,handler);
    }

    show(){
        this._el.classList.remove('js-hidden');
    }

    hide(){
        this._el.classList.add('js-hidden');
    }

    trigger(eventName,data){

        let myEvent = new CustomEvent(eventName,{
            detail : data
        });

        this._el.dispatchEvent(myEvent);

    }

}