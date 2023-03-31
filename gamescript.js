let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let winningPattern = [
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6],
];
let xTurn = true;
let count = 0;

//disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
};

//enable all buttons (for new game and restart)

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });

    popupRef.classList.add("hide");

};
// This function is execuated when a player wins

const winFunction = (letter) => {
    disableButtons();
    if(letter == "X"){
        msgRef.innerHTML = "'X' Wins";
    }
    else{
        msgRef.innerHTML = "'O' Wins"; 
    }
};

//Function for draw

const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "It's a Draw"; 
}

//new game

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});


//win logic
const winChecker = () => {
    //loop through all win patters
    for (let i of winningPattern){
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,

        ];
        //check if elements are filled
        //if 3 empty elements are same and would give win
        if (element1 != "" && (element2!="") & (element3!= "")){
            if (element1==element2 && element2 == element3){
                //if all three buttons have same value then pass to winFunction
                winFunction (element1);
            }
        }
    }
}


//Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn){
            xTurn = false;

            //display x
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            xTurn = true;

            //display Y
            element.innerText = "O";
            element.disabled = true;
        }
        //increment count on each click
        count+=1;

        if (count == 9){
            //its a draw
            drawFunction(); 

        }
        winChecker();
    });
});

//enable buttons and disable popup on page load
window.onload = enableButtons;