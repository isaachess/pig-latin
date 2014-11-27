var chai = require('chai');
var should = chai.should();
var pigLatin = require('./../index');

describe('igpay-atinlay', function(){
    it('igpay-atinlay ouldshay iggifypay ordsway', function(){
	pigLatin('piggified').should.equal('iggifiedpay');
    });
});
