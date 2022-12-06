"Use strict"

const $container = document.getElementById("container"),
      $capa = document.getElementById("capa"),
      $fragment = document.createDocumentFragment(),
      $clock = document.getElementById("clock"),
      $start = document.getElementById("start"),
      $pause = document.createElement("button"),
      $sidebar = document.getElementById("sidebar");

const selectDifficulty = () => {

    $difSelector = document.createElement("DIV"),
    $difSelectorText = document.createElement("P"),
    $diff = document.createElement("DIV"),
    $dif1 = document.createElement("BUTTON"),
    $dif2 = document.createElement("BUTTON"),
    $dif3 = document.createElement("BUTTON"),
    $dif4 = document.createElement("BUTTON");

    $difSelector.setAttribute("id", "dif-selector");

    $diff.setAttribute("id", "diff")
    
    $dif1.classList.add("dif1");
    $dif2.classList.add("dif2");
    $dif3.classList.add("dif3");
    $dif4.classList.add("dif4");

    $difSelectorText.textContent = "Nivel de dificultad:";
    $dif1.textContent = "1";
    $dif2.textContent = "2";
    $dif3.textContent = "3";
    $dif4.textContent = "4";

    $diff.appendChild($dif1);
    $diff.appendChild($dif2);
    $diff.appendChild($dif3);
    $diff.appendChild($dif4);

    $difSelector.appendChild($difSelectorText);
    $difSelector.appendChild($diff);

    $container.appendChild($difSelector);

    $difSelector.style.animation = "warning-appear 1s forwards";

    $dif1.addEventListener("click", difficulty);
    $dif2.addEventListener("click", difficulty);
    $dif3.addEventListener("click", difficulty);
    $dif4.addEventListener("click", difficulty);
};

const difficulty = e => {
    while ($container.firstChild) {
        $container.removeChild($container.firstChild);
    };

    let mins = $clock.querySelector(".mins");

    if (e.target.className === "dif1") {
        console.log(mins.classList.contains("mins"));
        mins.textContent = "02";
        createBoxs(5);
    } else if (e.target.className === "dif2") {
        mins.textContent = "05";
        createBoxs(10)
    } else if (e.target.className === "dif3") {
        mins.textContent = "08"
        createBoxs(15)
    } else if (e.target.className === "dif4") {
        mins.textContent = "12";
        createBoxs(20)
    };
};

const createBoxs = n => {

    let contador = 1;

    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            const $box = document.createElement("DIV");

            $box.classList.add("box");
            $box.classList.add(`box-${contador}`);

            contador++;

            $fragment.appendChild($box);
        }
    };
    
    $container.appendChild($fragment);

    $container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    $start.addEventListener("click", startGame);
};

const startGame = () => {

    $dif1.removeEventListener("click", difficulty);
    $dif2.removeEventListener("click", difficulty);
    $dif3.removeEventListener("click", difficulty);
    $dif4.removeEventListener("click", difficulty);

    $start.removeEventListener("click", startGame);

    pauseTimer();

    fillBoxs();
    dragAndDrop();
};

const fillBoxs = () => {

    let n = $container.children.length,
        classNumber = 0,
        y = Math.sqrt($container.children.length);

    for (let i = 0; i < (Math.floor(Math.random() * ((n/5) - (n/10))) + (n/10)); i ++){
    
        let boxNumber = Math.floor(Math.random() * (n - 1)) + 1;
    
        document.querySelector(`.box-${boxNumber}`).classList.add("box-bomb");
    };

    console.log(document.querySelectorAll(".box-bomb"));

    while (classNumber < $container.children.length) {
        $container.children[classNumber].classList.add("column1");
        classNumber += (y - 1);
        $container.children[classNumber].classList.add("column2");
        classNumber += 1;
    };

    console.log($container.children[10].getAttribute("class"));

    for (let i = 0; i < $container.children.length; i++){
        $container.children[i].addEventListener("click", e => {
            boxOnClick(e.target);
        });
    };
};

const boxOnClick = target => {
    
    if(!(target.hasChildNodes())){
        
        if(target.classList.contains("box-bomb")) {

            target.style.animation = "appear 1s forwards";
            target.style.backgroundImage = "url('Mina.jpg')";
            target.style.backgroundRepeat = "no-repeat)";
            target.style.backgroundSize = "cover";
            target.style.backgroundPosition = "center";
            target.style.boxShadow = "none";
    
            createWarning();
    
            const $warning = document.getElementById("warning");
    
            $container.style.backgroundColor = "red";
            $container.style.animation = "flash 0.2s forwards";
            $warning.style.animation = "warning-appear 3s forwards 0.5s";
            $capa.style.animation = "capa-appear 4s forwards 1s"
        
        } else{
    
            let contador = 0;
            let y = Math.sqrt($container.children.length);
            let x;
            let targetBoxNumber = target.getAttribute("class");
        
            if (targetBoxNumber.slice(8).length > 3) {
                if (targetBoxNumber.slice(8).length === 9) {
                    x = Number(targetBoxNumber.slice(8, 9));
                } else if (targetBoxNumber.slice(8).length === 10) {
                    x = Number(targetBoxNumber.slice(8, 10));
                } else if (targetBoxNumber.slice(8).length === 11) {
                    x = Number(targetBoxNumber.slice(8, 11));
                };
            } else x = Number(targetBoxNumber.slice(8));

            console.log(x);

            for (let i = 0; i < $container.children.length; i++){

                let z;
                let children = $container.children[i];
                let childrenBoxNumber = children.getAttribute("class");

                if (childrenBoxNumber.slice(8).length > 3) {
                    if ((children.classList.contains("column1")) && 
                        (!(children.classList.contains("flagged"))) && 
                        (!(children.classList.contains("box-bomb")))) {
                        if (childrenBoxNumber.slice(8).length === 9) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 10) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 11) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        }
                    } else if ((children.classList.contains("column2")) && 
                               (!(children.classList.contains("flagged"))) && 
                               (!(children.classList.contains("box-bomb")))) {
                        if (childrenBoxNumber.slice(8).length === 9) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 10) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 11) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        }
                    } else if ((children.classList.contains("flagged")) && 
                               (!(children.classList.contains("column1"))) && 
                               (!(children.classList.contains("column2"))) &&
                               (!(children.classList.contains("box-bomb")))) {
                        if (childrenBoxNumber.slice(8).length === 9) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 10) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 11) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        }
                    } else if ((children.classList.contains("box-bomb")) && 
                               (!(children.classList.contains("column1"))) &&
                               (!(children.classList.contains("column2"))) &&
                               (!(children.classList.contains("flagged")))) {
                        if (childrenBoxNumber.slice(8).length === 10) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 11) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 12) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        }
                    } else if (((children.classList.contains("column1")) &&
                                (children.classList.contains("flagged"))) && 
                               (!(children.classList.contains("column2"))) && 
                               (!(children.classList.contains("box-bomb")))) {
                        if (childrenBoxNumber.slice(8).length === 17) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 18) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 19) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        }
                    } else if (((children.classList.contains("column2")) &&
                                (children.classList.contains("flagged"))) && 
                               (!(children.classList.contains("column1"))) && 
                               (!(children.classList.contains("box-bomb")))) {
                        if (childrenBoxNumber.slice(8).length === 17) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 18) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 19) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        }
                    } else if (((children.classList.contains("column1")) &&
                                (children.classList.contains("box-bomb"))) && 
                               (!(children.classList.contains("column2"))) && 
                               (!(children.classList.contains("flagged")))) {
                        if (childrenBoxNumber.slice(8).length === 18) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 19) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 20) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        }
                    } else if (((children.classList.contains("column2")) && 
                                (children.classList.contains("box-bomb"))) && 
                               (!(children.classList.contains("column1"))) && 
                               (!(children.classList.contains("flagged")))) {
                        if (childrenBoxNumber.slice(8).length === 18) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 19) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 20) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        }
                    } else if (((children.classList.contains("flagged")) &&
                                (children.classList.contains("box-bomb"))) && 
                               (!(children.classList.contains("column1"))) && 
                               (!(children.classList.contains("column2")))) {
                        if (childrenBoxNumber.slice(8).length === 18) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 19) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                            console.log(z);
                        } else if (childrenBoxNumber.slice(8).length === 20) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        }
                    } else if (((children.classList.contains("column1")) &&
                                (children.classList.contains("flagged")) &&
                                (children.classList.contains("box-bomb"))) && 
                               (!(children.classList.contains("column2")))) {
                        if (childrenBoxNumber.slice(8).length === 26) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 27) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 28) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        };
                    } else if (((children.classList.contains("column2")) &&
                                (children.classList.contains("flagged")) &&
                                (children.classList.contains("box-bomb"))) && 
                               (!(children.classList.contains("column1")))) {
                        if (childrenBoxNumber.slice(8).length === 26) {
                            z = Number(childrenBoxNumber.slice(8, 9));
                        } else if (childrenBoxNumber.slice(8).length === 27) {
                            z = Number(childrenBoxNumber.slice(8, 10));
                        } else if (childrenBoxNumber.slice(8).length === 28) {
                            z = Number(childrenBoxNumber.slice(8, 11));
                        };
                    };
                } else z = Number(childrenBoxNumber.slice(8));

                if(((z === (x - y - 1)) &&
                    (!(target.classList.contains("column1")))) ||
                   (z === (x - y)) ||
                   ((z === (x - y + 1)) &&
                    (!(target.classList.contains("column2"))) &&
                    (z !== 1)) ||
                   ((z === (x - 1)) &&
                    (!(target.classList.contains("column1")))) ||
                   ((z === (x + 1)) &&
                    (!(target.classList.contains("column2")))) ||
                   ((z === (x + y - 1)) &&
                    (!(target.classList.contains("column1")))) ||
                   (z === (x + y)) ||
                   ((z === (x + y + 1)) &&
                    (!(target.classList.contains("column2"))))
                ){
                    console.log(z);
                    if($container.children[i].classList.contains("box-bomb")){
                        contador++;
                    };
                } else continue;
            };
    
            if (contador === 0) {
                target.style.boxShadow = "none";
            } else {
                target.style.boxShadow = "none";
                const $span = document.createElement("SPAN");
                $span.textContent = contador.toString();
                target.appendChild($span);
            }            
        };
    } else console.log(target.getAttribute("class"));
};

const dragAndDrop = () => {
    const children = $container.children;
    
    for (let i = 0; i < children.length; i++) {
        children[i].addEventListener("dragover", e => e.preventDefault());
        children[i].addEventListener("drop", e => {
            if (!(children[i].getAttribute("style") === "box-shadow: none;") &&
                !(children[i].hasChildNodes())) {
                let data = e.dataTransfer.getData("text");
                const newFlag = document.createElement("IMG");
                newFlag.setAttribute("draggable", false);
                newFlag.setAttribute("src", `${data}`);
                newFlag.style.width = "50%";
                e.target.appendChild(newFlag);
                if (e.target.classList.contains("box-bomb")) {
                    e.target.classList.add("flagged");
                    console.log(e.target.getAttribute("class"));
                };
                toWin();
            };
        });
    };
};

const clock = (mins, segs) => {

    let seg = segs || 59;
    let min = mins || Number($clock.querySelector(".mins").textContent) - 1;

    setTimeout(() => {
        $clock.querySelector(".mins").textContent = `0${min}`;
    }, 1000);

    let makeTimeRun = setInterval(() => {
        if (seg >= 0) {
            if (seg < 10) {
                $clock.querySelector(".segs").textContent = `0${seg}`;
            } else $clock.querySelector(".segs").textContent = seg;
            seg--;
        } else {
            if(min > 0){
                min--;
                seg = 59;
                $clock.querySelector(".mins").textContent = `0${min}`;
                $clock.querySelector(".segs").textContent = seg;
            } else {
                createWarning();

                const $warning = document.getElementById("warning");

                $warning.style.animation = "warning-appear 3s forwards 0.5s";
            };
        };
    }, 1000);

    return makeTimeRun;

};

const pauseTimer = () => {
    $start.style.display = "none";
    $pause.setAttribute("id", "pause");
    $pause.innerHTML = "Pause";
    $sidebar.appendChild($pause);
    
    let makeTimeRun = clock();

    let min;
    let seg;

    $start.addEventListener("click", () => {
        $start.style.display = "none";
        $pause.style.display = "inline-block";
        makeTimeRun = clock(min, seg);
    });

    $pause.addEventListener("click", () => {

        min = $clock.querySelector(".mins").textContent.slice(1);
        if (Number($clock.querySelector(".segs").textContent) < 10) {
            seg = $clock.querySelector(".segs").textContent.slice(1);
        } else {
            seg = $clock.querySelector(".segs").textContent;
        }

        clearInterval(makeTimeRun);
        $pause.style.display = "none";
        $start.style.display = "inline-block";
    });
};

const toWin = () => {
    const bombs = $container.querySelectorAll(".box-bomb"),
          flaggeds = $container.querySelectorAll(".flagged");

    if (bombs.length === flaggeds.length){
        createWinAlert();
        const $winAlert = document.getElementById("win-alert");
        $winAlert.style.animation = "warning-appear 3s forwards 0.5s";
    }
};

const createWarning = () => {
    $warning = document.createElement("DIV"),
    $warningText = document.createElement("P"),
    $warningBtn = document.createElement("BUTTON");

    $warningBtn.classList.add("reload");

    $warning.setAttribute("id", "warning");

    $warningText.textContent = "¡Ha perdido la partida!";
    $warningBtn.textContent = "Volver a jugar";

    $warning.appendChild($warningText);
    $warning.appendChild($warningBtn);

    $container.appendChild($warning);

    $warningBtn.addEventListener("click", () => reload());
};

const createWinAlert = () => {
    $winAlert = document.createElement("DIV"),
    $winAlertText = document.createElement("P"),
    $winAlertBtn = document.createElement("BUTTON");

    $winAlertBtn.classList.add("reload");

    $winAlert.setAttribute("id", "win-alert");

    $winAlertText.textContent = "¡Ha ganado la partida!";
    $winAlertBtn.textContent = "Volver a jugar";

    $winAlert.appendChild($winAlertText);
    $winAlert.appendChild($winAlertBtn);

    $container.appendChild($winAlert);

    $winAlertBtn.addEventListener("click", () => reload());
};

const reload = () => {
    document.body.style.animation = "reload 2s forwards"
    setTimeout(() => {
        location.reload();
    }, 2000);
};

selectDifficulty();