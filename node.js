let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn-red");
let newGameBtn = document.querySelector("#new-btn-green");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
let checkDraw = 0;

let turnX = true; // X if for first person and O is for 2nd person 

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    })
})



const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                checkDraw = 1;
                printWinnner(pos1val);
            }
            if(count === 9 && checkDraw ===0) {
                msg.innerText = "Oops.. Match is DRAW..";
                msg.style.color="red";
                msgContainer.classList.remove("hide");
                disableBoxes();
            }
        }
    }
}





const printWinnner = (winner) => {
    msg.innerText = `Congratulations...! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const resetGame = () => {
    turnX = true;
    count = 0;
    checkDraw = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.style.color="green";
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", resetGame);