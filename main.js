var TIMER;
async function ReadFile(file) {
    return (await fetch(file)).text();
}
function Shuffle_Array(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}
function Odbrojavanje(t) {
    if(t.innerHTML * 1 < 1) {
        Kraj(false);
        clearInterval(TIMER);
    }
    else {
        t.innerHTML = t.innerHTML * 1 - 1;
    }
}
function Go_To_Kontrolna(msg){
    alert(msg);
    window.location.href = "../kontrolna-tabla/";
}
function Resize(elem) {
    elem.style.width = (elem.value.length + 1) * 15 + "px";
}