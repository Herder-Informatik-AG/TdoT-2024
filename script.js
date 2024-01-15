const min = 10;
const max = 100;
const maxAnzahlWürfe = 5;
const bestrafungsFaktor = -3;
const würfel = [6, 12, 20];

var würfelButtons = [];

var aktuelleRunde = 0;
var ziel;
var rundenPunkte = 0;
var gesamtPunkte = 0;
var anzahlWürfe = 0;

funktionZuweisen("rundeStarten", rundeStarten);
funktionZuweisen("zugBeenden", zugBeenden);


UIinitialisieren();

function UIinitialisieren(){
    var würfelLeiste = document.getElementById("leiste");
    würfel.forEach(zahl => {
        var button = document.createElement("button");
        button.id = "würfel-" + zahl;
        button.innerHTML = zahl + "er Würfel würfeln";
        würfelLeiste.appendChild(button);
        button.addEventListener("click", () => {würfeln(zahl)});
        würfelButtons.push(button);
    });
    document.querySelectorAll("[id='maxwürfe']").forEach(element => element.innerText = maxAnzahlWürfe);
    document.getElementById("bestrafung").innerText = Math.abs(bestrafungsFaktor);
    updateUI(true);
}

function rundeStarten(){
    ziel = zufallszahl(min, max);
    aktuelleRunde += 1;
    rundenPunkte = 0;
    anzahlWürfe = 0;
    console.log("Ziel ist: ", ziel);
    updateUI();
}

function würfeln(maxAugenzahl){
    var wurf = zufallszahl(1, maxAugenzahl);
    console.log("Du hast eine ", wurf, " gewürfelt.");
    anzahlWürfe += 1;
    rundenPunkte += wurf;
    console.log("Du hast jetzt ", rundenPunkte, " von ", ziel, " Punkten.");
    updateUI();
    if(rundenPunkte >= ziel || anzahlWürfe >= maxAnzahlWürfe){
        zugBeenden();
    }
}

function zugBeenden(){
    var score = ziel - rundenPunkte;
    if(score<0){
        console.warn("Oh nein! Du hast zu viele Punkte gesammelt!");
        score *= bestrafungsFaktor;
    }
    gesamtPunkte += score;
    console.log("Dein Zug ist beendet. Du bekommst ", score, " Punkte. Gesamtscore: ", gesamtPunkte, ".");
    updateUI(true);
}

function updateUI(rundeVorbei = false){
    document.getElementById("rundeStarten").disabled = !rundeVorbei;
    document.getElementById("leiste").classList = rundeVorbei ? "disabled" : "active";
    
    document.getElementById("runde").innerText = aktuelleRunde;
    document.getElementById("wurf").innerText = anzahlWürfe;
    document.getElementById("score").innerText = gesamtPunkte;
    
    document.getElementById("ziel").innerText = ziel;
    document.getElementById("zielAnzeigen").classList = rundeVorbei ? "disabled" : "active";
}

// HILFSFUNKTIONEN:

// Weist eine Funktion einem Knopf mit der gegebenen ID zu.
function funktionZuweisen(id, funktion){
    document.getElementById(id).addEventListener("click", funktion);
}

// Gibt eine Zufallszahl zwischen min (inklusive) und max (inklusive) zurück.
function zufallszahl(_min, _max){
    return _min + Math.floor(Math.random() * (1 + _max - _min));
}
