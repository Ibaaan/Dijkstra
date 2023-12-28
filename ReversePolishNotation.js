function infixToRPN(infix) {
    const precedence = {
      '^': 4,
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2,
      '(': 1
    };
  
    let outputQueue = "";
    let operatorStack = [];
    let tokens = infix.match(/\d+|[+*/^()-]/g);
  
    tokens.forEach(token => {
      if (token.match(/^\d+$/)) {
        outputQueue += token + " ";
      } else if ('^*/+-'.indexOf(token) !== -1) {
        while (operatorStack.length > 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
          outputQueue += operatorStack.pop() + " ";
        }
        operatorStack.push(token);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        let topToken = operatorStack.pop();
        while (topToken !== '(') {
          outputQueue += topToken + " ";
          topToken = operatorStack.pop();
        }
      }
    });
  
    while (operatorStack.length > 0) {
      outputQueue += operatorStack.pop() + " ";
    }
  
    return outputQueue.trim();
}
  
function evaluateRPN(rpn) {
    let stack = [];
  
    rpn.split(/\s+/).forEach(token => {
      if (token.match(/^\d+$/)) {
        stack.push(parseFloat(token));
      } else {
        const [b, a] = [stack.pop(), stack.pop()];
        switch (token) {
          case '+': stack.push(a + b); break;
          case '-': stack.push(a - b); break;
          case '*': stack.push(a * b); break;
          case '/': stack.push(a / b); break;
          case '^': stack.push(Math.pow(a, b)); break;
          default:
            throw "Unsupported operation: " + token;
        }
      }
    });
  
    return stack.pop();
}
let fs = require('fs');
const infixExpression = fs.readFileSync("input.txt").toString();
const rpnExpression = infixToRPN(infixExpression);
const result = evaluateRPN(rpnExpression);
  
  
fs.writeFileSync("output.txt", `Result => ${result} \nReversed Polish Notation => ${rpnExpression}`);