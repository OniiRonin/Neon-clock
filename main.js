const bars = [
  ["end", "top"],
  ["side", "top", "left"],
  ["side", "top", "right"],
  ["middle"],
  ["side", "bottom", "left"],
  ["side", "bottom", "right"],
  ["end", "bottom"],
]; // Matriz que define las clases para cada segmento de los dígitos

const $main = document.querySelector("main"); // Selecciona el elemento <main>

const addDigits = (number) => {
  const initGroup = (number, padding = 2) => {
    const $group = document.createElement("div");
    $group.classList.add("group"); // Crea un div y le añade la clase 'group'

    const digits = [...`${number}`.padStart(padding, 0)].map((digit) => {
      const $digit = document.createElement("figure");
      $digit.classList.add("digit"); // Crea un elemento figure con la clase 'digit'
      $digit.setAttribute("data-digit", digit); // Establece el atributo data-digit
      bars.forEach((classes) => {
        const $span = document.createElement("span");
        $span.classList.add(...classes); // Añade las clases correspondientes a cada segmento
        $digit.append($span);
      });
      return $digit;
    });

    $group.append(...digits); // Añade los dígitos al grupo

    return {
      element: $group,
      set number(val) {
        number = val;
        [
          ...`${number}`.padStart(padding, 0).substring(`${number}`.length - 2),
        ].forEach((digit, i) => {
          digits[i].setAttribute("data-digit", digit); // Actualiza el atributo data-digit de cada dígito
        });
      },
      get number() {
        return number;
      },
    };
  };

  const $digits = document.createElement("div");
  $digits.classList.add("digits"); // Crea un div con la clase 'digits'
  const group = initGroup(number);
  const groupShadow1 = initGroup(number);
  const groupShadow2 = initGroup(number);
  groupShadow1.element.classList.add("shadow", "shadow1"); // Añade sombras a los grupos de dígitos
  groupShadow2.element.classList.add("shadow", "shadow2");
  $digits.append(group.element);
  $digits.append(groupShadow1.element);
  $digits.append(groupShadow2.element);
  $main.append($digits);

  return {
    set number(val) {
      number = val;
      group.number = val;
      groupShadow1.number = val;
      groupShadow2.number = val;
    },
    get number() {
      return number;
    },
  };
};

const addColon = () => {
  const $colonGroup = document.createElement("div");
  $colonGroup.classList.add("colon-group"); // Crea un div con la clase 'colon-group'
  const $colon = document.createElement("figure");
  $colon.append(document.createElement("span")); // Crea un figure con un span dentro
  const $colonShadow1 = document.createElement("figure");
  $colonShadow1.append(document.createElement("span"));
  const $colonShadow2 = document.createElement("figure");
  $colonShadow2.append(document.createElement("span"));
  $colon.classList.add("colon"); // Añade la clase 'colon' al figure
  $colonShadow1.classList.add("colon", "shadow", "shadow1"); // Añade sombras a los colons
  $colonShadow2.classList.add("colon", "shadow", "shadow2");
  $colonGroup.append($colon);
  $colonGroup.append($colonShadow1);
  $colonGroup.append($colonShadow2);
  $main.append($colonGroup);
};

const init = () => {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const numberHour = addDigits(hours); // Añade dígitos para las horas
  addColon(); // Añade el primer colon
  const numberMinute = addDigits(minutes); // Añade dígitos para los minutos
  addColon(); // Añade el segundo colon
  const numberSecond = addDigits(seconds); // Añade dígitos para los segundos

  const update = () => {
    now = new Date();
    let newSeconds = now.getSeconds();
    if (seconds !== newSeconds) {
      hours = now.getHours();
      minutes = now.getMinutes();
      seconds = newSeconds;
      numberHour.number = hours; // Actualiza las horas
      numberMinute.number = minutes; // Actualiza los minutos
      numberSecond.number = seconds; // Actualiza los segundos
    }

    requestAnimationFrame(update); // Llama a update en el siguiente frame de animación
  };
  update(); // Inicia la actualización del reloj
};

if (
  /^(?:(?!chrome|android)[\s\S])*(?:safari|iPad|iPhone|iPod)/i.test(
    navigator.userAgent
  )
) {
  document.body.classList.add("safari"); // Añade la clase 'safari' si el navegador es Safari
}

init(); // Inicializa el reloj
