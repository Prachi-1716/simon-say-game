let color = ["red", "green", "yellow", "blue"];
let userseq = [];
let seq = [];
let start = false;
let level = 0;
let boxes = document.querySelectorAll(".box");
let restart = document.querySelector(".restart");


document.addEventListener("keypress", () => {
    if (start === false) {
        restart.style.display = "none";
        startGame();
        start = true;
    }
});

let startGame = () => {
    level++;
    document.querySelector("h3").innerText = `level ${level}`;
    let idx = Math.floor(Math.random() * 4);
    let div = document.querySelector(`#${color[idx]}`);
    setTimeout(()=>{
        flash(div);
    }, 500);
    seq.push(color[idx]);
};

let flash = (div) => {
    div.classList.add("white");
    setTimeout(() => {
        div.classList.remove("white");
    }, 250);
};

for (let box of boxes) {
    box.addEventListener("click", (evt) => {
        flash(box);
        clickSound();
        let div = evt.target;
        userseq.push(div.getAttribute("id"));

        if (start && seq.length === userseq.length) {
            if (check()) {
                console.log(check());
                userseq = [];
                startGame();
            } else {
                wrongSound();
                document.querySelector("h3").innerText = `game over! \n Your score is ${level-1}`;
                start = false; 
                restart.style.display = "inline";
            }
        }
    });
}

let check = () => {
    for (let i = 0; i < seq.length; i++) {
        if (seq[i] != userseq[i]) return false;
    }
    return true;
};

restart.addEventListener("click", ()=>{
    start = true;
    level = 0;
    userseq = [];
    seq = [];
    restart.style.display = "none";
    startGame();
});

let clickSound = () => {
    let audio = new Audio("keypress.wav");
    audio.play();
};

let wrongSound = () => {
    let audio = new Audio("wrong.mp3");
    audio.play();
};
