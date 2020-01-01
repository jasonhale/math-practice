/*
  Utility functions for App.
*/

/* ## Generate problems from config settings */

import initialState from './initialState';

export const operandSymbols = {
  'addition': '+',
  'subtraction': '-',
  'multiplication': 'x',
  'division': '/'
};

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProblems(
    operations = initialState.operations,
    count = initialState.count,
    operands = initialState.operands
  ) {
  if (!operations) return [];

  let equations = []; // where the generated math problems will be stored.

  // create array of possible operations from operations list.
  const probtypes = Object.keys(operations); // get array of all possibilities.

  // function filterBy(value){
  //   return operations[value];
  // }

  // const currentProbTypes = probtypes.filter(filterBy);
  const currentProbTypes = probtypes.filter((p) => operations[p]);
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
      const operator = operandSymbols[probtype];

      // get answer
      switch (probtype){
        case 'addition':
          answer = numA + numB;
          break;

        case 'subtraction':
          // in the case of subtraction, lets just put the larger number on top for now so we don't have to deal with negative numbers.
          if (numA < numB) {
            var tmpA = numA;
            numA = numB;
            numB = tmpA;
          }
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
        'answer': answer,
        'input': ''
      });
    };
  }

  if(operands.setBy === 'maxAnswer') { // TODO: reword "max answer" to max number, for instances of kids working up to certain numbers.
    // need to figure out this one...
    for(let i = 0; i < count; i++){
      // let numA = getRandomInt(operands.min, operands.max), // get random number in range...
      //     numB = getRandomInt(operands.min, operands.max), // ... of min & max declarations
      //     answer;
      let numA = 0,
          numB = 0,
          answer = getRandomInt(0, operands.max);
      const probtype = (currentProbTypes.length > 1) ? currentProbTypes[Math.floor(Math.random() * currentProbTypes.length)] : currentProbTypes[0];
      const operator = operandSymbols[probtype];

      switch (probtype){
        case 'addition':
          numA = getRandomInt(0, answer);
          numB = answer - numA;
          break;

        case 'subtraction': {
          numA = getRandomInt(0, answer);
          numB = '';
          if (numA < numB) {
            var tmp = numA;
            numA = numB;
            numB = tmp;
          }
          break;
        }

        case 'multiplication':
          answer = numA * numB;
          break;

        case 'division':
          answer = numA / numB;
          break;
        
        default:
          answer = numA + numB;
      }

      // // in the case of subtraction, lets just put the larger number on top for now so we don't have to deal with negative numbers.
      // if(probtype === 'subtraction' && numA < numB) {
      //   var tmp = numA;
      //   numA = numB;
      //   numB = tmp;
      // }

      // // get answer
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
        'answer': answer,
        'input': ''
      });
    };
  }

  return equations;
};

export default null;