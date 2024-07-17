const url_cad = "http://localhost:3000/cadastro";



const form = document.querySelector('#cad');
console.log(form)
form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    fetch(url_cad, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: document.getElementById('iuser').value,
            key: document.getElementById('ikey').value
        })
        }).then((res)=>{
            if(res.ok){
                console.log('ok')
                window.alert('Cadastro realizado com sucesso!');
                location.assign("file:///C:/Users/Optx%209010/Documents/estudos/BookCover/index.html")
            }else{
                console.log('noão ok')
                window.alert('Algo deu errado');
            }
        }).catch((erro)=>{
            console.log('ALgo deu errado, paizão!');
            window.alert('Algo deu errado');
    })
})




