const container = document.querySelector('.countries');

function displayCountry(data, additionalClass) {
    const nameOfficial = data.name.official;
    const isEnemy = nameOfficial == `Russian Federation`;
    const language = Object.values(data.languages)[0];
    const currencyName = Object.values(data.currencies)[0].name;
    const population = (data.population / 1000000).toFixed(2);
    const region = data.region;
    const flagSource = data.flags.png;
    const htmlCard = `  
        <div class="country__wrapper ${additionalClass}">
            <article class="country">
                <div class="country__img">
                    <img src="${isEnemy ? `https://cdn.drawception.com/images/panels/2012/5-14/Q1MzdmHO4X-14.png` : flagSource}" alt="flag">
                </div>
                <div class="country__data">
                    <h3 class="country__name">
                        ${isEnemy ? `Shit Federation` : nameOfficial}
                    </h3>
                    <h4 class="country__region">
                        ${isEnemy ? `Shit Region` : region}
                    </h4>
                    <div class="country__column">
                        <p class="country__row">
                        <span>👨‍👩‍👦‍👦</span>
                        <span>${population} million ${isEnemy ? ` shit eaters` : ''}</span>
                        </p>
                        <p class="country__row">
                        <span>🌐</span>
                        <span>${isEnemy ? language + ` shit language` : language}</span>
                        </p>
                        <p class="country__row">
                        <span>💸</span>
                        <span>${currencyName}</span>
                        </p>
                    </div>
                </div>
            </article>
            </div>
    `;
    container.insertAdjacentHTML('beforeend', htmlCard);
}
function getNeighbours(neighbours) {
    neighbours.forEach(country => {
        getCountryData(country, false);
    });
}
function getCountryData(country, isParent = true) {
    if (country == 'russia') {
        container.textContent = `don't want to waste my time to this shit`;
        return;
    }

    let additionalClass = "";
    const nameLink = `https://restcountries.com/v3.1/name/`;
    const codeLink = `https://restcountries.com/v3.1/alpha/`;
    const request = new XMLHttpRequest();
    if (isParent) {
        request.open('GET', `${nameLink}${country}`);
    } else {
        request.open('GET', `${codeLink}${country}`);
        additionalClass = 'country__neighbour';
    }
    request.send();
    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        displayCountry(data, additionalClass);
        if (isParent) getNeighbours(data.borders);
    });
}

getCountryData(`ukraine`);

