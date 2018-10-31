"use strict"

// klasa Stopwatch
class Stopwatch {
    constructor(display) { //konstruktor
        this.running = false; //wartość początkowa stopera - stoper nie pracuje
        this.display = display; // element DOM, pod którym znajduje się stoper
        this.reset(); //resetowanie licznika
        this.print(this.times); //drukowanie czasów
    }

//implementacja metod, które będą wykonywane po kliknięciu w odpowiedni przycisk
    // metoda reset - zeruje stoper
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    // metoda print ustawia wewnętrzny tekst elementu DOM, który znajduje się pod atrybutem display
    print() {
        this.display.innerText = this.format(this.times);
    }

    /* metoda format zajmuje się przygotowaniem tekstu do wyświetlenia. Metoda ta zwraca szablon,
    który wykorzystuje obiekt (times) podany do metody. Korzystamy w tym miejscu z konstrukcji ${nazwa_zmiennej},
    która umożliwia nam przekazanie wyniku kolejnej funkcji (pad0) jako jeden z elementu szablonu. */ 
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) { //sprawdzenie czy stoper nie jest uruchomiony
            this.running = true; // jeśli stoper był wyłączony to go uruchamiamy
            this.watch = setInterval(() => this.step(), 10); /* Stoper działa w oparciu o interwał,
            który odpala co 10 ms metodę step (która jest po prostu kolejnym tikiem stopera).
            Funkcja setInterval przyjmuje jako pierwszy argument callback, stąd arrow function. */
        }
    }
    /* Metoda step sprawdza, czy nasz timer jest uruchomiony. Jeśli tak, należy metodą calculate przeliczyć odpowiednio
    minuty, sekundy i milisekundy, a następnie wydrukować wynik za pomocą metody print. */
    step() {
        if (!this.running) return; //sprawdzenie czy stoper jest iruchomiony
        this.calculate(); //jeśli tak to wykorzystujemy metodę calculate
        this.print(); // drukowanie
    }
    /* metoda calculate ma na celu odpowiednie zerowanie wartości milisekund i sekund,
    jeśli te przekroczą pewną wartość i odpowiednie zwiększanie sekund i minut. */
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    /* Metoda stop zatrzymuje licznik ustawiając flagę running na false,
    a następnie czyści interwał, który kryje się pod atrybutem watch. */
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
    // Metoda resetWatch zeruje licznik po kliknięciu na guzik "Reset Watch".
    resetWatch() {
        this.reset();
        this.print();
    }
    // Metoda addListItem przekazuje wynik do listy czasów
    addListItem() {
       const list = document.querySelector('.results');
       const listItem = document.createElement('li');
       listItem.innerHTML = this.format(this.times);
       list.appendChild(listItem);
    }
    // Metoda resetList resetuje listę czasów
    resetList() {
        document.querySelector('.results').innerHTML = '';
    }

}
/* Funkcja pad0 ma za zadanie dodać zero do liczb jednocyfrowych. Funkcja ta przyjmuje na wejście wartość liczbową,
przekształca ją na stringa, a następnie sprawdza czy długość tego przekształcenia jest mniejsza od 2 dodając tym samym
zero przed tę liczbę. */
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

// nowy obiekt tworzony na bazie konstruktora
const stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'));

// metody, które będą wykonywane po kliknięciu w odpowiednie przyciski:
let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetWatch());

let addButton = document.getElementById('add_to_list');
addButton.addEventListener('click', () => stopwatch.addListItem());

let removeButton = document.getElementById('reset_time_list');
removeButton.addEventListener('click', () => stopwatch.resetList());
