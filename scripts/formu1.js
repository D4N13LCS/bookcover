const formlog = document.querySelector('form#log');
const url_log = "http://localhost:3000/login";

console.log(formlog);

formlog.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    fetch(url_log, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username: document.querySelector("#iuser").value, key: document.querySelector('#ikey').value})
})
.then(response => response.json())
.then((data)=>{
    if(data.token){
        localStorage.setItem('token', data.token)
        console.log('ok')
        window.alert('Seja Bem Vindo' + document.getElementById("iuser").value)
        document.location.assign("file:///C:/Users/Optx%209010/Documents/estudos/BookCover/index.html")
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