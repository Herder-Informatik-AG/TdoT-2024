const min = 10;
const max = 100;
const maxAnzahlWürfe = 5;
const bestrafungsFaktor = -3;

var ziel;
var rundenPunkte = 0;
var gesamtPunkte = 0;
var anzahlWürfe = 0;

function rundeStarten(){
    ziel = min + Math.floor(Math.random(max-min));
    rundenPunkte = 0;
    anzahlWürfe = 0;
    updateUI();
}

function würfeln(maxAugenzahl){
    var wurf = 1 + Math.floor(Math.random(maxAugenZahl-1));
    anzahlWürfe += 1;
    rundenPunkte += wurf;
    updateUI();
    if(rundenPunkte >= ziel || anzahlWürfe >= maxAnzahlWürfe){
        zugBeenden();
    }
}

function zugBeenden(){
    var score = ziel - rundenPunkte;
    if(score<0){
        score *= bestrafungsFaktor;
    }
    gesamtPunkte += score;
    updateUI(true);
}

function updateUI(startenKnopfAnzeigen = false){
    
}
