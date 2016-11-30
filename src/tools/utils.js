/*
  Utility functions for App.
*/

/* ## Generate problems from config settings */
// {
  // "operations": {
  //   "addition": true,
  //   "subtraction": false,
  //   "multiplication": false,
  //   "division": false
  // },
//   "count": 50,
//   "operands": {
//     "setBy": "minmax",
//     "min": 0,
//     "max": 9,
//     "maxAnswer": 20
//   },
//   "probStyle": "vertical"
// };
// {
//       numA: 0,
//       numB: 0,
//       operator: '+',
//       answer: 0
//     }

const operandsymbols = {
  'addition': '+',
  'subtraction': '-',
  'multiplication': 'x',
  'division': '/'
};

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateProblems(operations, count, operands) {
  let equations = []; // where the generated math problems will be stored.

  // create array of possible operations from operations list.
  const probtypes = Object.keys(operations); // get array of all possibilities.
  function filterBy(value){
    return operations[value];
  }
  const currentProbTypes = probtypes.filter(filterBy);
  // let currentProbTypes = probtypes.map((prob) => {
  //   if(operations[prob]){ // if setting is _true_, add to array of currently chose problem types.
  //     return prob;
  //   } else {
  //     return false;
  //   } 
  // });

  // build out, add each prob to var problems array.
  // first, check how they should be built... by min/max operands, or by max value of answer.
  if(operands.setBy === 'minmax'){
    for(let i = 0; i < count; i++){
      let numA = getRandomInt(operands.min, operands.max), // get random number in range...
          numB = getRandomInt(operands.min, operands.max), // ... of min & max declarations
          answer;
      const probtype = (currentProbTypes.length > 1) ? currentProbTypes[Math.floor(Math.random() * currentProbTypes.length)] : currentProbTypes[0];
      const operator = operandsymbols[probtype];

      // in the case of subtraction, lets just put the larger number on top for now so we don't have to deal with negative numbers.
      if(probtype === 'subtraction' && numA < numB) {
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
        
        default:
          answer = numA + numB;
      }

      equations.push({
        'numA': numA,
        'numB': numB,
        'operator': operator,
        'answer': answer
      });
    };
  }

  if(operands.setBy === 'maxAnswer') {
    // need to figure out this one...
  }

  return equations;
}
