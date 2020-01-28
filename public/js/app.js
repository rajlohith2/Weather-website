console.log('Client side javascript file loeded.')

// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) => {
//         response.json()
//             .then((data) => {
//                 console.log(data)
//             })
//     })
//     .catch((error) => {
//         console.log(error)
//     })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.getElementById('message1')
const message2 = document.getElementById('message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    message1.textContent = 'location: ' + location + '.'
    message2.textContent = 'Please wait, Searching data.'

    fetch(`/weather?address=${location}&newUnits=si`)
        .then((response) => {
            response.json()
                .then((data) => {
                    if(data.error) {
                        console.log(data.error)
                        message1.textContent = data.error
                        message2.textContent = ''
                    } else {
                        message1.textContent = data.location
                        message2.textContent = data.forecast
                    }
                })
        })
        .catch((error) => {
            console.log(error)
            message1.textContent = error
            message2.textContent = ''
        })

    search.value = ''
})