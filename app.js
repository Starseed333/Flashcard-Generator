console.log("inside app.js");


var ClozeCard = require("./ClozeCard.js");

var BasicCard = require("./BasicCard.js");
//Include Inquirer 
var inquirer = require("inquirer");
var fs = require("fs");


//------------------------------------------Initiate Questions-----------------------------------------

function newQuestion(){
inquirer.prompt([{

        type: "list",
        name: "type",
        message: "Would you like to create a Flashcard today or review past Flashcards?",
        choices: ["Create Basic Card", "Create Cloze Card", "Review!"]

}]).then(function(user) {
    if (user.type === "Create Basic Card") {
        newBasicCard();
    }
    else if (user.type === "Create Cloze Card"){
        newClozeCard();
    }
    else{
        reviewCards();
    }
});
}
newQuestion();

//--------------------------------------Basic Card Function------------------------------------------

function newBasicCard(){
  return inquirer.prompt([
        {
            type: "input",
            name: "front",
            message: "What is the question to put on the front of the card?"
        },
        {
            type: "input",
            name: "back",
            message: "What is the answer to place on the back of the card?"
        }
      ]).then(function(basicInfo) {

          
        //Constructor Instance
        newBasic = new BasicCard(basicInfo.front, basicInfo.back);
            console.log(newBasic);

            
          //Append the output to flashcards.txt
          fs.appendFile("flashcards.txt", JSON.stringify(newBasic)+ '\r\n', function(err) {
            if (err) {
              console.log(err);
              }
          });
          inquirer.prompt([
            {
              type:"confirm",
              name:"confirm",
              message:"Would you like to write another card?",
              default: true
            }
          ]).then(function(userConfirm){
            if(userConfirm.confirm === true){
              newBasicCard();
            }else{
              newQuestion();
            }
          });
        });
}

//--------------------------------------Cloze Card Function------------------------------------------

function newClozeCard(){
  return inquirer.prompt([
          //ask for close card info
          {
            type: "input",
            name: "text",
            message: "Please enter the full text statement."
          },
          {
              type: "input",
              name: "cloze",
              message: "Please state which words of the sentence you would like to omit for review."
          },
          {
              type: "input",
              name: "partial",
              message: "Now enter the partial text omitting the cloze from the previous question."
          },
        ]).then(function(clozeInfo) {
          //add to constructor
          newCloze = new ClozeCard(clozeInfo.text, clozeInfo.cloze, clozeInfo.partial);
            console.log(newCloze);
            //Append the output to flashcards.txt
          fs.appendFile("flashcards.txt", JSON.stringify(newCloze)+ '\r\n' , function(err) {
            if (err) {
              console.log(err);
              }
          });
          inquirer.prompt([
            {
              type:"confirm",
              name:"confirm",
              message:"Do you want to write another card?",
              default: true
            }
          ]).then(function(userConfirm){
            if(userConfirm.confirm === true){
              newBasicCard();
            }else{
              newQuestion();
            }
          });
        });
}

//--------------------------------------Review Card Function------------------------------------------
//Display the flashcards to the user for review
function reviewCards (){
  fs.readFile("flashcards.txt", "utf8",function (err, data){
    if (err){
      throw err;
    }
    console.log("==================================================================================")
    console.log("[" + data + "]");
  });
}




