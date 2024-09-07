window.addEventListener("load", () => {
    if(sessionStorage.getItem("Key")){
        fetch(`http://localhost:3000/login/decode`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"jwt": sessionStorage.getItem("Key")})
        })
        .then((result) => {
        return result.json();        
        })
        .then((data) => {
            const currentTime = Date.now();
            const expirationTime = data.exp * 1000;
            if (currentTime > expirationTime) {
                sessionStorage.removeItem("User1");
                sessionStorage.removeItem("Key");
                alert("Sua sessão expirou. Faça login novamente!");
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Ocorreu um erro. Tente novamente mais tarde.");
        });
    }
});
