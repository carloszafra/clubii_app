const $form = document.querySelector('#formRegister')
$form.addEventListener('submit', (event)=>{
    event.preventDefault()
    var object = {}

    const formData = new FormData(event.currentTarget)
    formData.forEach(function(value, key){
        object[key] = value
    })
    var json = JSON.stringify(object)
    console.log(json)
    debugger
    console.log(formData)
    fetch('http://localhost:3200/signup',{
        method: 'POST',
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: json
    })
    .then(function(response){
        if(response){
            console.log(response)
            
        }
    })
    .catch(function(error){
        console.log(error)
    })
})