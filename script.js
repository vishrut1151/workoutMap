'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Geolocation API 

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // console.log(` https://www.google.com/maps/@${latitude},${longitude}`);
        const coords = [latitude, longitude]
        const map = L.map('map').setView([latitude, longitude], 15);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // L.marker(latitude, longitude).addTo(map)
        //     .bindPopup(`${latitude} ${latitude}`)
        //     .openPopup();

        map.on('click', function (mapEvent) {
            const { lat, lng } = mapEvent.latlng;
            //console.log(lat, lng);
            L.marker([lat, lng])
                .addTo(map)
                //.bindPopup(`${latitude} ${longitude}`)
                .bindPopup(
                    L.popup({
                        maxWidth: 250,
                        minWidth: 100,
                        autoClose: false,
                        closeOnClick: false,
                        className: "running-popup",


                    })
                )
                .setPopupContent('Workout')
                .openPopup();

        });
        // alert(latitude, longitude);
    }, function () {
        alert('Could not get your location');

    })

}
