const username = document.querySelector('#username')
const password = document.querySelector('#password')
const repeatPassword = document.querySelector('#password2')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const closeBtn = document.querySelector('.close')
const popup = document.querySelector('.popup')
const inputs = document.querySelectorAll('.form input')

/////funkcje////

const showError = (inputValue, msg) => {
	const formBox = inputValue.parentElement
	const msgError = formBox.querySelector('.error-text')
	console.log(formBox)
	formBox.classList.add('error')
	msgError.textContent = msg
}

const clearError = inputValue => {
	const formBox = inputValue.parentElement
	formBox.classList.remove('error')
}

const checkForm = inputValue => {
	inputValue.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLenght = (inputValue, min) => {
	if (inputValue.value.length < min) {
		showError(inputValue, `${inputValue.previousElementSibling.innerText} musi zawierac min. ${min} znaki`)
	}
}

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(repeatPassword, 'Hasła róznią się!')
	}
}

const checkEmail = email => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'Wpisz poprawny email!')
	}
}

const checkErrors = () => {
	const boxInputs = document.querySelectorAll('.form__box')
	let accoutnErr = 0
	boxInputs.forEach(el => {
		if (el.matches('.error')) {
			accoutnErr++
		}
	})
	if (accoutnErr === 0) {
		popup.classList.add('popup-show')
	}
}

const closePopup = () => {
	popup.classList.remove('popuo-show')
}

//////konic funkcji//////

/////listenery/////
sendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkForm(inputs)
	checkLenght(username, 3)
	checkLenght(password, 8)
	checkPassword(password, repeatPassword)
	checkEmail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()
	const newInputs = inputs.forEach(input => {
		input.value = ''
		clearError(input)
	})
})
closeBtn.addEventListener('click', closePopup)
/////listenery////
