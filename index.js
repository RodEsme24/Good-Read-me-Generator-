const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
let genRead = (answers, userPic,userEmail) => {
  return `
  (${userPic})

  Project name:
   # ${answers.title}
​
  Project description
   # ${answers.description} 

  User Email:
   # ${userEmail}
​
   ## Table of Contents 
​
​
   *[installation](#installation)
​
   *[Usage](#usage)
​
   *[License](#license)
​
   *[Constribuating](#constribuating)
​
   *[Test](#tests)
​
   *[Questios](#question)
​
## Intallation
 
    to intall the necessary dependencies, run the following command 
​
    ----
    # ${answers.install}
    ----
  
## Usage
    ---
    #${answers.usage}
    ---
​
## License
​
the licenses are:
# ${answers.license}
   
​
## Contributing
​
    #${answers.contributing}
​
## Tests
   what is the command to run test 
    
   ---
   # ${answers.test}
   ---
   
   
   `;
}

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

function notifyPrompt() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project name?",
    },
    {
      type: "input",
      name: "description",
      message: "please write a short description of your please",
    },
    {
      type: "list",
      message: "what kind of license should your project have?",
      name: "license",
      choices: ["none", "all of them", "both a and b"],
    },
    {
      type: "input",
      name: "install",
      message: "what command should be run to install dependenices? (npm i)",
    },
    {
      type: "input",
      name: "test",
      message: "what command should be run to run tests? (npm test)",
    },
    {
      type: "input",
      message: "what does the user need to know about using the repo?",
      name: "usage",
    },
    {
      type: "input",
      message:
        "What does the user need to know about contributing to the repo?",
      name: "contributing",
    },
    {
      type: "input",
      message: "Enter your GitHub username:",
      name: "user",
    },
  ]);
}

notifyPrompt().then(function (answers) {
  let endPoint = " https://api.github.com/users/" + answers.user
  var generated;
  axios(endPoint).then(res=>{
    let userPic = res.data.avatar_url;
    let userEmail = res.data.email;
    const readMe = genRead(answers, userPic, userEmail);
    generated = writeFileAsync("readmeGenerated.md", readMe)
  })
  return generated;
});