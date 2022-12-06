const $screen = document.querySelector(".screen"),
      $reset = document.querySelector(".reset"),
      $result = document.querySelector(".result"),
      $buttons = document.querySelectorAll("input[type='button']");

const printOperation = () => {
    for (let i = 0; i < $buttons.length; i++) {
        $buttons[i].addEventListener("click", e => {
            if (e.target.value !== "=" &&
                e.target.value !== "C") {
                $screen.value += e.target.value;
            };
        });
    }
    reset();
    calculate();
};

const reset = () => {
    $reset.addEventListener("click", () => {
        $screen.value = "";
    });
};

const calculate = () => {
    $result.addEventListener("click", () => {
        if (isNaN(eval($screen.value))) {
            $screen.value = "Operación no válida";
            setTimeout(() => {
                $screen.value = "";
            }, 2000);
        } else {
            $screen.value = eval($screen.value);
        };
    });
};

printOperation();
