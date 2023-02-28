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
    var time = t.getAttribute("time");
    var time_left = t.getAttribute("time-left");
    if(time_left * 1 < 1) {
        Kraj(false);
        clearInterval(TIMER);
    }
    else {
        t.setAttribute("time-left", --time_left);
        t.querySelector(".time-left").innerHTML = time_left;
        var style_content = `--time-left-fill: ${(time_left / time * 100)}%;`
        t.setAttribute("style", style_content);
    }
}
function Go_To_Kontrolna(msg){
    alert(msg);
    window.location.href = "../kontrolna-tabla/";
}
function Resize(elem) {
    elem.style.width = (elem.value.length + 1) * 15 + "px";
}