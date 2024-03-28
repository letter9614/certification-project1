// Imports
const prompt = require('prompt-sync')(); // Include a tool called 'prompt-sync' to allow users to type information.
const fs = require('fs'); // Container (array) for storing all the quizzes you create

// Variable Declarations
const quizList = []; // Array to store the list of quizzes
let currentQuiz = null; // Variable to remember the quiz you're working on (empty if you haven't chosen one yet)
let score = 0; // Variable to track the player's score
let highScore = 0; // Variable to track the player's highest score

// Functions
function start() {
    // Display a message indicating the start of the game
    console.log("Game starts.");
  
    // Display the main menu
    mainMenu();
  }
  
  
  function mainMenu() { //Defines a function named mainMenu with no parameters. This function handles displaying the main menu options to the user and processing their selection.
    console.log("**Main Menu**");//Prints the main menu title "Main Menu" to the console.
    console.log(` 
    1. Create Quiz 
    2. Edit Quiz 
    3. Delete Quiz
    4. Play Quiz
    5. Save Quiz to JSON file
    6. Load Quiz from JSON file
    7. End Game (when the input is "q")
    `); // Uses template literals (backticks) to create a multi-line string containing the menu options.
    
        //It uses a special string format (template literals) to create a multi-line menu that displays the available options.The menu offers choices for:Creating a new quiz Editing an existing quiz Deleting a quiz Playing a quiz Saving quizzes to a JSON file Loading quizzes from a JSON file Quitting the game by entering "q" const option = prompt().toLowerCase();//Prompts the user to enter an option from the menu.//.toLowerCase(): Converts the user's input to lowercase for case-insensitive matching in the switch statement.
        
        const option = prompt().toLowerCase();//Prompts the user to enter an option from the menu.//.toLowerCase(): Converts the user's input to lowercase for case-insensitive matching in the switch statement.
  //Implements a switch statement to evaluate the user's input (option) and execute the relevant code section based on the selected option value.
    switch (option) {
      case "1": //If the user entered "1", the createQuiz() function is called to initiate the quiz creation process.
        createQuiz();
        break;//Exits the current case block after executing createQuiz()
      case "2":
        editQuiz();//If the user entered "2", the editQuiz() function is called to handle editing an existing quiz.
        break;//Exits the current case block after executing editQuiz().
      case "3"://If the user entered "3", additional user input is prompted using prompt().
        deleteQuizFromFile(prompt("Write the name of Quiz you want to delete:"));// Calls the deleteQuizFromFile() function, passing the user-provided quiz name for deletion.
        break;//Exits the current case block after executing deleteQuizFromFile().
      case "4"://If the user entered "4", the playQuiz() function is called to start playing a quiz.
        playQuiz();
        break;// Exits the current case block after executing playQuiz().
      case "5"://If the user entered "5", the saveQuizToFile() function is called to save the quiz list to a JSON file.
      saveQuizToFile();
        break;//Exits the current case block after executing saveQuizToFile().
      case "6"://If the user entered "6", the loadQuizFromFile() function is called to load quizzes from a JSON file.
      loadQuizFromFile()
        break;//Exits the current case block after executing loadQuizFromFile().
      case "q"://If the user entered "q", the game ends.
        console.log("**End Game**");//Prints "End Game" message to the console.
        return;//Exits the mainMenu function, effectively ending the program loop.
      default://If the user's input doesn't match any valid option, an error message is displayed.
        console.log("Invalid Input. Please try again.");//Prints an error message prompting the user to re-enter a valid option.
        mainMenu();//Calls the mainMenu function again to re-display the menu options. This creates a loop that continues until the user enters a valid option or "q" to quit.
    }
  }
  
  
  
  // Creates a new quiz and sets it as the current quiz.
  
  function createQuiz() {
    // Prompts the user to enter a quiz name.
    const quizName = prompt("Create a Quiz name: ");
    // Creates a new quiz object with the given name and an empty questions array.
    const newQuiz = { 
      name: quizName,
      questions: [],
    };
    // Adds the new quiz to the list of quizzes.
    quizList.push(newQuiz);
    // Sets the current quiz to the newly created quiz.
    currentQuiz = newQuiz;
    // Logs a message indicating that the quiz was created.
    console.log(`Quiz "${quizName}" is created.`);
    // Opens the question editor for the newly created quiz.
    editQuestions();
  }
  
// Edits an existing quiz with the given name.
function editQuiz() {
    // Prompts the user to enter the name of the quiz they want to edit.
    const quizName = prompt("Put the Quiz name that you want to edit: ");
  
    // Iterates through the list of quizzes to find the quiz with the given name.
    let foundQuiz = null;
    for (let i = 0; i < quizList.length; i++) {
      if (quizList[i].name === quizName) {
        foundQuiz = quizList[i];
        break;
      }
    }
  
    // If no quiz with the given name is found, displays an error message and returns.
    if (!foundQuiz) {
      console.log(`Quiz "${quizName}" does not exist.`);
      return;
    }
  // Sets the current quiz to the found quiz.
    currentQuiz = foundQuiz;
    // Opens the question editor for the found quiz.
    editQuestions();
  }
  
  
  // This function allows users to manage questions in a quiz or similar application
  function editQuestions() {
    // Loop continuously until the user exits
          while (true) {
        // Display a menu with options for adding, editing, deleting questions, or finishing
      
        console.log(`  
        1. Add question
        2. Edit question
        3. Delete question
        4. Finish editing question (or press 'q' to quit)
      `);
  
      // Prompt the user to enter an option and convert it to lowercase for case-insensitive matching. Explains that the user's input is stored in the option variable and converted to lowercase.
         const option = prompt().toLowerCase();
  
    // Use a switch statement to react to different options the user selects.
            switch (option) { //This is where the program figures out what to do based on what you picked.
           case "1": // Call the addQuestion function (implementation not shown here) to add a new question
            addQuestion(); 
            break;//This line uses break to exit the specific code section for the chosen menu option, preventing the program from accidentally running code meant for other options.
  
              case "2": // Call the editQuestion function (implementation not shown here) to edit an existing question
            editQuestion();
            break;
  
             case "3":// Call the deleteQuestion function (implementation not shown here) to remove a question
            deleteQuestion();
            break;
  
              case "4":// Exit the editing loop and return to the main menu (implementation not shown in this code)
            console.log("Finish editing Question.");//the message displayed when the user finishes editing.
            mainMenu();//Indicates that the code calls another function for the main menu.
              return; //Explains that the return statement exits the editQuestions function.
  
             case "q":// Allows the user to exit the program cleanly by entering 'q'.
            console.log("**Game Ended**");
            process.exit(0); // Terminate the process gracefully.this line terminates the program with an exit code of 0.
  
               default:// Handle invalid input by displaying an error message and looping back to the menu.
            console.log("Invalid Input. Please try again.");//Explains the error message displayed for invalid input.
            editQuestions();// In the default case, the function calls itself recursively to restart the menu and prompt for a valid option.
           }
      }
    }
// This function adds a new question to the quiz. describes the overall purpose of the addQuestion function.
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
// Prompt the user to enter the number of the correct answer. Remember, in programming, counting starts from 0, so the first answer is at position 0, the second at position 1, and so on.
const correctAnswer = parseInt(prompt("Put the number of correct answer: ")) - 1;

//This step asks the user to define the point value for the question, which will be saved in the point variable."
const point = parseInt(prompt("Put the point of this question: "));

//This code builds a new question object by assembling all the details you provided (text, answers, etc.).
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
   //// We need to adjust for computer logic! Tell us which question to delete by entering its number. In programming, counting starts from 0, so the first question is 0, the second is 1, and so on."
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

 //We use .splice() here to remove the question. It removes the question you chose (at index questionIndex) from the quiz questions.."
//TTo delete the chosen question, we use .splice(). This method modifies the questions array inside the quiz object. Here, .splice(questionIndex, 1) removes the question at the specified index (questionIndex) and only one question (indicated by the 1)
//The first argument, questionIndex, indicates the position (adjusted for 0-based indexing) from where to start removing elements in the array.
//The second argument, 1, specifies the number of elements to be removed. In this case, we only want to remove one question (the one at the chosen index)."


// This function finds the index of a quiz in the quizList by its name 
function findQuizIndex(quizName) {
    // Find the index of the quiz with the matching name in quizList. Uses the findIndex method to find the index of the quiz with the matching name in the quizList array.
    return quizList.findIndex((quiz) => quiz.name === quizName);
  }
  
  //This part of the code finds a specific quiz by name. It does this like a search function:Check each quiz: It looks at each quiz (represented by quiz) in your quiz list (quizList).Match the name: It checks if the name of the current quiz (quiz.name) matches the name you provided (quizName).Return the index: If there's a match, it returns the position (index) of that quiz in the list.Not found? -1: If no quiz matches the name, it returns -1 (like a "not found" code).
  
  
  
    function deleteQuizFromFile(quizName) {
     // **Reads the JSON file containing the quizzes** This line reads the "quiz.json" file and stores its contents in the data variable.
      fs.readFile("quiz.json", (err, data) => {
        // **Checks for errors while reading the file**:This line checks if there were any errors during the file read operation and displays an error message if necessary.
        if (err) {
          console.error(`Error reading file: ${err.message}`);
          return;// Exit the function if an error occurs
        }
//This code defines a special function (called an arrow function) that the findIndex method uses to search through your quiz list (quizList):Input (quiz): The function takes a single argument, quiz, which represents each individual quiz object in the list as it's being checked.Test condition: Inside the function, it compares the name property of the current quiz (quiz.name) with the name you're searching for (quizName).Finding the match: If the names match, the function returns true, indicating a match is found.No match: If the names don't match, the function returns false.findIndex output: The findIndex method uses the return values (true/false) from this function to iterate through the quiz list and find the first matching quiz.Match found: If a match is found (true returned), findIndex returns the index of that quiz in the list.No match: If no quiz matches (false returned for all quizzes), findIndex returns -1, signifying no match was found.
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
  
        // This code snippet creates a new array named updatedQuizList. This new list will contain a simplified version of each quiz object found in the jsonData. The simplified version will only include the name and questions properties from the original quiz objects.We're making a new list (updatedQuizList). It will only include the 'name' and 'questions' parts from each quiz in the original list (jsonData)."
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
        }////****This code block ensures the user enters a valid answer number (between 1 and 4) for the current question. Here's what it does:Displays the question: It shows the text of the current question.Shows answer options: It displays the available answer choices for the question (likely numbered 1 to 4).Prompts for answer: It asks the user to enter the number corresponding to their chosen answer.Validates input: It checks if the user's input is a valid number between 1 and 4.Stores valid answer: If the input is valid, it stores the chosen answer number.Error message and loop: If the input is invalid, it displays an error message explaining the user needs to enter a number between 1 and 4. The loop then repeats, asking for the answer again until a valid choice is provided.
    
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
        // **Asks the user for a filename to save the quiz data. If they leave it blank, it will be called 'quiz.json'."
        const fileName = prompt("Write the file name (example: myQuiz.json): ") || "quiz.json";
      
        // **This code converts the quizList object (containing all your quizzes) into a JSON format suitable for saving to a file. Here's a breakdown:JSON.stringify function: It uses a built-in JavaScript function called JSON.stringify to perform the conversion.null parameter: The first parameter (null in this case) is optional and can be used for advanced customization. Here, it's left empty.Indentation (2 spaces): The second parameter (2) specifies the number of spaces to use for indentation in the generated JSON string. This improves readability of the JSON data."
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
      
    
      
    
      function loadQuizFromFile() {
        //**Gets the file name from the user** Prompts the user to enter the file name from which the quiz data should be loaded. The default filename is "quiz.json" if the user leaves it blank.
        const fileName = prompt("Write the file name you want to read from (example: myQuiz.json): ") || "quiz.json";
      
        //**Reads the file contents**Uses the fs.readFile function to read the contents of the specified file (fileName).
    
    
        fs.readFile(fileName, (err, data) => {
          if (err) {
            console.error(`File was not read: ${err.message}`);
            return; //Checks for any errors during the file reading process. If an error occurs, an error message is displayed to the console.
          }
      
          //This part of the code carefully checks the file you loaded. If the file is formatted correctly (like a recipe with clear instructions), it can be used to add quizzes to your list. But if there are errors in the file (like missing ingredients or steps), it will warn you about the problem and suggest you take a look at the file again."
          try {//This line starts a try block. The code within this block will be executed first.
            const jsonData = JSON.parse(data);//This line attempts to parse the content of the data variable (which presumably holds the file contents) into a JavaScript object using JSON.parse.jsonData holds the parsed JavaScript object representing the loaded quiz data from the file.
            quizList.push(...jsonData);// **Adds the loaded quizzes to the quiz list**Uses the push method to add the parsed quiz objects to the existing quizList array.This line assumes jsonData is an array of quiz objects. It uses the spread operator (...) to unpack the array and add each individual quiz object to the quizList array. Essentially, it adds the loaded quizzes to the existing quiz list.
            console.log(`The quiz was successfully loaded from file "${fileName}".`);//Success message: If the file is loaded successfully, a success message is displayed. It executes only if the JSON parsing is successful. It prints a success message to the console indicating the loaded file name.
    
    
          } catch (error) {//This line starts a catch block. This block will only execute if an error occurs during the try block (during JSON parsing).
            console.error("JSON parsing failed:", error.message); // **Added error message**//This line, within the catch block, logs an error message to the console. It includes the generic message "JSON parsing failed" followed by the specific error message provided by the error.message property.
          console.log("Check the form of file.");//This line, within the catch block, suggests to the user that the error might be due to the file format being incorrect. It prompts them to check the file content to ensure it's valid JSON.
          return;//This part catches any errors that might happen and stops the function from running further."
          }
      
          mainMenu();//Returns to the main menu: Calls the mainMenu function to return to the main menu of the application.
    
                 
        });
      }
      
    
    
    start(); //This start() function is where the program truly begins. It gets things running smoothly."
    
    