const main = document.querySelector('main')
const footer = document.querySelector('footer')
const settingsContainer = document.querySelector('section')
const pairs = document.querySelector('#pairs')
const tries = document.querySelector('#tries')
let pairsValue = 0
let triesValue = 0
let yeah = new Audio('sound/yeah.mp3')
let victory = new Audio('sound/victory.mp3')
let openCard = new Audio('sound/openCard.mp3')
let closeCard = new Audio('sound/closeCard.mp3');

console.log(pairs.innerHTML)
// 3. create 20 divs should be on top from randomCardsArray
const createMemoryCards = array => {
    for (let i = 0; i < 20; i++) {
        const divElement = document.createElement('div')
        divElement.classList.add('closed')
        divElement.classList.add('memory')
        divElement.setAttribute('id', array[i])
        const classNumber = Math.floor(array[i] / 2);
        divElement.classList.toggle(`c${classNumber}`);
        main.appendChild(divElement)
        //console.log(divElement)
    }
}

//4.
//memory function
let controllCards = []
let countTurnCard = 0
let previousEvent
const turnCard = event => {
    flipCard(event);
    event.target.classList.toggle('closed')
    //show picture related to id // grab id from item to test
    console.dir(event.srcElement.id)
    controllCards.push(parseInt(event.srcElement.id))
    console.log(controllCards)
    const isSame = checkCards(controllCards)//test two selected cards -> 5.
    console.log(isSame)
    countTurnCard++
    if (countTurnCard === 1) {// not overwrite on the 2nd card
        previousEvent = event
        previousEvent.target.removeEventListener('click', turnCard)
    }//removing and re-adding EventListeners
    if (!isSame && countTurnCard === 2) {
        removingEventListeners()
        triesValue++
        tries.innerHTML = triesValue
        setTimeout(() => {
            flipCardBack(event);
            flipCardBack(previousEvent);
            event.target.classList.toggle('closed')
            previousEvent.target.classList.toggle('closed')
            countTurnCard = 0
            addingEventListeners()
        }, 3000)
    } else if (isSame && countTurnCard === 2) {
        yeah.play();
        countTurnCard = 0
        //remove Listeners
        event.target.removeEventListener('click', turnCard)
        previousEvent.target.removeEventListener('click', turnCard)
        //adding points
        pairsValue++
        pairs.innerHTML = pairsValue
        triesValue++
        tries.innerHTML = triesValue
        //winning sound
        if (pairsValue === 10) {
            victory.play()
        }
    }
    
}

//grabbing all cards
//adding the EventListener on the cards
const addingEventListeners = () => {
    const cards = document.querySelectorAll('.memory')
    for (card of cards) {
        card.addEventListener('click', turnCard)
    }
}

//removing all EventListeners to avoid open more than 2 cards
const removingEventListeners = () => {
    const cards = document.querySelectorAll('.memory')
    for (card of cards) {
        card.removeEventListener('click', turnCard)
    }
}

//logic for memory
// 1.array for cards
const cardsArray = []
// 2. fill array randomly with 20 numbers with id numbers
const createRandomMemoryField = randomArray => {
    while (randomArray.length < 20) {
        const randomNumber = Math.floor(Math.random() * 20)
        if (!randomArray.includes(randomNumber)) {
            randomArray.push(randomNumber)
        } else {
        }
    }
    console.log(cardsArray)
}

//5. controll function to check if right or not and close the cards
const checkCards = twoCards => {

    if (twoCards.length === 2) {

        //compare arrays
        if (twoCards[0] % 2 === 0 && twoCards[1] === twoCards[0] + 1) {
            console.log('same')
            twoCards.pop()
            twoCards.pop()
            return true
        } else if (twoCards[0] % 2 === 1 && twoCards[1] === twoCards[0] - 1) {
            console.log('same')
            twoCards.pop()
            twoCards.pop()
            return true
        } else {
            console.log('not same')
            twoCards.pop()
            twoCards.pop()
            return false
        }
    }
}


//4. turn around card shows pic and in in log
createRandomMemoryField(cardsArray)
createMemoryCards(cardsArray)
addingEventListeners()


//make flip animations and flip sound
const flipCard = event => {
    openCard.play();
    event.target.style.transform =  "rotate3d(0, 1, 0, 180deg)";
}

const flipCardBack = event => {
    closeCard.play();
    event.target.style.transform =  "rotate3d(0, 1, 0, 0deg)";
}
