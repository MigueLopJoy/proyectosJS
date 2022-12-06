const d = document,
      $wrapper = d.querySelector(".wrapper"),
      $countriesList = d.querySelector(".countries-list"),
      $clicker = d.querySelector(".clicker"),
      $input = d.querySelector(".search-input input")
      $selectedCountry = d.querySelector(".display-menu-btn p");

const countries = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];

let filteredList = countries,
    selected = 0;

const createCountriesList = (arr) => {
    let $li = "";
    arr.forEach(country => {
        $li += `<li>${country}</li>`;
    });
    $countriesList.innerHTML = $li;
};
createCountriesList(countries);

const filterList = () => {
    filteredList = countries.filter(country => {
        return country.toLowerCase().startsWith(($input.value).toLowerCase());
    });
    createCountriesList(filteredList);
};

filteredList.forEach(country => {
    d.addEventListener("click", e => {
        if (country === e.target.textContent) {
            $input.value = country;
            filterList();
        };
    })

    d.addEventListener("keyup", e => {
        if ($countriesList.querySelector(".selected") && e.key === "Enter") {
            if (country === $countriesList.querySelector(".selected").textContent) {
                $input.value = country;
                filterList();
            };
        }
    });
});

d.addEventListener("click", e => {
    if (e.target === $clicker) {
        $wrapper.classList.toggle("active");
        $input.focus();
        selected = 0;
        $input.value = "";
        filteredList = countries;
        createCountriesList(filteredList);
    };
});

d.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        if (filteredList.indexOf($input.value) >= 0) {
            $wrapper.classList.toggle("active");
            $selectedCountry.textContent = $input.value;
            selected = 0;
            $input.value = "";
            filteredList = countries;
            createCountriesList(filteredList);
        }
    } else if (e.key === "ArrowDown" && d.activeElement === $input) {
        if ($countriesList.querySelector(".selected")) {
            let $selectedCountry = $countriesList.querySelector(".selected");
            console.log($selectedCountry.offsetTop+86);
            if (($selectedCountry.offsetTop + 86) > 240) {
                let toScroll = $selectedCountry.offsetTop + 86 - 240;
                $countriesList.parentElement.scroll(0, toScroll);
            };
            $countriesList.querySelector(".selected").classList.remove("selected");
        };
        $countriesList.children[selected].classList.add("selected");
        selected++;
    } else if (e.key === "ArrowUp" && d.activeElement === $input) {
        console.log($countriesList.offsetTop);
        if (selected > 1) {
            if ($countriesList.querySelector(".selected")) {
                let $selectedCountry = $countriesList.querySelector(".selected");
                if (($selectedCountry.offsetTop + 86) > 240) {
                    let toScroll = $selectedCountry.offsetTop - 240;
                    $countriesList.parentElement.scroll(0, toScroll);
                };
                $countriesList.querySelector(".selected").classList.remove("selected");
            };     
            selected--;
            $countriesList.children[selected - 1].classList.add("selected");
        };
    } else {
        filterList();
    };
});
