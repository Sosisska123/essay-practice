const title = document.querySelector('.gen-title')
const btn = document.querySelector('.submit-btn')
const textArea = document.querySelector('.input-text')
const popUp = document.querySelector('.settings-window')

let nowWord = 0
const maxWords = 5
const templateTextArea = ' — это ...'
const questionList = ['Авторитет',
    'Бескорыстность',
    'Благодарность',
    'Взаимовыручка',
    'Взаимопонимание',
    'Внутренний мир',
    'Выбор',
    'Нравственный выбор',
    'Драгоценные книги',
    'Доброта', // 10
    'Дружба',
    'Жизненные ценности',
    'Забота о людях',
    'Зависть',
    'Красота',
    'Любовь',
    'Любознательность',
    'Любовь к жизни',
    'Материнская любовь',
    'Мечта', // 20
    'Настоящее искусство',
    'Неуверенность в себе',
    'Нравственные ценности',
    'Общее дело',
    'Ответственность',
    'Память сердца',
    'Признавать свои ошибки',
    'Прийти на помощь',
    'Прощение',
    'Проявлять внимание к человеку', // 30
    'Решимость',
    'Сила духа',
    'Слава',
    'Счастье',
    'Творчество',
    'Уважение к человеку',
    'Фантазия',
    'Цель в жизни',
    'Чудо'] // 39

let canClick = true
let gameIsOver = false
let isPlaying = false
let timeOut = 3

btn.addEventListener('click', startGame)

function startGame() {
    create()
    if (!canClick) return;
    canClick = false

    if (!isPlaying) {
        canClick = false;
        initialSetup()
        return;
    }

    if (gameIsOver) {
        showOrHidePopup(true)
        return;
    }
    title.innerHTML = '...'
    setTimeout(changeWord, 1000)
}

function create() {
    console.log('lollipp')
    let div = document.createElement('p')

    div.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    div.className = 'test';
    div.style.color = 'green'
}

function initialSetup() {
    textArea.style.display = 'block';
    textArea.style.visibility = 'visible';
    btn.innerHTML = 'Готово';
    textArea.parentElement.style.height = '35vmin'

    title.innerHTML = 'Начало через ' + timeOut;
    --timeOut;

    if (timeOut >= 0) {
        setTimeout(initialSetup, 1000)
        return;
    }

    title.innerHTML = '...'
    isPlaying = true;
    canClick = true;

    setTimeout(changeWord, 1000)
}

function changeWord() {
    let word = generateNewWord()
    ++nowWord;
    if (nowWord >= 6) {
        gameOver()
        return
    }
    title.innerHTML = word + ` (${nowWord}/${maxWords})`
    textArea.placeholder = word + templateTextArea
    canClick = true
}

function gameOver() {
    gameIsOver = true
    title.innerHTML = 'всё'
    textArea.style.display = 'none';
    textArea.style.visibility = 'hidden';

    btn.innerHTML = 'Посмотреть результат';
    btn.style.fontSize = '3vmin'

    textArea.parentElement.style.height = '15vmin'
}

function showOrHidePopup(param) {
    console.log(popUp.parentElement.style.visibility)
    // popUp.parentElement.style.visibility = `${param}`
}

function generateNewWord() {
    const i = getRandomInt(questionList.length - 1)
    const word = questionList[i]
    questionList.splice(i, 1)
    return word
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}