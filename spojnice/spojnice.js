var IGRA;
var KORAK = 0;
var BODOVI = 0;

async function Postavi() {
    var sifra_igre = localStorage.getItem("sifra");
    var redovi = document.querySelectorAll("div.red");

    IGRA = JSON.parse(await ReadFile(`igre/${sifra_igre}.txt`));
    IGRA.lijeva_strana = Shuffle_Array(IGRA.lijeva_strana);
    IGRA.desna_strana = Shuffle_Array(IGRA.desna_strana);
    
    redovi.forEach((item, index) => {
        item.querySelectorAll("button")[0].innerHTML = IGRA.lijeva_strana[index];
        item.querySelectorAll("button")[1].innerHTML = IGRA.desna_strana[index];
    });

    redovi[KORAK].querySelector("button").classList.toggle("marker");

    TIMER = setInterval(() => {
        Odbrojavanje(document.querySelector(".timer"));
    }, 1000);
}
function Odaberi(odabran) {
    var markiran = document.querySelector("button.marker");
    var spojeno = markiran.innerHTML + "-" + odabran.innerHTML;

    if(IGRA.rjesenja.indexOf(spojeno) > -1) {
        IGRA.rjesenja =  IGRA.rjesenja.filter(item => item != spojeno);
        markiran.classList.remove("marker");
        markiran.classList.add("dobro");
        odabran.classList.add("dobro");
        odabran.disabled = true;
        BODOVI++;
    }
    else {
        markiran.classList.remove("marker");
        markiran.classList.add("lose");
    }

    Next();
}
function Next() {
    KORAK++;
    if(KORAK <= 8) {
        document.querySelectorAll("div.red")[KORAK].querySelector("button").classList.toggle("marker");
    }
    else {
        Kraj();
        clearInterval(TIMER)
    }
}
function Kraj() {
    var msg = "Rješenja: \n";

    IGRA.rjesenja.forEach((item) => {
        msg += item + "\n";
    });

    msg += `\nOsvojili ste ${BODOVI} poena.`;
    
    document.querySelectorAll(".red button").forEach((item) => {
        item.disabled = true;
    })

    setTimeout(() => {
        Go_To_Kontrolna(msg);
    }, 3000);
}