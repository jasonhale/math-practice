import { Injectable } from '@angular/core';

@Injectable()
export class ProblemsService {

  constructor() { }

  settings = {
    totalProbs : 100,
    problemtypes : {
      addition : true,
      subtraction : false,
      multiplication : false,
      division : false
    },
    numbers : {
      setByMinMax : true,
      setByTotAmt : false,
      minNum : 0,
      maxNum : 9,
      maxAnswerTotal : 20
    },
    style : 'horizontal'
  };

  buildProbs = (total) => {

    // what kind of probs

    const problist = [];

    // get type of probs into useable list





    // create and show problem.  Loops as many times as the current problem count is set.

		// more than one type of problem?  If so, set a global setting and store a local array of only those problem types that are chosen/set.
    /*
    var probtypes = Object.keys(mt.settings.problemtypes);
		var multProb = [];
		for(var i = 0; i < probtypes.length; i++){
			if(mt.settings.problemtypes[probtypes[i]]) multProb.push(probtypes[i]);
		}
		if ( multProb.length > 1 ) mt.settings.multProbTypes = true;
		else mt.settings.multProbTypes = false;

		for (var i = 0; i < total; i++) {
			var numA = mt.getRandomInt(mt.settings.numbers.minNum, mt.settings.numbers.maxNum),
				numB = mt.getRandomInt(mt.settings.numbers.minNum, mt.settings.numbers.maxNum),
				oper = '',
				answer,
				probtype = '';

			//	If there are multiple problem types, pick one at random.
			//	Otherwise, just grab the one.
			if (mt.settings.multProbTypes) probtype = multProb[Math.floor(Math.random() * multProb.length)];
			else probtype = multProb[0];

			// in the case of subtraction, lets just put the larger number on top for now so we don't have to deal with negative numbers.
			if(probtype=='subtraction' && numA<numB) {
				var tmp = numA;
				numA = numB;
				numB = tmp;
			}

			// get answer
			switch (probtype){
				case 'addition':
					answer = numA + numB;
					break;

				case 'subtraction':
					answer = numA - numB;
					break;

				case 'multiplication':
					answer = numA * numB;
					break;

				case 'division':
					answer = numA / numB;
					break;
			}

			var template = $('.prob.template').clone();
			$(template).removeClass('template');
			$(template).attr({
				'data-index' : i+1,
				'data-problemtype' : probtype
			});
			$(template).find('.question').attr({
				'for'			: 'problem'+i
			});
			$(template).find('.num-a').text(''+numA);
			$(template).find('.num-b').text(''+numB);
			$(template).find('.operator').text(mt.problemtypes[probtype]);
			$(template).find('.answer').attr({
				'id'			: 'problem'+i,
				'tab-index'		: i,
				'name'			: 'answer'+i,
				'data-answer'	: answer
			});
			$(template).appendTo($('.problems'));
    };
    */
  }
}
