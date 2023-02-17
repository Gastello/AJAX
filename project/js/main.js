const container = document.querySelector('.country__wrapper');

function getCountryData(country) {
    const request = new XMLHttpRequest();
    console.log(country);
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send(); 
    request.addEventListener('load', function () {
        let [data] = JSON.parse(this.responseText)
        console.log(data);
        let language = Object.values(data.languages)[0];
        let currencyName = Object.values(data.currencies)[0].name;
        let htmlCard = `
        <article class="country">
        <div class="country__img">
            <img src="${data.flags.png}" alt="">
        </div>
        <div class="country__data">
        <h3 class="country__name">
            ${data.name.official}
        </h3>
        <h4 class="country__region">
            ${data.region}
        </h4>
        <div class="country__column">
            <p class="country__row">
                <span>👨‍👩‍👦‍👦</span>
                <span>${(data.population / 1000000).toFixed(2)} млн</span>
            </p>
            <p class="country__row">
                <span>🌐</span>
                <span>${language}</span>
            </p>
            <p class="country__row">
                <span>💸</span>
                <span>${currencyName}</span>
            </p>
        </div>
        </div>
        </article> 
    `;
        container.insertAdjacentHTML('beforeend', htmlCard);
    });
}
getCountryData(`ukraine`);
getCountryData(`usa`);
getCountryData(`poland`);
getCountryData(`australia`);
getCountryData(`france`);
getCountryData(`africa`);
getCountryData(`netherland`);
getCountryData(`canada`);


