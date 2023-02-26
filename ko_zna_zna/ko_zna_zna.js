var IGRA;
var BR_PITANJA = 0;
var BODOVI = 0;

async function Postavi() {
    var sifra_igre = localStorage.getItem("sifra");

    IGRA = JSON.parse(await ReadFile(`igre/${sifra_igre}.txt`));
    document.querySelector(".pitanje").innerHTML = IGRA.zadaci[BR_PITANJA].pitanje;
    document.querySelectorAll("span.odgovor")[0].innerHTML = IGRA.zadaci[BR_PITANJA].a;
    document.querySelectorAll("span.odgovor")[1].innerHTML = IGRA.zadaci[BR_PITANJA].b;
    document.querySelectorAll("span.odgovor")[2].innerHTML = IGRA.zadaci[BR_PITANJA].c;
    document.querySelectorAll("span.odgovor")[3].innerHTML = IGRA.zadaci[BR_PITANJA].d;
    TIMER = setInterval(() => {
        Odbrojavanje(document.querySelector(".timer"));
    }, 1000);
}
function Provjeri(elem) {
    var odgovor = elem.querySelector(".odgovor").innerHTML;
    var to = IGRA.zadaci[BR_PITANJA][IGRA.zadaci[BR_PITANJA].tacan_odgovor];

    if(odgovor === to) {
        elem.classList.add("dobro");
        BODOVI += 2;
    }
    else {
        elem.classList.add("lose");
    }
    Next();
}
function Next() {
    setTimeout(() => {
        document.querySelector(".container").classList.remove("smjena-pitanja");

        setTimeout(() => {
            BR_PITANJA++;

            if(BR_PITANJA >= 10) {
                Kraj();
                clearInterval(TIMER);
                return;
            }

            var btns = document.querySelectorAll(".red div");
    
            btns.forEach((item) => {
                if(item.classList.contains("dobro")) item.classList.toggle("dobro");
                if(item.classList.contains("lose")) item.classList.toggle("lose");
            })

            document.querySelector(".pitanje").innerHTML = IGRA.zadaci[BR_PITANJA].pitanje;
            document.querySelectorAll("span.odgovor")[0].innerHTML = IGRA.zadaci[BR_PITANJA].a;
            document.querySelectorAll("span.odgovor")[1].innerHTML = IGRA.zadaci[BR_PITANJA].b;
            document.querySelectorAll("span.odgovor")[2].innerHTML = IGRA.zadaci[BR_PITANJA].c;
            document.querySelectorAll("span.odgovor")[3].innerHTML = IGRA.zadaci[BR_PITANJA].d;
            
            document.querySelector(".container").classList.add("smjena-pitanja");
        }, 500);
    }, 1500);
}
function Kraj() {
    clearInterval(TIMER);
    var msg = `Osvojili ste ${BODOVI} poena.`;

    setTimeout(() => {
        Go_To_Kontrolna(msg)
    }, 3000);
}