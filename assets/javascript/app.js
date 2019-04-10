$(document).ready(function () {
    
    // This is an array of objects each object contains the question, choices, correct answer, and a gif
    var computerOptions = [
        {
            question: "Which NBA team has the best record in a single season?",
            choices: ["New York Knicks","Miami Heat","Golden State Warriors","Chicago Bulls"],
            answer: 2,
            photo: "assets/images/curry.gif"
        },
        {
            question: "Who won the most NBA Finals MVP's?",
            choices: ["LeBron James","Kobe Bryant","Bill Russell","Michael Jordan"],
            answer: 3,
            photo: "assets/images/jordan.gif"
        },
        {
            question: "Which NBA team has Kevin Durant NOT played for?",
            choices: ["Oklahoma City Thunder","Los Angeles Lakers","Seattle Supersonics","Golden State Warriors"],
            answer: 1,
            photo: "assets/images/kd.gif"
        },
        {
            question: "In what season did LeBron James win his first NBA title?",
            choices: ["2011-12","2010-11","2006-07","2012-13"],
            answer: 0,
            photo: "assets/images/lebron.gif"
        },
        {
            question: "How many NBA Championships have the Miami Heat won?",
            choices: ["2","4","3","6"],
            answer: 2,
            photo: "assets/images/wade.gif"
        },
        {
            question: "Which NBA player has the record for most assists in one game?",
            choices: ["Rajon Rondo","Steve Nash","Magic Johnson","Scott Skiles"],
            answer: 3,
            photo: "assets/images/skiles.gif"
        }
    ];
    
    var timer = 20;
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unanswerCount = 0;
    var interValId;
    var running = false;
    var qCount = computerOptions.length;
    var computerPick;
    var index;
    var newArr = [];
    var holder = [];
    var userGuess = "";


   $("#reset").hide();

   // Starts the game 
   $("#start").on("click", function() {
       $("#start").hide();
       display();
       timeStart();
       for (var i = 0; i < computerOptions.length; i++) {
           holder.push(computerOptions[i]);
       }
   })

   function timeStart() {
       if (!running) {
           running = true;
           interValId = setInterval(countDown, 1000);
           
       }
   }

   function countDown() {
       $("#time-left").html("<h3> Time Left: " + timer + "</h3>");
       timer--;

       if (timer === 0) {
           unanswerCount++;
           stop();
           $("#answerBlock").html("<p>Time is up! The correct answer is: " + computerPick.choices[computerPick.answer] + "</p>");
           hidephoto();
       }
   }


   function stop() {
       running = false;
       clearInterval(interValId);
   }


   // Function that displays the question and answer choices
   function display() {
       
        // Picks a random object from the computerOptions array. computerPick will hold the random object's info
        index = Math.floor(Math.random() * computerOptions.length);
        computerPick = computerOptions[index];

        // Grabs and displays the question property from the array of objects aka computerOptions
        $("#questionBlock").html("<h2>" + computerPick.question + "</h2>");

        // Loops through the question's answer choices array 
        for (var i = 0; i < computerPick.choices.length; i++) {
            var userPick = $("<div>");
            userPick.addClass("answerpick");
            userPick.html(computerPick.choices[i]);

            // Assigns the arrays position to it so it can check the answer 
            userPick.attr("data-guessvalue", i);
            $("#answerBlock").append(userPick);
        }
        countDown()
   }

   
   // Click function to select the answer choices and the outcomes
   $(".answerpick").on("click", function() {
        userGuess = parseInt($(this).attr("data-guessvalue"));
        
        // Sets the conditions of the trivia game 
        if (userGuess === computerPick.answer) {
            correctAnswers++;
            userGuess = "";
            $("#answerBlock").html("<p>Correct!</p>");
            //stop();
            //hidepicture();

        } else {
            //stop();
            wrongAnswers++
            userGuess = "";
            $("#answerBlock").html("<p>Wrong! The correct answer is: " + userPick.choice[userPick.answer] + "</p>");
            //hidepicture();
        }
   })

   function hidephoto() {
       $("#answerBlock").append("<img src=" + computerPick.photo + ">");
       newArr.push(computerPick);
       computerOptions.splice(index, 1);

       var hidepic = setTimeout(function() {
            $("#answerBlock").empty();
            timer = 20;

        if ((wrongAnswers + correctAnswers + unanswerCount) === qCount) {
            $("#questionBlock").empty();
            $("#questionBlock").html("<h3>Game over! Here's how you did: </h3");
            $("#answerBlock").append("<h4> Correct: " + correctAnswers + "</h4>");
            $("#answerBlock").append("<h4>Wrong: " + wrongAnswers + "</h4>");
            $("#answerBlock").append("<h4>Unanswered: " + unanswerCount + "</h4>");
            $("#reset").show();
            correctAnswers = 0;
            wrongAnswers = 0;
            unanswerCount = 0;

        } else {
            display();
        }
       }, 3000)
   }

   $("#reset").on("click", function() {
        $("#reset").hide();
        $("questionBlock").empty();
        $("answerBlock").empty();
        for (var i = 0; i < holder.length; i++) {
            computerOptions.push(holder[i]);
        }
        display();
   })

});