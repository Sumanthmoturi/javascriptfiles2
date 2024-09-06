//Regular Expresssion chapter


//Literal syntax-   /Pattern/modifiers
let a = /sumanth/;
console.log(a);


//Constructor syntax-    new RegExp("Pattern","modifiers")
let b=new RegExp("Kumar");
console.log(b)


//Regular expression modifiers
/*
g-global search
i-caseinsensitive matching
m-multiline matching
u-unicode matching
s-dot matches newlines
y-sticky matching
*/
let c=/abc/i
console.log(c);



//Regular Expression Brackets
/*
[abc]-find any character inside brackets
[^abc]-find any character,not inside brackets
[0-9]-find any of digits inside brackets
[^0-9]-find any of digits,not inside brackets
(x|y)-find alternatives between x or y seperated with |
*/
let d=/[abc]/
console.log(d)



//test method=If you pass it a string, it will return a Boolean telling you whether the string contains a match of the pattern in the expression.
let example1=/abc/
console.log(example1.test("abcdex"))

let example2=/[abc]/
console.log(example2.test("ahiuy"))
console.log(example2.test("eewer"))

let example3=/[0123456789]/
console.log(example3.test("in 1992"));

let example4=/[0-9]/
console.log(example4.test("in 1992"));



//metaCharacters-characters with special meaning
/*
\-finds single character except line terminator or new line
\w-finds alphanumneric character
\d-finds any digits
\s-whitespace characters
...
..
*/
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20"));
console.log(dateTime.test("30-jan-2003 15:20"));



//Finding international characters- \p
/*
\p{L}-matches any letter
\p{N}-matches any numeric character
\p{P}-matches any punctuation character
*/
console.log(/\p{L}/u.test("!avc"));
console.log(/\p{N}/u.test("2i89")); 


//+ sign- matches one or more occurences of preceding element
console.log(/\d+/.test("123"));
console.log(/\d+/.test("a23")); 
//*sign- matches zero or more occurences of preceding element
console.log(/\d*/.test(""));
console.log(/\d*/.test("123")); 
//(?) question mark-makes preceding optional
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
console.log(neighbor.test("neighbor")); 



//Quantifiers-used to define quantities occurence
let example5=/\d{2}/
console.log(example5.test("12"))
console.log(example5.test("1aa"))

let example6=/\d{1,2}/
console.log(example6.test("9")); 
console.log(example6.test("123")); 



//exec and match methods
let example7 = /\d+/.exec("one two 100");
console.log(example7); 
console.log(example7.index);
console.log("one two 100".match(/\d+/));



//Capturing and non-capturing groups
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); 
console.log(/bad(ly)?/.exec("bad"));          // output will be ["bad", undefined]
console.log(/(\d)+/.exec("123"));             // output will be ["123", "3"]
console.log(/(?:na)+/.exec("banana"));        // output will be  ["nana"]



//Dates concept
console.log(new Date())      //Getting current date and time
console.log(new Date(2009,11,9))    //Getting specific date and time
console.log(new Date(2009,11,9).getTime())    //Date to Timestamp
console.log(new Date(126029700000))   //Converting timestamp to date
console.log(Date.now())        //Getting current timestamp
//Extracting date components
let date=new Date(2024,9,7)
console.log(date.getFullYear())
console.log(date.getMonth())
console.log(date.getDate())
console.log(date.getHours())
//Creating date from a string
function getDate(string) {
    let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
  }
console.log(getDate("1-30-2003"));
  

//Boundaries and Look-ahead
console.log(/^hello/.exec("hello world"))   // ^boundary
console.log(/hello$/.exec("say hello"))     //$boundary
console.log(/\bcat\b/.test("cat"))      // \bBoundary
console.log(/\bcat\b/.test("cats"))     // \bBoundary
console.log(/a(?=e)/.exec("braeburn"))  // look-ahead(?=and)
console.log(/a(?! )/.exec("a b"))       //Negative look-ahead (?!)
let animalCount = /\d+ (pig|cow|chicken)s?/;    //Pipe (|)
console.log(animalCount.test("15 pigs"));  



//Backtracking
console.log(/^([01]+b|\d+)$/.exec("101"));



//Replace method in string and Regular Expressions
console.log("papa".replace("p", "m"));               // in String
console.log("Borobudur".replace(/[ou]/, "a"));       //in Regular Expression
console.log("Liskov, Barbara".replace(/(\w+), (\w+)/, "$2 $1"));  // Matched groups replacing

let stocks = "1 lemon, 2 cabbages, and 101 eggs";
function remove1(match,price,item) {
    price=Number(price) - 1
    if (price===1) {
        item=item.slice(0,-1);

    } else if (price===0) {
        price="no"
    }
    return price + " " + item 
    }
console.log(stocks.replace(/(\d+) (\w+)/g,remove1))    //Usinf function in Replace



//Greedy matching
let code = "1 /* comment */ + /* another comment */ 1";
function stripCommentsGreedy(input) {
  return input.replace(/\/\*.*\*\//, "");
}
console.log(stripCommentsGreedy(code)); 
//Non greedy matching
function stripCommentsNongreedy(input) {
    return input.replace(/\/\*.*?\*\//g, "");
  }
console.log(stripCommentsNongreedy("1 /* comment */ + /* another */ 1"));



//Creating Regular Expression Dynamically
let name1 = "harry";
let regexp = new RegExp("(^|\\s)" + name1 + "($|\\s)", "gi");      //Creating Regular Expression
console.log(regexp.test("Harry is a dodgy character."));


let name2 = "dea+hl[]rd";
let escaped = name2.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let regexp1 = new RegExp("(^|\\s)" + escaped + "($|\\s)","gi");     //When varaible has special characters while creating Regular Expression 
let text = "This dea+hl[]rd guy is super annoying.";
console.log(regexp1.test(text));



//Search method
console.log("   word".search(/\S/));



//lastIndex property-only works when it has gloabal(g) and y(sticky) flag
let pattern = /y/g;
pattern.lastIndex = 6;
console.log(pattern.exec("xyzzyzzy").index);



//matchAll() method-returns all matched patterns of reg exp in a string.It returns iterable object as well,You can loop through all matches
let sample = "A string with 42 and 88.".matchAll(/\d+/g);
for (let main of sample) {
  console.log(main[0]);
}



//parseINI
function parseINI(string) {
    let result = {};
    for (let line of string.split(/\r?\n/)) {
      // Parse key-value or section headers
    }
  }
//Example
function parseINI(string) {
    // Start with an object to hold the top-level fields
    let result = {};
    let section = result;
    for (let line of string.split(/\r?\n/)) {
      let match;
      if (match = line.match(/^(\w+)=(.*)$/)) {
        section[match[1]] = match[2];
      } else if (match = line.match(/^\[(.*)\]$/)) {
        section = result[match[1]] = {};
      } else if (!/^\s*(;|$)/.test(line)) {
        throw new Error("Line '" + line + "' is not valid.");
      }
    };
    return result;
  }
console.log(parseINI(`name=Vasilis[address]city=Tessaloniki`));

 