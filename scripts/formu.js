const campo_senha = document.getElementById('ikey')
const url_cad = "http://localhost:3000/cadastro";
const form = document.querySelector('#cad');
let letraMaiuscula = 0;
let cont_num = 0;

console.log(form)
form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const resp = 3
    if(resp >= 3){
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
                    location.assign(document.referrer)
                }else{
                    console.log('noão ok')
                    window.alert('Algo deu errado');
                }
            }).catch((erro)=>{
                console.log('ALgo deu errado, paizão!');
                window.alert('Algo deu errado');
        })
    }
    
})






campo_senha.addEventListener("change", ()=>{
    let b = verificar_senha(letraMaiuscula, cont_num);
    console.log(b);
})
