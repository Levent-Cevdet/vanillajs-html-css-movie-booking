const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//convert string type to number type with (+) operator
let ticketPrice = +movieSelect.value;

//Save selected movie and price
function setMovieData(...param) {
    localStorage.setItem('selectedMovieIndex', param[0]);
    localStorage.setItem('selectedMovieValue', param[1]);
}
//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    //selected seats index save to locale stroge
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//movieSelect change event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
})

//seat click event
container.addEventListener('click', e => {
    //only select in the document model seat and none occupied classes
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        //toggle button selected and unselected
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})