const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = "loading..."
    messageTwo.textContent = ''
    
    const location = search.value

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `The location is ${data.location}`
                messageTwo.textContent =  `The forecast is ${data.forecast}`
            }
        })
    })
})