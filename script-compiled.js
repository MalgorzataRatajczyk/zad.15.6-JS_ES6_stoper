"use strict";

// klasa Stopwatch

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        //konstruktor
        this.running = false; //wartość początkowa stopera - stoper nie pracuje
        this.display = display; // element DOM, pod którym znajduje się stoper
        this.reset(); //resetowanie licznika
        this.print(this.times); //drukowanie czasów
    }

    //implementacja metod, które będą wykonywane po kliknięciu w odpowiedni przycisk
    // metoda reset - zeruje stoper


    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }

        // metoda print ustawia wewnętrzny tekst elementu DOM, który znajduje się pod atrybutem display

    }, {
        key: 'print',
        value: function print() {
            this.display.innerText = this.format(this.times);
        }

        /* metoda format zajmuje się przygotowaniem tekstu do wyświetlenia. Metoda ta zwraca szablon,
        który wykorzystuje obiekt (times) podany do metody. Korzystamy w tym miejscu z konstrukcji ${nazwa_zmiennej},
        która umożliwia nam przekazanie wyniku kolejnej funkcji (pad0) jako jeden z elementu szablonu. */

    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            if (!this.running) {
                //sprawdzenie czy stoper nie jest uruchomiony
                this.running = true; // jeśli stoper był wyłączony to go uruchamiamy
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10); /* Stoper działa w oparciu o interwał,
                        który odpala co 10 ms metodę step (która jest po prostu kolejnym tikiem stopera).
                        Funkcja setInterval przyjmuje jako pierwszy argument callback, stąd arrow function. */
            }
        }
        /* Metoda step sprawdza, czy nasz timer jest uruchomiony. Jeśli tak, należy metodą calculate przeliczyć odpowiednio
        minuty, sekundy i milisekundy, a następnie wydrukować wynik za pomocą metody print. */

    }, {
        key: 'step',
        value: function step() {
            if (!this.running) return; //sprawdzenie czy stoper jest iruchomiony
            this.calculate(); //jeśli tak to wykorzystujemy metodę calculate
            this.print(); // drukowanie
        }
        /* metoda calculate ma na celu odpowiednie zerowanie wartości milisekund i sekund,
        jeśli te przekroczą pewną wartość i odpowiednie zwiększanie sekund i minut. */

    }, {
        key: 'calculate',
        value: function calculate() {
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

    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);
        }
        // Metoda resetWatch zeruje licznik po kliknięciu na guzik "Reset Watch".

    }, {
        key: 'resetWatch',
        value: function resetWatch() {
            this.reset();
            this.print();
        }
        // Metoda addListItem przekazuje wynik do listy czasów

    }, {
        key: 'addListItem',
        value: function addListItem() {
            var list = document.querySelector('.results');
            var listItem = document.createElement('li');
            listItem.innerHTML = this.format(this.times);
            list.appendChild(listItem);
        }
        // Metoda resetList resetuje listę czasów

    }, {
        key: 'resetList',
        value: function resetList() {
            document.querySelector('.results').innerHTML = '';
        }
    }]);

    return Stopwatch;
}();
/* Funkcja pad0 ma za zadanie dodać zero do liczb jednocyfrowych. Funkcja ta przyjmuje na wejście wartość liczbową,
przekształca ją na stringa, a następnie sprawdza czy długość tego przekształcenia jest mniejsza od 2 dodając tym samym
zero przed tę liczbę. */


function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

// nowy obiekt tworzony na bazie konstruktora
var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

// metody, które będą wykonywane po kliknięciu w odpowiednie przyciski:
var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
    return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
    return stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    return stopwatch.resetWatch();
});

var addButton = document.getElementById('add_to_list');
addButton.addEventListener('click', function () {
    return stopwatch.addListItem();
});

var removeButton = document.getElementById('reset_time_list');
removeButton.addEventListener('click', function () {
    return stopwatch.resetList();
});
