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
  
    // Use a switch statement to handle different user choices
            switch (option) { //Introduces the switch statement that executes different code blocks based on the user's choice.
           case "1": // Call the addQuestion function (implementation not shown here) to add a new question
            addQuestion(); 
            break;//Explains the purpose of the break statement, which exits the current case block.
  
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
  
             case "q":// Terminate the program gracefully if the user enters 'q'
            console.log("**Game Ended**");
            process.exit(0); // Terminate the process gracefully.this line terminates the program with an exit code of 0.
  
               default:// Handle invalid input by displaying an error message and looping back to the menu.
            console.log("Invalid Input. Please try again.");//Explains the error message displayed for invalid input.
            editQuestions();// In the default case, the function calls itself recursively to restart the menu and prompt for a valid option.
           }
      }
    }
    