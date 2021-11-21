# Realisierung eines deterministischen endlichen Automaten (DEA)

Autor: Andreas Rieger
Datum: 21.11.2021

## Aufgabenstellung

Simulation und Visualisierung der [Reber Grammar (RG)](https://willamette.edu/~gorr/classes/cs449/reber.html#top) als Deterministischen Endlichen Automaten (DEA).

## Technische Dokumentation

Die Anwendung basiert auf HTML, CSS, Javascript und SVG. Diese wurden ohne Verwendung von Frameworks implementiert.

Zur Visualisierung der Oberfläche wurde außerdem das Framework [Bootstrap v5.1](https://getbootstrap.com/) verwendet. Bootstrap liefert eine einheitliche, gut strukturierte und responsive Benutzeroberfläche, die sich verschiedenen Endgeräten anpassen lässt. Außerdem hält das Framework viele vordefinierte und ansprechend gestaltete Komponenten zur Interaktion bereit.

## Fachliche Dokumentation

Der Automat wurde als Klasse mit Javascript realisiert. Darin enthalten ist ein Objekt, welches die Ausgangs- und Folgezustände des Automaten definiert. Eingabe, Verarbeitung und Ausgabe der Zeichenfolge erfolgen nach einer getrennten Logik. Hierbei wurde versucht, dem Prinzip des Model-View-Controller (MVC) zu folgen. Bei der Umsetzung wurde besonders auf eine einfache und selbsterklärende Gestaltung geachtet.

## Programmablauf

### Eingabe

Beim Starten der Anwendung besteht die Möglichkeit zur Wahl zwischen:
* der direkten Eingabe einer Zeichenfolge, 
* der zufälligen Auswahl einer gültigen Zeichenfolge oder 
* der Erstellung einer zufälligen Zeichenfolge unter Verwendung der im Alphabet vorgegebenen Zeichen.

Bei der Eingabe einer individuellen Zeichenfolge erfolgt eine skript-gestützte Überprüfung nach Semantik und Länge. Der Automat kann erst nach Eingabe einer nach dem Alphabet gültigen, ausreichend langen Zeichenfolge (mindestens 5 Zeichen) gestartet werden.

### Datenverarbeitung

Zunächst erfolgt die Erstellung eines Objekts durch die Instanziierung der Automatenklasse. 
Der Automat durchläuft die übergebene Zeichenfolge und ermittelt für jedes Zeichen den jeweils gültigen Folgezustand. Wenn kein Folgezustand existiert, wird die Ausführung des Programms abgebrochen und das Ergebnis als Objekt an den Aufrufer zurückgegeben.

### Ausgabe
Die (Un-)Gültigkeit der dem Automaten übergebenen Zeichenfolge wird als Warn- bzw. Erfolgsmeldung angezeigt.

Im nächsten Schritt werden die Ergebnisse als Graph und als Werte in der Zustandstabelle ausgegeben. Hierbei kann zwischen sofortiger oder sequenzieller Ausgabe gewählt werden. Richtige und falsche Ergebnisse werden dabei farblich hervorgehoben.

