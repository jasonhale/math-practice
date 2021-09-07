var mt = {
  settings : {
    totalProbs : 10,
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
  },
  problemtypes : {
    addition : '+',
    subtraction : '−',
    multiplication : '×',
    division : '÷'
  },
  getRandomInt : function(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }
};

mt.buildProbs = (total) => {
  var problist = [];
  
  // create and show problem.  Loops as many times as the current problem count is set.

  // more than one type of problem?  If so, set a global setting and store a local array of only those problem types that are chosen/set.
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

    problist.push({
      id: i+1,
      numA: numA,
      numB: numB,
      oper: mt.problemtypes[probtype],
      answer: answer,
      probtype: probtype
    });
  }

  return problist;
}
