var IGRA;
var BR_PITANJA = 0;
var BODOVI = 0;
async function Postavi() {
    var sifra_igre = localStorage.getItem("sifra");

    IGRA = JSON.parse(await ReadFile(`igre/${sifra_igre}.txt`));
    document.querySelector(".pitanje").innerHTML = IGRA.pitanja[BR_PITANJA];
    document.querySelector(".container").classList.add("smjena-pitanja");
    TIMER = setInterval(() => {
        Odbrojavanje(document.querySelector(".timer"));
    }, 1000);
}
function Provjeri(elem, odgovor) {
    
    if(odgovor === IGRA.odgovori[BR_PITANJA]) {
        elem.classList.add("dobro");
        BODOVI += 2;
    }
    else {
        elem.classList.add("lose");
        BODOVI--;
    }
    Next();
}
function Next() {
    setTimeout(() => {
        document.querySelector(".container").classList.remove("smjena-pitanja");

        setTimeout(() => {
            BR_PITANJA++;

            if(BR_PITANJA >= 6) {
                Kraj();
                clearInterval(TIMER);
                return;
            }

            var btns = document.querySelectorAll(".red button");
    
            btns.forEach((item) => {
                if(item.classList.contains("dobro")) item.classList.toggle("dobro");
                if(item.classList.contains("lose")) item.classList.toggle("lose");
            })
            document.querySelector(".pitanje").innerHTML = IGRA.pitanja[BR_PITANJA];
            document.querySelector(".container").classList.add("smjena-pitanja");
        }, 500);
    }, 1500);
}
function Kraj() {
    document.querySelectorAll(".red button").forEach((item) => {
        item.disabled = true;
    });
    clearInterval(TIMER);
    var msg = `Osvojili ste ${BODOVI} poena.`;
    setTimeout(() => {
        Go_To_Kontrolna(msg);
    }, 3000);
}