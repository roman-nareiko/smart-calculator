class SmartCalculator {
  constructor(initialValue) {
    this._value = initialValue;
  }

  add(number) {
    this._value += ` + ${number}`;
    return this;
  }
  
  subtract(number) {
    this._value += ` - ${number}`;
    return this;
  }

  multiply(number) {
    this._value += ` * ${number}`;
    return this;
  }

  devide(number) {
    this._value += ` / ${number}`;
    return this;
  }

  pow(number) {
    this._value += ` ^ ${number}`;
    return this;
  }

  transform() {

  }
  
  to_rvn(value) {
    let expression = value.split(" ");
    let output_stack = [];
    let operations_stack = [];
    let priorities = new Map();

    priorities.set('^', 3);
    priorities.set('*', 2);
    priorities.set('/', 2);
    priorities.set('-', 1);
    priorities.set('+', 1);

    expression.forEach(element => {
      if(!priorities.has(element)) {
        output_stack.push(element);
      }else {
        if(operations_stack.length > 0) {
          let latest = operations_stack[operations_stack.length - 1];
          let current_priority = priorities.get(element);

          while(current_priority <= priorities.get(latest) && current_priority !== 3) {
            output_stack.push(operations_stack.pop());
            latest = operations_stack[operations_stack.length - 1];
          }
        }

        operations_stack.push(element);
      }
    });
    
    while(operations_stack.length > 0) {
      output_stack.push(operations_stack.pop());
    }

    return output_stack;
  }

  from_rvn(rvn) {
    let result = 0;
    let stack = [];
    let operators = new Map();

    operators.set('^', (a, b) => Math.pow(a, b));
    operators.set('*', (a, b) => a*b);
    operators.set('/', (a, b) => a/b);
    operators.set('+', (a, b) => a+b);
    operators.set('-', (a, b) => a-b);


    rvn.forEach(element => {
      let current_element = parseInt(element);

      if(Number.isInteger(current_element)) {
        stack.push(current_element);
      }else {
        let [right, left] = [stack.pop(), stack.pop()];
        let res = operators.get(element)(left, right);
        
        stack.push(res);
      }
    });

    return stack[0];
  }

  toString() {
    let rvn = this.to_rvn(this._value);
    let _ = rvn.join();
    let result = this.from_rvn(rvn);

    return result;
  }
}

module.exports = SmartCalculator;
