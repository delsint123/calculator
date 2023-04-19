## Security Issues fixed
* __Touch up on code issues with global variables and floating point precision:__ \
There were still some glabal variables that were present in my code. To improve the security of these variables, I encapsulated them within the functions of the logic so that they could not be easily accessed using the console. I also noticed that there was a global variable "container" that was declared but never utilized, so I also decided to remove that. The DOM accessors to the buttons and the display were deleted as global variables and declared and initialized inside the functions of the code. Removing these variables as global variables reduces the ris and the capability of hackers being able to manipulate and inject code into the program. Integrating encapsulation also allows for fewer endpoints within the logic. I also took another look at the floating point precision of the floating point math of the program. I was reassured that this was mainly handled in the beginning of development with the "roundDecimals" function. However, I did need to add the utilization of this function to the add function to ensure that the math would output correct values. The roundDecimals function had already been implemented into the other operation functions.\
\
https://github.com/delsint123/calculator/commit/7100cbbffe7636d43b4532ebb6760d4649d794b1 \
https://github.com/delsint123/calculator/commit/61c085fab99cb8f204b9c31b2faa3ad8aec59129 \
https://github.com/delsint123/calculator/commit/7fb9d6d7307809dfa66e1724951dc6ff894ceb38 

* __Updated Risk Assessment Matrix:__ \
After reviewing some of the vulnerabilities that were in my original code and after learning about some of the security measures that should be taken to imporve the secuirty of a program, I decided to reevaluate and add more items to my Risk Assessment Matrix. I felt that the items should be documented as some of the risks of the current program. Although one has been fixed, the other still needs to be implemented in a future iteration of updates. Specifically I added the following 2 items:

>>Lack of security policy makes the software more susceptible to threats. \
>>Lack of unit testing may hide vulnerabilites that persist in the logic of the program.

https://github.com/delsint123/calculator/blob/main/security_assessment/Calculator%20Project%20-%20RiskAssessmentMatrix%20-%20V2.pdf

* __Established Security Policy and enable Code Scanning:__ \
Github offers some methods in improving the security of a program and a repository. To improve the security of the program I set up a Security Policy to inform users about the current state of the program. This includes any vulnerabilities that we are aware of and how users can submit any vulnerabilites that they might find while using the program or reviewing the code. The security policy linked below describes these concepts in further detail. In addition, Github also has a Code Scanning functionality that uses CodeQL to scan for any vulnerabilities that may exist in the files of the program. Currently, Github is actively checking for vulnerabilities within my JS file which holds the main logic of my code. The setup of CodeQL and its results are linked below. As of now, no vulnerabilities have been found. \
\
https://github.com/delsint123/calculator/security/policy \
https://github.com/delsint123/calculator/actions/runs/4740003346
