const timer = document.querySelector('.stopwatch__timer');
const roundTimer = document.querySelector('.stopwatch__round-timer')
const circle = document.querySelector('.stopwatch__inner-circle');
const circleStyles = getComputedStyle(circle);
const outerCircle = document.querySelector('.stopwatch__outer');
let circleDashoffset = parseInt(circleStyles.strokeDashoffset);
let circleDashoffsetOneTime = circleDashoffset / 6000; // dzielimy początkową wartość dashoffset(925px) przez 6000 (tyle razy wykona się interwał w przeciągu jednej minuty)


const startBtn = document.querySelector('.stopwatch__start-btn');
const resetBtn = document.querySelector('.stopwatch__reset-btn');
const roundBtn = document.querySelector('.stopwatch__round-btn');
const closeRoundBtn = document.querySelector('.stopwatch__round-btn-close');
const pauseBtn = document.querySelector('.stopwatch__pause-btn');
const timesBtn = document.querySelector('.stopwatch__panel-btn-times');
const brushBtn = document.querySelector('.stopwatch__panel-btn-colors');
const panelBtns = document.querySelectorAll('.stopwatch__panel-btn')
const stopwatchBtns = document.querySelectorAll('.stopwatch__btn');
const colorBtns = document.querySelectorAll('.stopwatch__color');
const animatedBtns = [roundBtn, brushBtn];

const body = document.querySelector('body');
const roundPanel = document.querySelector('.stopwatch__round');
const roundTable = document.querySelector('.stopwatch__round-table');
const roundTbody = roundTable.querySelector('tbody');
const colors = document.querySelector('.stopwatch__colors');
const date = new Date();
//const minutes = date.getMinutes();
const secounds = date.getSeconds();
let startStopwatch;
let startRoundTimer;
let times = [];
let id = 1;

let miliseconds;
let seconds;
let minutes;
let hours;
let divider;

let roundMiliseconds;
let roundSeconds;
let roundMinutes;
let roundHours;

let time = 0;
let roundTime = 0;

const redColor = 'rgb(227, 102, 102)';
const greenColor = 'rgb(54, 225, 159)';
const blueColor = 'rgb(79, 170, 255)';

const redColorAlpha = 'rgba(227, 102, 102, 0.5)';
const greenColorAlpha = 'rgba(54, 225, 159, 0.5)';
const blueColorAlpha = 'rgb(79, 170, 255, 0.5)';

const redGradient = 'linear-gradient(315deg, rgb(169 44 44) 0%, rgb(227, 102, 102) 74%)';
const greenGradient = 'linear-gradient(315deg, rgb(41, 131, 97) 0%, rgb(54 225 159) 74%)';
const blueGradient = 'linear-gradient(315deg, #045de9 0%, #4faaff 74%)';




// const startTimer = () => {
//     time++;
//     let miliseconds = Math.floor(time % 100); //jedna dziesiąta sekundy
//     let seconds = Math.floor(time / 100);
//     let minutes = Math.floor(time / 100 / 60);

//     if(seconds < 10){
//         seconds = `0${seconds}`
//     }
//     if(seconds >= 60){
//         seconds = seconds % 60;
//     }

//     if(minutes < 10){
//         minutes = `0${minutes}`;
//     }


let circleTime = 0;
let circleDashoffsetPerTime;

//Interwał wykonywany jest co 10 milisekund (to znaczy że w jedną sekundę (1000 milisekund) wykona się 100 razy) - dlatego dzielimy czas przez 100
const startTimer = () => {
    time++;
    //circleDashoffset = circleDashoffset - circleDashoffsetOneTime; //Za kazdym razem odejmujemy początkową wartośc dashoffset od dashoffset/6000 - ten efekt zapewni progresywne zapełnienie koła w przeciągu jednej minuty.
    
    
    if(circle.style.opacity == 0){
        circle.style.opacity = 1; //Nalezy dodac opacity aby punkt na kole był niewidoczny.
    }
    
    circleDashoffsetPerTime = circleDashoffset - (circleDashoffsetOneTime * circleTime);
    circleTime = time % 6000;
    
    miliseconds = Math.floor(time % 100); //Dziesiątka sekundy (0.01s)
    seconds  = Math.floor(time / 100);
    minutes = Math.floor(time / 100 / 60);
    hours = Math.floor(time / 100 / 60 / 60);
    
    //Jeśli mniejsze od 10 to dodajemy 0 na początku minisekund, sekund i minut
    if(miliseconds < 10){
        miliseconds = `0${miliseconds}`;
    }

    //Jeśli sekunda jest większa od 60 to zaczynamy od nowa
    if(seconds >= 60){
        seconds = seconds % 60;
    }

    if(minutes >= 60){
        minutes = minutes % 60;
    }
    //Jeśli liczba jest mniejsza od 10 to na poczatku dodajemy 0 (np 05)
    if(seconds < 10){
        seconds = `0${seconds}`;
    }

    if(minutes < 10){
        minutes = `0${minutes}`;
    }

    if(hours < 10){
        hours = `0${hours}`;
    }

    //Zamiana formatu w momencie kiedy wybije jedna godzina (60 minut)
    if(time < 360000){
        timer.innerHTML = `${minutes}:${seconds}:${miliseconds}`;
    }else{
        timer.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
    circle.style.strokeDashoffset = `${circleDashoffsetPerTime}px`;
}

const startRound = () => {
    roundTime++;

    roundMiliseconds = Math.floor(roundTime % 100);
    roundSeconds  = Math.floor(roundTime / 100);
    roundMinutes = Math.floor(roundTime / 100 / 60);
    roundHours = Math.floor(roundTime / 100 / 60 / 60);
    
    //Jeśli mniejsze od 10 to dodajemy 0 na początku minisekund, sekund i minut
    if(roundMiliseconds < 10){
        roundMiliseconds = `0${roundMiliseconds}`;
    }

    //Jeśli sekunda jest większa od 60 to zaczynamy od nowa
    if(roundSeconds >= 60){
        roundSeconds = roundSeconds % 60;
    }

    if(roundMinutes >= 60){
        roundMinutes = roundMinutes % 60;
    }
    //Jeśli liczba jest mniejsza od 10 to na poczatku dodajemy 0 (np 05)
    if(roundSeconds < 10){
        roundSeconds = `0${roundSeconds}`;
    }

    if(roundMinutes < 10){
        roundMinutes = `0${roundMinutes}`;
    }

    if(roundHours < 10){
        roundHours = `0${roundHours}`;
    }

    //Zamiana formatu w momencie kiedy wybije jedna godzina (60 minut)
    if(roundTime < 360000){
        roundTimer.innerHTML = `${roundMinutes}:${roundSeconds}:${roundMiliseconds}`;
    }else{
        roundTimer.innerHTML = `${roundHours}:${roundMinutes}:${roundSeconds}`;
    }
}

const stopTimer = () => {
    clearInterval(startStopwatch);
    clearInterval(startRoundTimer);
    pauseBtn.classList.add('stopwatch__btn-none');
    startBtn.classList.remove('stopwatch__btn-none'); //pojawienei sie i chowanie przycisku, który jest w tym samym miejscu (start, stop)
    resetBtn.disabled = false;
    roundBtn.disabled = true;
    
    [roundBtn, resetBtn].forEach(btn => {
        if(btn.disabled){
            btn.style.opacity = 0.6;
        }else{
            btn.style.opacity = 1;
        }
    })
}

const resetTimer = () => {
    const roundItems = document.querySelectorAll('tr'); //Wszystkie dodane okrążenia
    roundItems.forEach(roundItem => {
        if(!roundItem.classList.contains('stopwatch__round-table-row-title')){ // zapobieganie usunięcia tytułów
            roundItem.remove(); //usunięcie wszystkich okrążeń
        }
    })

    const btns = [roundBtn, resetBtn];
    btns.forEach(btn => {
        btn.classList.remove('stopwatch__show-btn');
    })
    roundTimer.style.visibility = 'hidden'; //ukrycie stopera okrążeń
    timer.innerHTML = `00:00:00`;
    roundTimer.innerHTML = `00:00:00`; //Wyzerowanie stopera w widoku

    circleDashoffset = 925;
    circle.style.strokeDashoffset = `${circleDashoffset}px`; //Stan początkowy kółka (w momencie kiedy ma 925px)
    circle.style.opacity = 0; //Nalezy dodac opacity aby punkt na kole był niewidoczny.
    circle.style.transition = 'stroke-dashoffset 0.6s, opacity 1s';
    
    time = 0;
    roundTime = 0; //wyzerowanie zmiennych
    id = 1;

    stopTimer(); //Zatrzymanie interwału
}

const createRoundTableRow = () => {
    const tableRow = document.createElement('tr');
    const tableDataId = document.createElement('td');
    const tableDataTime = document.createElement('td');
    const tableDataTotal = document.createElement('td');

    roundTbody.append(tableRow);
    tableRow.append(tableDataId, tableDataTime, tableDataTotal);

    //Nadanie id - jeśli id mniejsze od 10 to na początek dodajemy 0
    if(id < 10){
        tableDataId.textContent = `0${id}`
        console.log('object');
    }else{
        tableDataId.textContent = id;
    }
    //Zamiana formatu w momencie kiedy wybije jedna godzina (60 minut)
    //Jeśli id jest równe 1 to okrązenie będzie równe czasu stopera
    //Odnosi się do czasu stopera oraz okrążeń:
    //-Jeśli czas nie jest równy jednej godzinie to ustawiony jest format Minuty:Sekundy:Milisekundy
    //-Jeśli czas jest równy jednej godzinie to ustawiony jest format Godziny:Minuty:Sekundy
    //Za każdym razem zwiększone zostanie id o 1

    if(id <= 1){
        if(time < 360000){
            tableDataTime.textContent = `${minutes}:${seconds}.${miliseconds}`;
        }else{
            tableDataTime.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }else{
        if(roundTime < 360000){
            tableDataTime.textContent = `${roundMinutes}:${roundSeconds}.${roundMiliseconds}`;
        }else{
            tableDataTime.textContent = `${roundHours}:${roundMinutes}:${roundSeconds}`;
        }   
    }

    if(time < 360000){
        tableDataTotal.textContent = `${minutes}:${seconds}.${miliseconds}`;
    }else{
        tableDataTotal.textContent = `${hours}:${minutes}:${seconds}`;
    }

    id++;
}

//Funkcja, która włącza interwały i wysuwa przyciski.
const handleStart = () => {
    circle.style.transition = 'none'; 

    startStopwatch = setInterval(startTimer, 10);
    startRoundTimer = setInterval(startRound, 10);

    startBtn.classList.add('stopwatch__btn-none');
    pauseBtn.classList.remove('stopwatch__btn-none');
    
    resetBtn.disabled = true;
    roundBtn.disabled = false;


    [roundBtn, resetBtn].forEach(btn => {
        btn.classList.add('stopwatch__show-btn');

        if(btn.disabled){
            btn.style.opacity = 0.6;
        }else{
            btn.style.opacity = 1;
        }
    })
}

//Funkcja, która za kazdym razem resetuje czas okrążenia, resetuje interwał, 
//pokazuje czas, który na poczatku jest niewidoczny, tworzy nowy interwał i stwarza nowy table row i z nowym czasem
const handleRound = () => {
    roundTime = 0;
    clearInterval(startRoundTimer);
    roundTimer.style.visibility = 'visible';
    startRoundTimer = setInterval(startRound, 10);
    createRoundTableRow();
}

//Funkcja, która wysuwa paletę z kolorami
const showColors = () => {
    colors.classList.toggle('stopwatch__colors-show');
}

//Funkcja, która sprawdza jaki kolor został ,,wcisnięty'' - przekazany do funkcji aby ustawić odpowiedni kolor elementów i gradient dla body.
const checkColor = (color) => {
    let checkedColor;
    let checkedGradient;
    let checkedAphaColor;
    
    switch(color){
        case 'red':
            checkedGradient = redGradient;
            checkedColor = redColor;
            checkedAphaColor = redColorAlpha;
            break;
        case 'green':
            checkedGradient = greenGradient;
            checkedColor = greenColor;
            checkedAphaColor = greenColorAlpha;
            break;
        case 'blue':
            checkedGradient = blueGradient;
            checkedColor = blueColor;
            checkedAphaColor = blueColorAlpha;
            break;
    }
    return [checkedGradient, checkedColor, checkedAphaColor];
}

//Funkcja ustawia kolor dla body i elementów po wcisnięciu danego przycisku.
const changeColor = (e) => {
    const color = e.target.dataset.color; //wcisnięty kolor.
    const colors = checkColor(color); // tablica dwóch kolorów - dla tła oraz elementów.

    body.style.backgroundImage = colors[0]; //tło
    //Ustawienie kolorów dla elementów
    timer.style.color = colors[1];
    roundTimer.style.color = colors[1];
    circle.style.stroke = colors[1];
    outerCircle.style.borderColor = colors[2];
    //outerCircle.style.opacity = 0.5;
    panelBtns.forEach(panelBtn => {
        panelBtn.style.color = colors[1]; //Górne przyciski (pędzel, czasy)
    })
    //Dolne przyciski - ustawienie koloru oraz przeźroczystości
    stopwatchBtns.forEach(stopwatchBtn => {
        stopwatchBtn.style.color = colors[1];
        if(stopwatchBtn.disabled){
            stopwatchBtn.style.opacity = 0.6;
        }else{
            stopwatchBtn.style.opacity = 1;
        }
    })

    //Stara funkcja, gorzej czytelna i powtarzanie kodu.
    // switch(color){
    //     case 'red':
    //         body.style.backgroundImage = redGradient
    //         timer.style.color = redColor;
    //         circle.style.stroke = redColor;
    //         panelBtns.forEach(panelBtn => {
    //             panelBtn.style.color = redColor;
    //         })
    //         stopwatchBtns.forEach(stopwatchBtn => {
    //             stopwatchBtn.style.color = redColor;
    //         })
    //         break;
    //     case 'green':
    //         body.style.backgroundImage = greenGradient;
    //         timer.style.color = greenColor;
    //         circle.style.stroke = greenColor;
    //         panelBtns.forEach(panelBtn => {
    //             panelBtn.style.color = greenColor;
    //         })
    //         stopwatchBtns.forEach(stopwatchBtn => {
    //             stopwatchBtn.style.color = greenColor;
    //         })
    //         break;
    //     case 'blue':
    //         body.style.backgroundImage = blueGradient;
    //         timer.style.color = blueColor;
    //         circle.style.stroke = blueColor;
    //         panelBtns.forEach(panelBtn => {
    //             panelBtn.style.color = blueColor;
    //         })
    //         stopwatchBtns.forEach(stopwatchBtn => {
    //             stopwatchBtn.style.color = blueColor;
    //         })
    //         break;
    // }
}

const animateButton = (e) => {
    const animatedBtn = e.target.closest('button');
    animatedBtn.classList.add('stopwatch__btn-resize'); // dodanie animacji do przycisku
    const duration = window.getComputedStyle(animatedBtn).getPropertyValue("animation-duration"); //czas trwania animacji - musi byc taki sam jak czas opóźnienia setTimeout
    setTimeout(() => {
        animatedBtn.classList.remove('stopwatch__btn-resize'); //usunięcie klasy po skończeniu animacji - aby na nowo mozna było ją dodać do odtworzenia animacji
    }, parseFloat(duration) * 1000);
}


//-------------------------------------------------------------------------------listerens
startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
roundBtn.addEventListener('click', handleRound);

//Pokazanie panelu okrążeń
timesBtn.addEventListener('click', ()=> {
    //roundPanel.style.removeProperty("background-color");
    roundPanel.style.display = 'block';
})

//Zamknięcie panelu okrążeń
closeRoundBtn.addEventListener('click', () => {
    roundPanel.style.removeProperty("display");
})

//Wysunięcie kolorów
brushBtn.addEventListener('click', showColors);

//Ustawienie klikniętego koloru
colorBtns.forEach(colorBtn => {
    colorBtn.addEventListener('click', changeColor);
})



animatedBtns.forEach(animatedBtn => {
    animatedBtn.addEventListener('click', animateButton);
})

