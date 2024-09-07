const formlog = document.querySelector('form#log');
const url_log = "http://localhost:3000/login";
let horaLog = ""
console.log(formlog);
cont=0;
formlog.addEventListener('submit', (evt)=>{
    cont +=1;
    evt.preventDefault();
    fetch(url_log, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username: document.querySelector("#iuser").value, key: document.querySelector('#ikey').value})
})
.then(response => response.json())
.then((data)=>{
    if(data.token){
        sessionStorage.setItem("Key", data.token);
        sessionStorage.setItem("User1", document.querySelector("#iuser").value)
        console.log('ok')
        window.alert('Seja Bem Vindo ' + document.getElementById("iuser").value)
        window.location.assign('http://localhost');
    }else{
        console.log('sem ok')
        window.alert('Usuário ou senha inválido')
    }
})
.catch((error)=>{
    console.log('outro n ok')
    window.alert('algo deu errado!')
})
}
)
