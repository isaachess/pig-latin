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
});
