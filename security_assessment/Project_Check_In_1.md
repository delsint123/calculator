## Items Completed
  1. Implemented Encapsulation for global variables: \
    Previously, 3 major variables were declared and initialized globally which allowed for easy access to some of the main functionalities of the calculator. By encapsulating all of these variables in a class complete with getters and setters, it is difficult for hackers to inject their code into my program. Integrating encapsulation also allows for fewer endpoints within the logic of the program.

  2. Integrating Type Checking: \
    One of the major things I learned is to type check my variable to ensure that if a hacker is attempting to inject code, that the input is checked prior to running. Within the new class that holds all of my important variables, I implemented type checking to ensure that I am only getting a specfic range of data from the user. The integration of type checking constructs a layer of protection from code injection. 

### Commits for every variable encapsulated and type checking integrated:
  https://github.com/delsint123/calculator/commit/226d0ee04d3dd08208fadceeb1b122f9253eadf7
  https://github.com/delsint123/calculator/commit/7fab1ee97d76b490575048f2d32e325a8298ca37
  https://github.com/delsint123/calculator/commit/245c1968513a5dfbb03ba8ad245aa4f077da9c76

## Items to be Completed
  1. Reducing Global Variables that are present in the logic of the code. \
    Priority: High \
    Difficulty: Moderate 
  2. Checking and Veryifying floating point math. \
    Priority: Medium \
    Difficulty: Moderate 
  3. Standare Unit Testing needs to be implemented.\
    Priority: Medium \
    Difficulty: Easy 
  4. Identify and secure vulnerable Javascript Libraries utilized. \
    Priority: Medium \
    Difficulty: Difficult
