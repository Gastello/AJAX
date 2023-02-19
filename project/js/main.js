const container = document.querySelector('.countries');


function getCountryData(country, isParent = true, isEnemy = false) {
    if (country == 'russia') {
        console.log(`don't want to spend my time to this shit`);
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
        const language = Object.values(data.languages)[0];
        const currencyName = Object.values(data.currencies)[0].name;
        const htmlCard = `  
            <div class="country__wrapper ${additionalClass}">
                <article class="country">
                    <div class="country__img">
                        <img src="${isEnemy ? `https://cdn.drawception.com/images/panels/2012/5-14/Q1MzdmHO4X-14.png` : data.flags.png}" alt="">
                    </div>
                    <div class="country__data">
                        <h3 class="country__name">
                            ${isEnemy ? `Shit Federation` : data.name.official}
                        </h3>
                        <h4 class="country__region">
                            ${isEnemy ? `Shit Region` : data.region}
                        </h4>
                        <div class="country__column">
                            <p class="country__row">
                            <span>👨‍👩‍👦‍👦</span>
                            <span>${(data.population / 1000000).toFixed(2)} million ${isEnemy ? ` shit eaters` : ''}</span>
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
        const neighbours = data.borders;
        if (isParent) getNeighbours(neighbours);
    });
}

function getNeighbours(neighbours) {
    neighbours.forEach(country => {
        if (country == 'RUS') {
            getCountryData(country, false, true);
        }
        else getCountryData(country, false);
    });
}

getCountryData(`russia`);

