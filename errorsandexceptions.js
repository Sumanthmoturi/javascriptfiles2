//Errors and Exception Chapter topics


//1.Strict mode:-"use strict" to catch more errors,bugs
function canYouSpotTheProblem() {
    "use strict";
    for (counter = 0; counter < 10; counter++) {
      console.log("Happy happy");
    }
  }
canYouSpotTheProblem(); //Here varible is undeclared/Undefined,So throws error 



//2.Using new keyword in constructor functions is important,Otherwise thros an error in Strict mode  
"use strict";
function Person(name) { 
  this.name = name; 
}

let ferdinand = new Person("Ferdinand");
console.log(ferdinand.name);


//3.Exceptions:-Exceptions are way to handle errors that occurs during program execution
//Creating/Throwing exception:-Using throw keyword
//Handling Exceptions:-Using try-catch block

function checkNumber(number) {
    if (number < 0 || number > 100) {
      
      throw new Error("Number must be between 0 and 100");
    }
    return "Number is valid";
  }
  
  try {
    console.log(checkNumber(150));
  } catch (error) {
    console.log("Error:", error.message);
  }


//4.Assertions
function firstElement(array) {
    if (array.length == 0) {
      throw new Error("firstElement called with an empty array");
    }
    return array[0];
  }
  
  try {
    console.log(firstElement([1, 2, 3])); 
    console.log(firstElement([]));        
  } catch (error) {
    console.log(error.message); 
  }

//5.Exercises in this chapter
//1
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  while (true) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log("Retrying due to error:", e.message);
      } else {
        throw e;
      }
    }
  }
}
console.log(reliableMultiply(8, 8));

//2
const box = new class {
  locked = true;
  #content = [];

  unlock() { this.locked = false; }
  lock() { this.locked = true;  }
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
};

function withBoxUnlocked(body) {
  // Store the initial lock state
  const initiallyLocked = box.locked;

  // Unlock the box
  if (box.locked) {
    box.unlock();
  }

  try {
    // Run the function
    body();
  } finally {
    // Ensure the box is locked again, only if it was initially locked
    if (initiallyLocked) {
      box.lock();
    }
  }
}
// Test withBoxUnlocked
withBoxUnlocked(() => {
  box.content.push("gold piece");
});
try {
  withBoxUnlocked(() => {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
