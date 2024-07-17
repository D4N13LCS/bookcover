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

window.addEventListener('load', function() {
  window.dispatchEvent(new Event('resize'));
});

window.addEventListener('load', function() {
  document.body.style.display = 'none';
  document.body.offsetHeight; // Forçar recalculo do layout
  document.body.style.display = '';
});

/* conexão com o back-end*/

const btns = document.querySelectorAll('.botao');
const imgs = document.querySelectorAll('div.item img');
const url_prod = "http://localhost:3000/livros";


btns.forEach((btn, ind) => {
    btn.addEventListener('click', (evt) => {
        const token = localStorage.getItem('token'); 
        console.log(token);
        fetch(url_prod, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                titulo_livro: imgs[ind].alt
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
})
});
