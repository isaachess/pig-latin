var chai = require('chai');
var should = chai.should();
var pigLatin = require('./../index');

describe('igpay-atinlay', function(){
    it('ouldshay iggifypay ordsway', function(){
	pigLatin('piggified').should.equal('iggifiedpay');
    });

    it('ouldshay apitalizecay entencessay', function(){
	pigLatin('oh why bother...', {capitalize: true}).should.equal('Ohway ywhay otherbay...');
    });

    it('ouldshay allowyay angingchay owelvay endingsyay orfay ordsway endingyay ithway owelsvay', function(){
	var exResult = 'ier amer anneer.';
	pigLatin('i am anne.', {vowelEnding: 'er'}).should.equal(exResult);
    });

    it('ouldshay eepkay inputyay apitalizationcay', function(){
	var exResult = 'Iway amway Anneway.';
	pigLatin('I am Anne.').should.equal(exResult);
    });

    it('ouldshay apitalizecay irstfay etterlay ofyay iggifiedpay ordway ifyay alreadyyay apitalizedcay', function(){
	var input = 'What are you having for lunch?';
	var exResult = 'Atwhay areway ouyay avinghay orfay unchlay?';
	pigLatin(input).should.equal(exResult);
    });
});
