class City {
    constructor(name, latitude, longitude, population, key) {
        this.name = name;
        this.latitude = Number(latitude);
        this.longitude = Number(longitude);
        this.population = Number(population);
        this.key = key;
    }

    show() {
        return `${this.name}: Latitude: ${this.latitude} Longitude: ${this.longitude} Population: ${this.population}`;
    }

    movedIn(num) {
        this.population += Number(num);

    }

    movedOut(num) {
        this.population -= Number(num);

    }

    showPop() {
        return this.population;
    }

    howBig() {
        if (this.population == 0) {
            return "No Population"
        }
        if (this.population > 0 && this.population <= 100) {
            return "Hamlet: 1-100";
        }
        if (this.population > 100 && this.population < 1000) {
            return "Village: 101-999"
        }
        if (this.population >= 1000 && this.population < 20000) {
            return "Town: 1,000-20,000";
        }
        if (this.population >= 20000 && this.population < 100000) {
            return "Large Town: 20,000-100,000";
        }
        if (this.population >= 100000) {
            return "City: 100,000+";
        }
    }
}

class Community {
    constructor() {
        this.cityArray = [];
        this.counter = 1;
    }

    nextKey() {
        return `k${this.counter++}`;
    }

    getNameFromKey(key) {
        for (let i = 0; i < this.cityArray.length; i++) {
            if (key == this.cityArray[i].key)
                return this.cityArray[i].name
        }
    }

    getObjectFromKey() {
        for (let i = 0; i < this.cityArray.length; i++) {
            if (key == this.cityArray[i].key)
                return this.cityArray;
        }
    }

    createCity(name, latitude, longitude, population) {
        const key = this.nextKey();
        this.cityArray.push(new City(name, latitude, longitude, population, key));
        return `Created ${name} city with key: ${key}`;
    }

    createCard(city) {
        let newCard = document.createElement('div')
        newCard.setAttribute('class', 'card')
        newCard.setAttribute('id', 'card')
        newCard.setAttribute('key', city.key)

        let cityNameText = document.createElement('h3')
        cityNameText.setAttribute('class', 'noSpace')
        cityNameText.textContent = city.name;
        newCard.append(cityNameText)

        let keyText = document.createElement('h5')
        keyText.textContent = city.key;
        newCard.append(keyText)

        let cityLatText = document.createElement('p')
        cityLatText.setAttribute('class', 'noSpace')
        cityLatText.textContent = `Latitude: ${city.latitude} `;
        newCard.append(cityLatText)


        let cityLongText = document.createElement('p')
        cityLongText.setAttribute('class', 'noSpace')
        cityLongText.textContent = `Longitude: ${city.longitude}`;
        newCard.append(cityLongText)


        let cityPopText = document.createElement('p')
        cityPopText.setAttribute('class', 'noSpace')
        cityPopText.setAttribute('id', 'cityPopText')
        cityPopText.textContent = `Population: ${city.population}`;
        newCard.append(cityPopText)

        let howBigText = document.createElement('p')
        howBigText.setAttribute('class', 'noSpace')
        howBigText.setAttribute('id', 'howBigText')
        howBigText.textContent = city.howBig();
        newCard.append(howBigText)

        let sphereText = document.createElement('p')
        sphereText.setAttribute('class', 'noSpace')
        sphereText.textContent = this.whichSphere(city.name);
        newCard.append(sphereText)

        let input = document.createElement('input')
        input.setAttribute('id', 'input')
        input.setAttribute('type', 'number')

        let messageArea2 = document.createElement('p')
        messageArea2.setAttribute('id', 'messageArea2')

        let inBtn = document.createElement('button')
        inBtn.appendChild(document.createTextNode('Moved In'))
        inBtn.setAttribute('class', 'cardBtn')
        inBtn.setAttribute('id', 'movedIn')

        inBtn.addEventListener('click', () => {
            if (input.value != '') {
                city.movedIn(input.value)
                cityPopText.textContent = `Population: ${city.showPop()}`;
                howBigText.textContent = city.howBig()
                input.value = ''
                this.updateAnalyzer(); //Updates stuff when changing populations
                console.log(this.cityArray);

            } else {
                messageArea2.textContent = 'Please enter a number'
            }
        })

        let outBtn = document.createElement('button')
        outBtn.appendChild(document.createTextNode('Moved Out'))
        outBtn.setAttribute('class', 'cardBtn')
        outBtn.setAttribute('id', 'movedOut')

        outBtn.addEventListener('click', () => {
            if (input.value != '') {
                city.movedOut(input.value)
                cityPopText.textContent = `Population: ${city.showPop()}`;
                howBigText.textContent = city.howBig()
                input.value = ''
                this.updateAnalyzer(); //Updates stuff when changing populations
            } else {
                messageArea2.textContent = 'Please enter a number'
            }
        })

        let deleteBtn = document.createElement('button')
        deleteBtn.appendChild(document.createTextNode('Delete'))
        deleteBtn.setAttribute('class', 'cardBtn')

        deleteBtn.addEventListener('click', () => {
            this.deleteCity(city.key)
            deleteBtn.parentElement.remove();
        })

        newCard.appendChild(input)
        newCard.appendChild(inBtn)
        newCard.appendChild(outBtn)
        newCard.appendChild(deleteBtn)
        newCard.appendChild(messageArea2)

        this.updateAnalyzer(); //Updates stuff when adding new cities
        return newCard;
    }

    updateAnalyzer() {
        if (this.cityArray.length > 0) {
            let centerDiv = document.getElementById('data')
            let mostNorth = document.createElement('p')
            mostNorth.textContent = this.getMostNorthern();
            centerDiv.appendChild(mostNorth)

            let mostSouth = document.createElement('p')
            mostSouth.setAttribute('class', 'data')
            mostSouth.textContent = this.getMostSouthern();
            centerDiv.appendChild(mostSouth)

            let totalPop = document.createElement('p')
            totalPop.setAttribute('class', 'data')
            totalPop.textContent = this.getPopulation();
            centerDiv.appendChild(totalPop)
        }
    }

    deleteCity(key) {
        for (let i = 0; i < this.cityArray.length; i++) {
            if (key == this.cityArray[i].key) {
                this.cityArray.splice(i, 1)
            }
        }
    }


    whichSphere(name) {
        for (let i = 0; i < this.cityArray.length; i++) {
            if (name == this.cityArray[i].name) {
                if (this.cityArray[i].latitude > 0) {
                    return "Northern Hemisphere"
                }
                if (this.cityArray[i].latitude < 0) {
                    return "Southern Hemisphere"
                }
                if (this.cityArray[i].latitude == 0) {
                    return "On Equator"
                }
            }
        }
    }

    getMostNorthern() {
        let n = Math.max.apply(Math, this.cityArray.map(function(o) {
            return o.latitude;
        }));
        return `Most Northern: ${Object.values(this.cityArray.find(o => o.latitude === n))}`
    }

    getMostSouthern() {
        return `Most Southern: ${Object.values(this.cityArray.reduce(function(prev, current) {
            return (prev.latitude < current.latitude) ? prev : current
        }))}`;
    }

    getPopulation() {
        let total = 0;
        for (let i = 0; i < this.cityArray.length; i++) {
            total += Number(this.cityArray[i].population);
        }
        return `Total Population: ${total}`;
    }
}

export { City, Community };