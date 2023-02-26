var IGRA;
var BODOVI = 0;

async function Postavi() {
    var sifra_igre = localStorage.getItem("sifra");

    IGRA = JSON.parse(await ReadFile(`igre/${sifra_igre}.txt`));

    document.querySelectorAll(".zadati-broj").forEach((item, index) => {
        item.innerHTML = `${IGRA.zadaci[index]}<sub class="brojni-sistem">${IGRA.brsz[index]}</sub>`;
    });
    document.querySelectorAll(".odgovor").forEach((item, index) => {
        item.querySelector(".brojni-sistem").innerHTML = IGRA.brso[index];
    });

    TIMER = setInterval(() => {
        Odbrojavanje(document.querySelector(".timer"));
    }, 1000);
}
function Kraj() {
    document.querySelectorAll(".unos").forEach((item, index) => {
        if(item.value == IGRA.odgovori[index]){
            BODOVI += 3;
            item.parentElement.classList.toggle("dobro");
        }
        else {
            item.parentElement.classList.toggle("lose");
        }
    });
    var msg = `Osvojili ste ${BODOVI} poena.`;
    
    setTimeout(() => {
        Go_To_Kontrolna(msg);
    }, 3000);
}
function Potvrdi() {
    document.querySelector(".timer").innerHTML = 0;
}