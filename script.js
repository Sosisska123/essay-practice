const title = document.querySelector('.gen-title')
const btn = document.querySelector('.submit-btn')
const textArea = document.querySelector('.input-text')
const popUp = document.querySelector('.settings-window')

let nowWord = 0
const maxWords = 1
const templateTextArea = ' — это ...'

let words = []
let playerAnswers = []

const questionList = ['Авторитет',
    'Бескорыстность',
    'Благодарность',
    'Взаимовыручка',
    'Взаимопонимание',
    'Внутренний мир',
    'Воображение',
    'Выбор',
    'Нравственный выбор',
    'Драгоценные книги',
    'Доброта',
    'Дружба',
    'Жизненные ценности',
    'Забота о людях',
    'Зависть',
    'Красота',
    'Любовь',
    'Любознательность',
    'Любовь к жизни',
    'Материнская любовь',
    'Мечта',
    'Настоящее искусство',
    'Неуверенность в себе',
    'Нравственные ценности',
    'Общее дело',
    'Ответственность',
    'Память сердца',
    'Понимание',
    'Признавать свои ошибки',
    'Прийти на помощь',
    'Прощение',
    'Проявлять внимание к человеку',
    'Решимость',
    'Сила духа',
    'Слава',
    'Счастье',
    'Творчество',
    'Уважение к человеку',
    'Фантазия',
    'Цель в жизни',
    'Чудо'] // 40
const questionListJSON = `{"Авторитет": "особое качество человека, наделенного властью и влиянием на окружающие процессы и людей.","Бескорыстность": "бесценное явление в нашей жизни, проявляющееся в способности людей помогать другим без ожидания получить что-либо взамен.","Благодарность": "чувство признательности и уважения к другому человеку за помощь и доброту.","Взаимовыручка": "взаимная помощь, поддержка в каком-либо деле.","Взаимопонимание": "способность людей не только слушать друг друга, но и сльшать, помимать и принимать намерения, взгляды, мировоззрение другого.","Внутренний мир": "внутренняя сущность человееа, его взгляды и убеждения, нравственные ценности, чувства интересы.","Воображение": "способность человека по собственной воле вызывать в воображении образы, чтобы воплотить их в жизнь.","Выбор": "осознанное принятие решения из предложенного множества вариантов.","Драгоценные книги": "это те книги, которые способны произвести на нас особое впечатление, оставили какой-то след в душе и даже изменить.","Доброта": "душевное качество человека, которое выражается в нежном, заботливом отношении к другим людям, в стремлении сделать что-то хорошее, помочь им.","Дружба": "близкие отношения, основанные на взаимном доверии, привязанности, общиостн интересов. Это глубокая связь между людьми.","Жизненные ценности": "убеждения, представления человека о наиболее важных для него вещах и явлениях.","Забота о людях": "вниманне, поддержка, оказание помощи тем, кто в этом нуждается.","Зависть": "чувство досады разочарования, которое связано с собственными неудачами или малыми достижениями в сравнении с другими людьми.","Красота": "то, что приносит наслаждение взору.","Красота души": "качества человека и его поступки, основанные на понятиях нравственности и любви к миру.","Любовь": "чувство, свойственное человеку, глубокая привязанность устремлённость к другому человеку или объекту, чувство глубокой снмпатии.","Любознательность": "черта личности, которая прояаляется в интересе к окружающему миру, желаеии узнать что-то новое, получить влечатяения.","Любовь к жизни": "внутреннее желание человека бороться с трудностями за возможность жить. Любовь к жизни проявляется в неподдельном интересе к миру, в умении радоваться мелочам в обыденной жизни.","Материнская любовь": "самая чистая, настоящая, безусловная любовь, которая есть на этом свете. Любовь проявляется в заботе, ласке матери к своему ребёнку.","Мечта": "заветное желание, исполнение которого предполагает наступление счастья и полного удовлетворения от жизни.","Настоящее искусство": "искусство, которое вызывает у человека сильные чувства и змоции, обогащает его внутренний мир.","Нравственный выбор": "выбор, который человек совершает, опираясь на свои моральные принципы и взгляды на жизнь.","Неуверенность в себе": "сомнение в собственных качествах, способностях, умениях. Часто неуверенные в себе люди обладают низкой самооценкой.","Нравственные ценности": "внутренние духовные качества, которыми руководствуется человек в жизни.","Общее дело": "дело, объединяющее людей в команду направленное на достижение общей цели.","Ответственность": "надежность, честность в отношении себя и других; это способность человека держать данной выполнять поставленные задачи.","Память сердца": "воспоминания, вызванные глубоким впечатлением от событий в жизни это самые сокровенные переживания человеча о минувшем.","Понимание": "умение войти в положение другого человека, ощутить на себе то, что он испытывает.","Признавать свои ошибки": "важный шагк  самопознанию и объективной оценке собственных деяний. Признать свои ошибки сможет только сильный духом, осознанный человем.","Прийти на помощь": "подать руку в трудный момент, проявить неравнодушие и заботу по отношению к другому.","Прощение": "согласие на мир и забвение всех обид.","Проявлять внимание к человеку": "быть способным выразить доброту, сострадание, прийти на помощь, поддержать ,когда это необходимо.","Решимость": "готовность совершить поступок, преодолевая чувство страха.","Сила духа": "сила воли, решимость и, конечно же, способность побеждать свои страхи кидти вперёд.","Слава": "широкая известность и признание со стороны общества.","Счастье": "состояние полной гармонии с собой и окружающим миром.","Творчество": "процесс создания чего-то нового, ранее не встречавшегося в мире.","Уважение к человеку": "это способность считаться с границами и интересами других лодей, видеть и признавать их достоинства, замечать индивидуальность; это чувство, основанное на признании чьих либо достоинств, заслуг, качеств; почтение.","Фантазия": "продукт работы воображения, характеризующийся особой силой, яркостью, спонтанностью и уникальностью создаваемых символов, картин или образов.","Цель в жизни": "определенный ориентир, к которому движется человек, прикладывая все усилия для достижения желаемого результата.","Чудо": "нечто небывалое, сверхъестественное, фантастическое." }`

const questions = JSON.parse(questionListJSON)

let canClick = true
let gameIsOver = false
let isShowingResults = false
let isPlaying = false
let timeOut = 3

btn.addEventListener('click', onButtonPressed)

function onButtonPressed() {
    if (!canClick) return;

    if (!isPlaying) {
        initialSetup()
        return;
    }

    if (gameIsOver) {
        if (isShowingResults) {
            window.location.reload();
        }
        isShowingResults = true
        showResults()
        return;
    }

    canClick = false
    hideInputs()
    setTimeout(changeWord, 1000)
}

function showResults() {
    title.innerHTML = '↓↓↓'
    textArea.parentElement.style.height = words.length * 45 + 'vmin'
    console.log(textArea.parentElement.style.height)
    btn.style.fontSize = '4.5vmin'
    btn.innerHTML = 'Начать заново'

    let i = 0
    for (let word in words) {
        let textTitle = document.createElement('p')
        textTitle.classList.add('text-title')
        textTitle.innerHTML = words[word] + templateTextArea

        let originalText= document.createElement('div')
        originalText.classList.add('text-content', 'right-text')
        originalText.innerHTML = questions[words[word]]

        let playerText= document.createElement('div')
        if (playerAnswers[i].toLowerCase() === questions[words[word]].toLowerCase()) {
            playerText.classList.add('text-content', 'right-text')
        }
        else {
            playerText.classList.add('text-content', 'wrong-text')
        }

        playerText.innerHTML = playerAnswers[i]

        textArea.parentElement.appendChild(textTitle)
        textArea.parentElement.appendChild(originalText)
        textArea.parentElement.appendChild(playerText)
        ++i
    }
}

function initialSetup() {
    canClick = false
    textArea.style.display = 'block';
    textArea.style.visibility = 'visible';
    btn.innerHTML = 'Готово';
    textArea.parentElement.style.height = '30vmin'

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
    ++nowWord;
    if (nowWord >= maxWords + 1) {
        gameOver()
        canClick = true
        return
    }
    let word = generateNewWord()
    btn.innerHTML = 'Готово';
    textArea.parentElement.style.height = '30vmin'
    title.innerHTML = word + ` (${nowWord}/${maxWords})`
    textArea.placeholder = word + templateTextArea

    textArea.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            onButtonPressed()
        }
    })
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
    if (param) {
        popUp.parentElement.style.visibility = 'visible'
    }
}

function hideInputs() {
    textArea.placeholder = '...' + templateTextArea
    textArea.parentElement.style.height = '20vmin'

    playerAnswers.push(textArea.value)
    textArea.value = ''
    console.log(playerAnswers)

    btn.innerHTML = '...';
    title.innerHTML = '...'
}

function generateNewWord() {
    const i = getRandomInt(questionList.length - 1)
    const word = questionList[i]
    words.push(word)
    console.log(words)
    questionList.splice(i, 1)
    return word
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}