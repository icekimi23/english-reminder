'use strict';

class AppSettings extends Component{

    constructor(options){
        super(options);

        this._currentSettings = {
            'levels' : [1,2,3,4,5,6,7,8,9,10,11],
            'tences' : ['Present Simple','Future Simple','Past Simple'],
            'sentenceTypes' : ['positive','negative','question']
        };
    }

    returnCurrentSettings(){
        return this._currentSettings;
    }

}
