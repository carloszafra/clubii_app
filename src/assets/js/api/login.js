const $formLogin = document.querySelector('#formLogin')
$formLogin.addEventListener('submit', (event)=>{
    event.preventDefault()
    var object = {}

    const formData = new FormData(event.currentTarget)
    formData.forEach(function(value, key){
        object[key] = value
    })

    var json = JSON.stringify(object)
    console.log(json)
    debugger

    fetch('http://localhost:3200/login', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: json
    })
    .then(function(response){
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
    })

})