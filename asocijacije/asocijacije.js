var IGRA;
var KASA = {
    a: 6,
    b: 6,
    c: 6,
    d: 6
};
var BODOVI = 0;


async function Postavi() {
    var sifra_igre = localStorage.getItem("sifra");
    IGRA = JSON.parse(await ReadFile(`igre/${sifra_igre}.txt`));
    TIMER = setInterval(() => {
        Odbrojavanje(document.querySelector(".timer"));
    }, 1000);
}
function Otkrij_Polje(polje){
    var kolona = polje.innerHTML.split('')[0];
    var broj = polje.innerHTML.split('')[1] - 1;

    KASA[kolona]--;

    polje.innerHTML = IGRA[kolona][broj];
    polje.disabled = true;
}
function Provjeri_Kolonu(polje) {
    var kolona = polje.getAttribute("kolona");
    //ako nije pogođeno rjesenje, izadji iz funkcije
    if(polje.value.toUpperCase() != IGRA.rjesenja_kolona[kolona].toUpperCase()){
        polje.value = "";
        return;
    };
    //ako jeste, nastavi sa funkcijom

    BODOVI += KASA[kolona];
    
    var polja_kolone = document.querySelectorAll(`[name=col-${kolona}]`);

    polja_kolone.forEach((item) => {
        item.click();
        item.classList.add("dobro");
    });

    polje.disabled = true;
    polje.classList.add("dobro");
    KASA[kolona] = 0;
}
function Provjeri_Konacno(polje) {
    //ako nije pogođeno rjesenje, izadji iz funkcije
    if(polje.value.toUpperCase() != IGRA.konacno_rjesenje.toUpperCase()){
        polje.value = "";
        return
    };
    //ako jeste, nastavi sa funkcijom

    BODOVI += 8;

    var polja_rjesenja = document.querySelectorAll("input[kolona]");

    polja_rjesenja.forEach((item) => {
        var e = new Event("change");
        item.value = IGRA.rjesenja_kolona[item.getAttribute("kolona")];
        item.dispatchEvent(e);
    })

    polje.disabled = true;
    polje.classList.add("dobro");

    Kraj(true);
    clearInterval(TIMER)
}
function Kraj(pobjeda) {
    var msg
    if(pobjeda) {
        msg = `Osvojili ste ${BODOVI} poena.`;
    }
    else {
        msg = `
Kolona A: ${IGRA.rjesenja_kolona.a}
Kolona B: ${IGRA.rjesenja_kolona.b}
Kolona C: ${IGRA.rjesenja_kolona.c}
Kolona D: ${IGRA.rjesenja_kolona.d}
Konačno rješenje: ${IGRA.konacno_rjesenje}\n
Osvojili ste ${BODOVI} poena.
        `;
        document.querySelectorAll("[name=col-a]").forEach((item, index) => {
            item.disabled = true;
            item.innerHTML = IGRA["a"][index];
            item.classList.add("lose");
        });
        document.querySelectorAll("[name=col-b]").forEach((item, index) => {
            item.disabled = true;
            item.innerHTML = IGRA["b"][index];
            item.classList.add("lose");
        });
        document.querySelectorAll("[name=col-c]").forEach((item, index) => {
            item.disabled = true;
            item.innerHTML = IGRA["c"][index];
            item.classList.add("lose");
        });
        document.querySelectorAll("[name=col-d]").forEach((item, index) => {
            item.disabled = true;
            item.innerHTML = IGRA["d"][index];
            item.classList.add("lose");
        });
        document.querySelectorAll(".red input").forEach((item) => {
            item.disabled = true;
            item.value = IGRA.rjesenja_kolona[item.getAttribute("kolona")];
            item.classList.add("lose");
        });

        document.querySelector("#konacno").value = IGRA.konacno_rjesenje;
        document.querySelector("#konacno").classList.add("lose");
    }

    setTimeout(() => {
        Go_To_Kontrolna(msg);
    }, 3000);
}