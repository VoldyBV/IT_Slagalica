function Zapocni() {
    if(!sessionStorage.getItem("kolo-srece-iskoristeno")){
        var ksi = new Array(1);
        ksi[0] = -1;
        sessionStorage.setItem("kolo-srece-iskoristeno", JSON.stringify(ksi));
    }
    var sifra = document.querySelector("#sifra-igre").value;
    localStorage.setItem("sifra", sifra);
    window.location.href = "kontrolna-tabla/";
}