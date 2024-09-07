let descricao = document.getElementById('descricao');
let imagens = [...document.querySelectorAll('div#imagem > img')];
let setaEsquerda = document.getElementsByClassName('setas')[0];
let setaDireita = document.getElementsByClassName('setas')[1];
const img_recomend = document.querySelectorAll('#Recomendados img');
const recomendados = document.querySelectorAll('#Recomendados div');
let promo_img = document.querySelectorAll('#promo div');
let promo = document.querySelector('#promo');
const menu_symbol = document.querySelector('span');
const menu = document.getElementById('menu');
const verMais = [...document.getElementsByClassName('verMais')];
let item = document.querySelectorAll('#recentes div.item');
const p = document.querySelectorAll('#recentes div p');
console.log(window.innerWidth);
console.log(verMais);
let clique = 0;
let indiceImg = 0;

function mostrar_imagem(indice){
    imagens.forEach((el, ind)=>{
        if(ind === indice){
            el.style.display = 'block';
        }else{
            el.style.display = 'none';
        }
    })
}

let altura_inicial = item[0].getBoundingClientRect().height;

window.addEventListener('resize', ()=>{
    if(769 > window.innerWidth && window.innerWidth >= 480){
        item.forEach((el,ind)=>{
            verMais[ind].innerText = 'Ver mais';
            p[ind].style.overflow='hidden';
            el.style.height = '650px';
        })
        altura_inicial = item[0].getBoundingClientRect().height;
    }else if(1025 > window.innerWidth && window.innerWidth >= 769){
        item.forEach((el,ind)=>{
            verMais[ind].innerText = 'Ver mais';
            p[ind].style.overflow='hidden';
            el.style.height = '725px';
        })
        altura_inicial = item[0].getBoundingClientRect().height;
    }else if(1280 > window.innerWidth && window.innerWidth >= 1025){
        item.forEach((el,ind)=>{
            verMais[ind].innerText = 'Ver mais';
            p[ind].style.overflow='hidden';
            el.style.height = '850px';
        })
        altura_inicial = item[0].getBoundingClientRect().height;
    }else if(window.innerWidth > 1280){
        item.forEach((el,ind)=>{
            verMais[ind].innerText = 'Ver mais';
            p[ind].style.overflow='hidden';
            el.style.height = '750px';
        })
        altura_inicial = item[0].getBoundingClientRect().height;
    }else{
        item.forEach((el,ind)=>{
            verMais[ind].innerText = 'Ver mais';
            p[ind].style.overflow='hidden';
            el.style.height = '850px';
        })
        altura_inicial = item[0].getBoundingClientRect().height;
    }
})

verMais.forEach((el, ind)=>{
    el.addEventListener('click', (evt)=>{
        if(el.innerText == 'Ver mais'){
            el.innerText = 'Ver menos';
            p[ind].style.overflow='visible';
            item[ind].style.height = 'fit-content';
        }else{
            el.innerText = 'Ver mais';
            p[ind].style.overflow='hidden';
            p[ind].removeAttribute('webkitLineClamp');
            p[ind].removeAttribute('lineClamp');
            item[ind].style.height = altura_inicial + 'px';
        }
    })
})

setaEsquerda.addEventListener('click', ()=>{
    indiceImg = ((imagens.length + 1) + indiceImg) % (imagens.length); 
    console.log(indiceImg);
    mostrar_imagem(indiceImg);
})

setaDireita.addEventListener('click', ()=>{
    indiceImg = (imagens.length - 1 + indiceImg) % (imagens.length);
    console.log(indiceImg);
    mostrar_imagem(indiceImg);
})

setInterval(()=>{
    indiceImg = ((imagens.length + 1) + indiceImg) % (imagens.length); 
    if(indiceImg >= imagens.length){
        indiceImg = 0;
    }
    mostrar_imagem(indiceImg)
}, 3000);

menu_symbol.addEventListener('click', ()=>{
    if(menu_symbol.innerText == 'menu'){
        menu_symbol.innerText = 'close';
        menu.style.display = 'flex';
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }else{
        menu_symbol.innerText = 'menu'
        menu.style.display = 'none';
        document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
    }
    
})

/*carrossel automático*/

let ct = document.querySelector('#promo').getBoundingClientRect().left + 1;
let ctp = ct;

let t = 1;
let order = -1;
let r = 1;

window.addEventListener('resize', ()=>{
    if(769 > window.innerWidth && window.innerWidth >= 480){
        promo.style.left = `${-228}px`
        promo.style.width = '1100px'
        ct = document.querySelector('#promo').getBoundingClientRect().left + 1;
        ctp = ct;
    }else if(1025 > window.innerWidth && window.innerWidth >= 769){
        promo.style.left = `${-256}px`
        promo.style.width = '1250px'
        ct = document.querySelector('#promo').getBoundingClientRect().left + 1;
        ctp = ct;
    }else if(1280 > window.innerWidth && window.innerWidth >= 1025){
        promo.style.left = `${-328}px`
        promo.style.width = '1600px'
        ct = document.querySelector('#promo').getBoundingClientRect().left + 1;
        ctp = ct;
    }else if(window.innerWidth > 1280){
        promo.style.left = `${-397}px`
        promo.style.width = '1950px'
        ct = document.querySelector('#promo').getBoundingClientRect().left + 1;
        ctp = ct;
    }else{
        promo.style.left = `${-328}px`
        promo.style.width = '1600px'
        ct = document.querySelector('#promo').getBoundingClientRect().left + 1;
        ctp = ct;
    }
})

let a = function mover(){
    promo.style.left = `${ct}px`
    // console.log(ct);
    if(ct % ((promo.getBoundingClientRect().left + 1) + item[0].getBoundingClientRect().width * 3 + 3 * 30 + window.innerWidth + document.querySelector('footer').getBoundingClientRect().width) == 0){
        ct= ctp;
        promo.style.left = `${ct}px`;
        if(t > promo_img.length){
            t=1;
            order-=1;
        }
        document.querySelectorAll('#promo div')[promo_img.length - t].style.order= `${order}`;
        t+=1
    }
    promo.addEventListener('mouseout', ()=>{
        r = 1;
    })

    promo.addEventListener('mouseover', ()=>{
        r=0;
    })
    ct+=r;
}


setInterval(a, 20);

/* conexão com o back-end*/
const body = document.getElementsByTagName('body')[0];
const confirmacao = document.getElementById('confirmacao');
const img_conf = document.querySelector('#confirmacao img');
const h1_conf = document.querySelector('#confirmacao h1');
const btn_conf = document.querySelector('#confirmacao button');
const btns = document.querySelectorAll('.botao');
const imgs = document.querySelectorAll('div.item img');
const url_prod = "http://localhost:3000/livros";

let titulo_livro_selecionado; 

btns.forEach((btn, ind) => {
    btn.addEventListener('click', (evt) => {
        if(btn.innerText == 'comprar'){
            document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
            confirmacao.style.top = window.scrollY + 'px';
            confirmacao.style.display = 'block';
            titulo_livro_selecionado = imgs[ind].alt;
            img_conf.src = imgs[ind].src;
            h1_conf.innerText = titulo_livro_selecionado;
        }
    });
});

btn_conf.addEventListener('click', () => {
    const token = sessionStorage.getItem('Key'); 
    console.log(token);
    fetch(url_prod, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            titulo_livro: titulo_livro_selecionado,
            quantidade: document.getElementById('iqtde').value
        })
    })
    .then(res => {
        if (res.ok) {
            alert("compra realizada com sucesso!");
        } else {
            alert('Não foi possível realizar a compra.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao processar a compra.');
    });
    confirmacao.style.display = 'none';
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
});

document.querySelector('#fechar1').addEventListener('click', (evt)=>{
    document.getElementById('confirmacao').style.display = 'none';
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
})

/* carrinho de compra */
let div_item_carrinho = [...document.querySelectorAll(".item img")]
const carrinho = document.getElementById('carrinho'); 
const fechar_it = document.getElementById('fechar_it'); 
const item_carrinho = document.getElementsByClassName('item_carrinho')[0];
const btn_carrinho = document.querySelectorAll('.carrinho');
const remove_carrinho = document.querySelectorAll('.remove_carrinho');
let img_it = document.querySelector('#carrinho img');
let h1_it = document.querySelector('#carrinho h1');
const campo_disp = document.querySelector('#disp input');
const campo_preco = document.querySelector('#preco_it input');
const add = document.querySelector('.item_carrinho button');
const qt_it = document.querySelector("#qt_it input");
const meu_cart = document.getElementById('cartmen');
const lista_cart = document.getElementById('lista_cart');
const lista_cart_container = document.getElementById('container');
const lista_cart_close = document.querySelector('#lista_cart span');


let titulo_livro_selecionado_it;

btn_carrinho.forEach((el,ind)=>{
    el.addEventListener('click', (evt)=>{
    carrinho.style.display = 'flex';
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    carrinho.style.top = window.scrollY + 'px';
    carrinho.style.display = 'flex';
    titulo_livro_selecionado_it = imgs[ind].alt;
    img_it.src = imgs[ind].src;
    h1_it.innerText = titulo_livro_selecionado_it;
    })
    el.addEventListener('click', ()=>{
        const token = sessionStorage.getItem('Key');
        const url_cart = `http://localhost:3000/cart/${titulo_livro_selecionado_it}`;
        fetch(url_cart,{
            method: "GET",
            headers: {"Content-Type": "application/json", 
                     "Authorization": "Bearer " + token}
        })
        .then((result)=>{
            if(result.ok){
                console.log(result)
            }
            return result.json();
        }).then((data)=>{
            console.log(data.preco)
            campo_disp.value = data.quantidade
            campo_preco.value = data.preco
            console.log(data.quantidade)
        })
        .catch((err)=>{
            console.log('Deu errado!')
            console.log(err)
        })
    })
    
});

function obter_link(titulo){
    let cont = 0
    div_item_carrinho.map((el, i)=>{
        if(el.alt == titulo){
            cont = i
        }
    })
    return div_item_carrinho[cont].src 
}

console.log(obter_link(titulo_livro_selecionado_it))

add.addEventListener('click', (evt)=>{
    let token = sessionStorage.getItem("Key");
    const url_cart = `http://localhost:3000/cart`;
    fetch(url_cart, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            username: sessionStorage.getItem('User1'),
            item: titulo_livro_selecionado_it,
            qtd_item: qt_it.value,
            preco: campo_preco.value,
            link: obter_link(titulo_livro_selecionado_it)
        })
    })
    .then((result)=>{
        if(result.ok){
            alert('Produto adicionado ao carrinho com sucesso!')
            btn_carrinho.forEach((el, ind)=>{
                if(el.parentElement.firstElementChild.alt == titulo_livro_selecionado_it){
                    el.style.display = 'none';
                    remove_carrinho[ind].style.display = 'block';
                }
            });
            carrinho.style.display = 'none';
            document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
            window.location.reload()
        }else{
            alert('Não foi possível adicionar ao carrinho')
        }
        console.log(titulo_livro_selecionado_it)
    }).catch((err)=>{
        if(err){
            alert('ação mal sucedida')
        }
    })
})

remove_carrinho.forEach((el, ind)=>{
    el.addEventListener('click', (evt)=>{
        titulo_livro_selecionado_it = evt.target.parentElement.firstElementChild.alt
        const token = sessionStorage.getItem('Key');
        const url_cart = `http://localhost:3000/cart`;
        fetch(url_cart, {
            method: "DELETE",
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "username": sessionStorage.getItem('User1'), 
                "titulo_livro": el.parentElement.firstElementChild.alt
            })
        })
        .then((result)=>{
            if(result.ok){
                alert('produto removido do carrinho com sucesso!')
                evt.target.style.display = 'none';
                btn_carrinho.forEach((el, i)=>{
                    if(el.parentElement.firstElementChild.alt == titulo_livro_selecionado_it){
                        btn_carrinho[i].style.display = 'block'
                    }
                })
            }else{
                alert('não foi possível remover o item')
            }
        }).catch((err)=>{
            if(err){
                alert('algo deu muito errado')
            }
        })
    })
});

fechar_it.addEventListener('click', (evt)=>{
    carrinho.style.display = 'none';
    document.getElementsByTagName('body')[0].style.overflowY = 'visible';
});



meu_cart.addEventListener('click', (e)=>{  
lista_cart.style.display = 'flex';
const token = sessionStorage.getItem('Key');
const url_cart = `http://localhost:3000/cart/itens/${sessionStorage.getItem("User1")}`  
fetch(url_cart, {
    method: "GET",
    headers: {"Content-Type": "application/json",
            "Authorization": "Bearer " + token
    },
})
.then((result)=>{return result.json()})
.then((data)=>{
    listar_livros(data);
    const lista_cart_imgs = document.querySelectorAll('#lista_cart img');
    const delete_btn = document.querySelectorAll('.delete_btn');
    let token = sessionStorage.getItem("Key");
    let url_cart = "http://localhost:3000/cart";
    delete_btn.forEach((el, i)=>{
        el.addEventListener('click', (e)=>{
            lista_cart_container.removeChild(el.parentElement.parentElement.children[i])
            
            fetch(url_cart, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    "username": sessionStorage.getItem('User1'), 
                    "titulo_livro": lista_cart_imgs[i].alt
                })
            }).then((result)=>{
                if(result.ok){
                    alert("Livro removido do carrinho com sucesso")
                }else{
                    alert("Não foi possível fazer a remoção do livro")
                }
            })
            .catch((error)=>{
                if(error){
                    alert("Erro na requisição")
                }
            })
        })
})
})
})



lista_cart_close.addEventListener('click', (e)=>{
    lista_cart.style.display = 'none';
})


function login_ativado(){
    document.querySelectorAll('nav ul li')[3].style.display = 'none';
    document.querySelectorAll('nav ul li')[4].style.display = 'none';
    document.querySelector('#cartmen').style.display = 'block';
}


function listar_livros(lista){
    lista.map((campo, ind)=>{
        if(lista_cart_container.childElementCount < lista.length){
            let div_item_cart = document.createElement("div")
            div_item_cart.setAttribute("class", "item_cart")
            let img_item_cart = document.createElement(`img`)
            img_item_cart.src = campo.link
            img_item_cart.alt = campo.item
            div_item_cart.appendChild(img_item_cart)
            let especificacoes = document.createElement(`div`)
            especificacoes.setAttribute("class", "especificacoes")
            let h1 = document.createElement(`h1`)
            h1.innerText = campo.item
            especificacoes.appendChild(h1)
            let div_quant = document.createElement(`div`)
            let label_quant = document.createElement(`label`)
            label_quant.for = "iquantia_cart"
            label_quant.innerText = "Quantidade:"
            let input_quant = document.createElement(`input`)
            input_quant.type = "number"
            input_quant.id = "iquantia_cart"
            input_quant.value = campo.qtd_item
            input_quant.setAttribute("readonly", "readonly")
            div_quant.appendChild(label_quant)
            div_quant.appendChild(input_quant)
            especificacoes.appendChild(div_quant)
            let div_preco = document.createElement(`div`)
            let label_preco = document.createElement(`label`)
            label_preco.for = "ipreco_cart"
            label_preco.innerText = "Preço:"
            let input_preco = document.createElement(`input`)
            input_preco.type = "number"
            input_preco.id = "ipreco_cart"
            input_preco.value = campo.preco
            input_preco.setAttribute("readonly", "readonly")
            div_preco.appendChild(label_preco)
            div_preco.appendChild(input_preco)
            especificacoes.appendChild(div_preco)
            div_item_cart.appendChild(especificacoes)
            let del_cart = document.createElement(`button`)
            del_cart.type = "button"
            del_cart.className = "delete_btn"
            del_cart.innerText = "Remover do carrinho"
            div_item_cart.appendChild(del_cart)

            lista_cart_container.appendChild(div_item_cart)    
        }  
        
    })
    let p = document.createElement("p");
    if(lista.length == 0 && lista_cart_container.childNodes.length <= 1){
        console.log('os')
        p.innerText = "Nenhum resultado encontrado"
        lista_cart_container.appendChild(p)
    }
}

if(sessionStorage.getItem("Key")){
    login_ativado();
}

