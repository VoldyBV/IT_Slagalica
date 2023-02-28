var UGAO = 0;
var INTERVAL;
var BODOVI = 0;
var BOJA;
var BROJ_ZVJEZDICA = 0;
var IGRA = {};
function Vrti_Krug() {
    UGAO += 9;
    UGAO %= 360;
    var style = `transform: rotate(${UGAO}deg);`;
    document.querySelector(".tocak").setAttribute("style", style);
}
async function Postavi() {
    var tekst = await ReadFile("igre/pitanja.txt");
    IGRA.pitanja = tekst.split("\n");
    INTERVAL = setInterval(() => {
        Vrti_Krug();
    }, 1);
}
function Zavrti() {
    INTERVAL = setInterval(() => {
        Vrti_Krug();
    }, 1);
    document.querySelector(".stop").disabled = false;
}
function Zaustavi() {
    clearInterval(INTERVAL);
    document.querySelector(".stop").disabled = true;
    setTimeout(() => {
        Uzmi_Pitanje();
    }, 1000);
}
function Uzmi_Pitanje() {
    if(UGAO < 90) {
        BOJA = "crvena";
    }
    else if(UGAO < 180) {
        BOJA = "plava";
    }
    else if(UGAO < 270) {
        BOJA = "zuta";
    }
    else {
        BOJA = "zelena"
    }
    var star = Zvjezdica();
    
    if(star && BROJ_ZVJEZDICA < 2) {
        BROJ_ZVJEZDICA++;
        console.log(BROJ_ZVJEZDICA);
        document.querySelector(".modal-body .pitanje").innerHTML = "Čestitamo, izvukli ste pitanje sa zvjezdicom!";
        document.querySelector(".modal .zaglavlje").innerHTML = "&#9733;";
    }
    else {
        var index_pitanja;
        var iskoristena_pitanja = JSON.parse(sessionStorage.getItem("kolo-srece-iskoristeno"));
        
        do {
            index_pitanja = Math.floor(Math.random() * IGRA.pitanja.length);
        }while(iskoristena_pitanja.indexOf(index_pitanja) > -1);
    
        iskoristena_pitanja.push(index_pitanja);
        sessionStorage.setItem("kolo-srece-iskoristeno", JSON.stringify(iskoristena_pitanja));
        document.querySelector(".modal-body .pitanje").innerHTML = IGRA.pitanja[index_pitanja];
        document.querySelector(".modal .zaglavlje").innerHTML = (index_pitanja + 1) + ".";
    }

    document.querySelector(".modal").classList.add("modal-" + BOJA);
    document.querySelector(".modal").style.display = "flex";
}
function Zvjezdica() {

    if(BOJA == "crvena") {
        var star = Math.floor(Math.random() * 10) + 1;
        return star <= 1;
    }
    if(BOJA == "zuta") {
        var star = Math.floor(Math.random() * 10) + 1;
        return star <= 2;
    }
    if(BOJA == "zelena") {
        var star = Math.floor(Math.random() * 10) + 1;
        return star <= 3;
    }
    if(BOJA == "plava") {
        var star = Math.floor(Math.random() * 10) + 1;
        return star <= 4;
    }

    return false;
}
//prihvati ili odbij
function PID(tacno) {
    var br_koraka = document.querySelector(".timer .time-left");
    br_koraka.innerHTML = br_koraka.innerHTML * 1 + 1;

    if(tacno) BODOVI += 5;
    
    
    document.querySelector(".modal").classList = "modal";
    document.querySelector(".modal").style.display = "none";
    
    if(br_koraka.innerHTML > 5) {
        br_koraka.innerHTML = 5;
        setTimeout(() => {
            Go_To_Kontrolna(`Osvojili ste ${BODOVI} poena.`);
        }, 1000);
        return;
    }
    setTimeout(() => {
        Zavrti();
    }, 1000);
}