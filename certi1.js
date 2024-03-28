// Imports
const prompt = require('prompt-sync')(); // Import prompt-sync module for user input
const fs = require('fs'); // Import fs module for file system operations

// Variable Declarations
const quizList = []; // Array to store the list of quizzes
let currentQuiz = null; // Variable to track the current quiz (null if no quiz is in progress)
let score = 0; // Variable to track the player's score
let highScore = 0; // Variable to track the player's highest score

// Functions
function start() {
  // Display a message indicating the start of the game
  console.log("Game starts.");

  // Display the main menu
  mainMenu();
}

  function mainMenu() {
    console.log("**Main menu**");
    console.log(`
    1. Create Quiz
    2. Edit Quiz
    3. Delete Quiz
    4. Play Quiz
    5. Save quiz to json file
    6. Finish Game (when the input is "q")
    `);

    const option = prompt();
 
  
    switch (option) {
      case "1":
        createQuiz();
        break;
      case "2":
        editQuiz();
        break;
      case "3":
        deleteQuizFromFile(prompt("Write the name of Quiz you want to delete:")); //// Calls the deleteQuizFromFile() function, passing the user-provided quiz name for deletion.
        break;
      case "4":
        playQuiz();
        break;
      case "5":
        saveQuizToFile();
        break;
      
      case "q":
        console.log("**게임 종료**");
        return;
      default:
        console.log("잘못된 입력입니다. 다시 선택해주세요.");
        mainMenu();
    }
  }

// 퀴즈 생성 함수
function createQuiz() {
  const quizName = prompt("퀴즈 이름을 입력하세요.");
  const newQuiz = {
    name: quizName,
    questions: [],
  };
  quizList.push(newQuiz);
  currentQuiz = newQuiz;
  console.log(`퀴즈 "${quizName}"이 생성되었습니다.`);
  editQuestions();
}


function findQuizByName(quizName) {
    for (const quiz of quizList) {
      if (quiz.name === quizName) {
        return quiz;
      }
    }
    return null;
  }

// 퀴즈 편집 함수
function editQuiz() {
  const quizName = prompt("편집할 퀴즈 이름을 입력하세요.");
  const quiz = findQuizByName(quizName);
  if (!quiz) {
    console.log(`퀴즈 "${quizName}"이 존재하지 않습니다.`);
    return;
  }
  currentQuiz = quiz;
  editQuestions();
}


// 질문 추가/편집/삭제 함수
function editQuestions() {
  while (true) {
    console.log(`
    1. Add question
    2. Edit question
    3. Delete question
    4. Finish editing 
    `);

    const option = prompt();

    switch (option) {
      case "1":
        addQuestion();
        break;
      case "2":
        editQuestion();
        break;
      case "3":
        deleteQuestion();
        break;
      case "4":
        console.log("퀴즈 편집 완료.");
        mainMenu();
        return;
      default:
        console.log("잘못된 입력입니다. 다시 선택해주세요.");
    }
  }
}

function addQuestion() {
    // Prompt the user to enter the question text. Explains that the user's input for the question text is stored in the questionText variable.
const questionText = prompt("Write a question: ");
const answerOptions = [];//Initializes an empty array to store answer options.
let answerCount = parseInt(prompt("Write the numbers of answers: "));// Prompt the user to enter the number of answers (between 1 and 4). Prompts the user for the number of answers and stores it in the answerCount variable after parsing it to an integer.
while (answerCount < 1 || answerCount > 4) {
  answerCount = parseInt(prompt("The numbers of answers are between one and four. Please try again: "));
}//A loop that ensures the number of answers is between 1 and 4.

// Loop through each answer and prompt the user to enter the text. A loop that iterates through the number of answers and prompts the user to enter each one.
for (let i = 0; i < answerCount; i++) {
  answerOptions.push(prompt(`Write the answer number ${i + 1}: `));
}
// Prompts the user for the number of the correct answer and stores it in the correctAnswer variable after adjusting for the 0-based index.In JavaScript, arrays are indexed from 0.This means the first element is at index 0, the second at index 1, and so on.
const correctAnswer = parseInt(prompt("Put the number of correct answer: ")) - 1;

//Prompts the user for the point value of the question and stores it in the point variable
const point = parseInt(prompt("Put the point of this question: "));

//Creates a new question object using the collected information.
const question = {
text: questionText,
answerOptions,
correctAnswer,
point, 
};


// Find the index of the current quiz in the quizList.It is to find the current quiz index
const currentQuizIndex = findQuizIndex(currentQuiz.name);

// Add the new question to the questions array of the current quiz in quizList (explains that the code to add the question to the quiz list)
quizList[currentQuizIndex].questions.push(question);
// Display a message indicating that the question was added
console.log("Question added successfully."); 
}




// This function edits an existing question in the quiz
function editQuestion() {
  // Prompt the user to enter the index of the question they want to edit (starting from 1). Prompts the user for the index of the question to edit and stores it in the questionIndex variable after adjusting for the 0-based index.
    const questionIndex = parseInt(prompt("Enter the number of question you want to edit: ")) - 1;
  
    
  // Checks if the entered index is valid and displays an error message if it's not.
    if (questionIndex < 0 || questionIndex >= currentQuiz.questions.length) {
      console.log("Invalid question number. Please try again.");
      return;
    }
  
  // Get the question  at the specified index
    const question = currentQuiz.questions[questionIndex];

  
  // Prompts the user to edit the question text and updates the object property.
    question.text = prompt("Edit the question text: ", question.text);

  // Loop through each answer option and prompt the user to edit it
    for (let i = 0; i < question.answerOptions.length; i++) {
      question.answerOptions[i] = prompt(`Edit answer number ${i + 1}: `, question.answerOptions[i]);
    }
    
    // Prompt the user to edit the number of the correct answer (index starts from 0). Prompts the user to edit the number of the correct answer and updates the object property after adjusting for the 0-based index.
    question.correctAnswer = parseInt(prompt("Edit the number of the correct answer: ", question.correctAnswer)) - 1;
  
// Find the index of the current quiz in the quizList
const currentQuizIndex = findQuizIndex(currentQuiz.name);

// Update the question object in the questions array of the current quiz in quizList
quizList[currentQuizIndex].questions[questionIndex] = question;

// Display a message indicating that the question was edited
console.log("Question edited successfully!"); 
  }
  



// This function deletes a question from the quiz
function deleteQuestion() {
  //// Prompt the user to enter the index of the question to delete (starting from 1).Prompts the user for the index of the question to delete and stores it in the questionIndex variable after adjusting for the 0-based index.
  const questionIndex = parseInt(prompt("Enter the number of the question to delete: ")) - 1;
  if (questionIndex < 0 || questionIndex >= currentQuiz.questions.length) {
    console.log("Invalid question number. Please try again.");
    return;
  }//Checks if the entered index is valid and displays an error message if it's not.

  // Prompt the user for confirmation before deleting the question
  const confirmation = prompt("Are you sure you want to delete this question? (y/n): ");
  // Delete the question if the user confirms
  if (confirmation === "y") {
    // Find the index of the current quiz in the quizList 
    const currentQuizIndex = findQuizIndex(currentQuiz.name);

    // Delete the question from the questions array of the current quiz in quizList
    quizList[currentQuizIndex].questions.splice(questionIndex, 1);

// Display a message indicating that the question was deleted
    console.log("Question deleted successfully!"); 
  } else {
    console.log("Question deletion cancelled.");
  }
}

//The .splice(questionIndex, 1) part applies the splice method to the questions array within the current quiz object.
//splice is a built-in JavaScript function that modifies an array by removing elements.
//The first argument (questionIndex) specifies the starting index at which to delete elements.
//The second argument (1) indicates the number of elements to remove. In this case, it only removes one element.



// This function finds the index of a quiz in the quizList by its name 
function findQuizIndex(quizName) {
// Find the index of the quiz with the matching name in quizList. Uses the findIndex method to find the index of the quiz with the matching name in the quizList array.
return quizList.findIndex((quiz) => quiz.name === quizName);
}

//(quiz) => quiz.name === quizName: This part defines an anonymous callback function (also called an arrow function) that findIndex uses to evaluate each element (quiz) in the quizList array.
//quiz: This parameter represents each element (quiz object) that findIndex iterates through in the quizList array.
//quiz.name === quizName: This is the test condition within the callback function. It checks if the name property of the current quiz object (quiz) matches the value of the quizName argument passed to the findQuizIndex function.
//4. Returning the Index:

//return ...: This line returns the value obtained from the findIndex method.
//If a quiz is found that matches the quizName, findIndex returns the index of that quiz within the quizList array.
//If no matching quiz is found, findIndex returns -1.




  function deleteQuizFromFile(quizName) {
    // **Reads the JSON file containing the quizzes** This line reads the "quiz.json" file and stores its contents in the data variable.
     fs.readFile("quiz.json", (err, data) => {
       // **Checks for errors while reading the file**:This line checks if there were any errors during the file read operation and displays an error message if necessary.
       if (err) {
         console.error(`Error reading file: ${err.message}`);
         return;// Exit the function if an error occurs
       }
   
     // **Parses the JSON string into a JavaScript object**This line converts the JSON string from the file into a JavaScript object named jsonData.
       const jsonData = JSON.parse(data);
   
       // **Finds the index of the quiz with the matching name**This line uses the findIndex method to find the index of the quiz with the matching quizName in the jsonData array.
       const quizIndex = jsonData.findIndex((quiz) => quiz.name === quizName);
   
       // **Checks if the quiz was found**This line checks if the quiz was found and displays an error message if it wasn't.
       if (quizIndex === -1) {
         console.error(`Quiz "${quizName}" does not exist.`);
         return;// Exit the function if the quiz was not found
       }
   
       // **Deletes the quiz from the jsonData array at the specified index**This line removes the quiz from the jsonData array at the specified index.
       jsonData.splice(quizIndex, 1);
 
       // **Creates a new array containing only the name and questions properties of each quiz object**Creates a new array: This line creates a new array named updatedQuizList containing only the name and questions properties of each quiz object in jsonData.
     const updatedQuizList = jsonData.map((quizData) => ({
       name: quizData.name,
       questions: quizData.questions,
     }));
  
     // **Writes the updated quiz list to the JSON file**This line writes the updated quiz list back to the "quiz.json" file.
       fs.writeFile("quiz.json", JSON.stringify(jsonData, null, 2), (err) => {
         if (err) {
           console.error(`Error writing file: ${err.message}`);//This line checks for any errors during the file write operation and displays an error message if necessary.
           return;// Exit the function if an error occurs
         
         }
         
   // **Displays a message indicating that the quiz was deleted**//This line displays a message indicating that the quiz was deleted successfully.
         console.log(`Quiz "${quizName}" deleted from JSON file.`);
         mainMenu(); // **Calls the mainMenu function to return to the main menu.This line calls the mainMenu function to return the user to the main menu of the application.
       });
     });
   }
   
  

function playQuiz() {
  // **Gets the quiz name from the user**Prompts the user to enter the name of the quiz they want to play.
  const quizName = prompt("Write the quiz name you want to play: ");

  // **Finds the quiz with the matching name**Finds the quiz with the matching name in the quizList array.
const selectedQuiz = quizList.find((quiz) => quiz.name === quizName);

  // **Displays an error message if the quiz was not found**Displays an error message if the quiz was not found.
  if (!selectedQuiz) {
    console.log(`Quiz "${quizName}"does not exist.`);
    return;
  }

 // **Initializes the score** Initializes the score variable to 0.
  let score = 0;
  // **Iterates through each question in the selected quiz**Iterates through each question in the selected quiz.
for (const question of selectedQuiz.questions) {

  // **Initializes the answer**Initializes the answer variable to an empty string.
  let answer = "";

// **Loops until the user enters a valid answer**Loops until the user enters a valid answer number (1-4).
  while (!answer) {
    //**Displays the question and answer options**Displays the question text and answer options for the current question.
    console.log(question.text);

    for (let i = 0; i < question.answerOptions.length; i++) {
      console.log(`${i + 1}. ${question.answerOptions[i]}`);
    }

  // **Gets the user's answer**Prompts the user to enter the number of their answer.
    const input = prompt("put the number of your answer: ");

  // **Validates the user's answer**Validates the user's answer and stores it in the answer variable.
    if (/[1-4]/.test(input)) {
      answer = question.answerOptions[parseInt(input) - 1];
    } else {
      console.log("The number does not exist. Please try agian.");
    }
  }////****This code snippet ensures the user enters a valid answer number (1-4) for the current question. It displays the question and answer options, prompts for user input, validates the input, and stores the chosen answer if valid. If the input is invalid, it displays an error message and repeats the loop until a valid answer is provided

// **Displays the user's answer**Displays the user's answer to the console.
  console.log(`\n**User's answer:** ${answer}`); 

  // **Checks if the answer is correct**Checks if the user's answer is correct and updates the score accordingly.
  if (answer === question.answerOptions[question.correctAnswer]) {
    score += question.point; 
    console.log(`**Correct answer! (Earned points: ${question.point})**`);
  } else {
    console.log("**It's wrong answer.**");
  }
}

// **Updates the quiz score**Updates the score property of the selected quiz object.
selectedQuiz.score = score;

// **Updates the highest score**Updates the highestScore property of the selected quiz object.
if (!selectedQuiz.highestScore || score > selectedQuiz.highestScore) {
  selectedQuiz.highestScore = score;
}


// **Displays the quiz result and highest score**Displays the quiz result and highest score to the console.
console.log(`Quiz "${quizName}" Result: ${score} / ${selectedQuiz.questions.length}`);
console.log(`Highest score: ${selectedQuiz.highestScore}`);

// **Returns to the main menu** Calls the mainMenu function
mainMenu();


}

function saveQuizToFile() {
    // **Gets the file name from the user**Prompts the user to enter the file name for saving the quiz data. The default filename is "quiz.json" if the user leaves it blank.
    const fileName = prompt("Write the file name (example: myQuiz.json): ") || "quiz.json";
  
    // **Converts the quiz list to a JSON string**Uses the JSON.stringify function to convert the quizList object (containing all quizzes) into a JSON string. The null parameter indicates that no replacer function is used, and the 2 parameter specifies 2 spaces for indentation to improve readability of the generated JSON.
    const jsonData = JSON.stringify(quizList, null, 2);  // jsonData holds the string representation of the quiz list converted to JSON format.
  
    // **Writes the JSON string to a file**Uses the fs.writeFile function to write the generated JSON string to a file with the specified name (fileName).

    fs.writeFile(fileName, jsonData, (err) => {
      if (err) { //Checks for any errors during the file writing process. If an error occurs, an error message is displayed to the console.


        console.error("Saving is not successful:", err.message);
        return;
      }
  
      console.log(`The quiz is successfully saved in file "${fileName}".`);//Success message: If the file is saved successfully, a message is displayed to the console indicating the file name and location.
      mainMenu();// Calls the mainMenu function to return to the main menu of the application.
    });
  }

  

start();