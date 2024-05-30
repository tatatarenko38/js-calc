class Calc {
  static #value = ''
  static #NAME = 'calc'
  static #isDot = false

  //кладе в value цифру
  static add = (newValue) => {
    //якщо перед 0 є число(isNaN), то нолі поставляться(це буде третя цифра)
    if (isNaN(this.#value[this.#value.length - 2])) {
      //щоб ціле число не могло починатися з ноля
      if (
        Number(this.#value[this.#value.length - 1]) === 0 &&
        this.#isDot == false
      ) {
        return null
      }
    }
    console.log(this.#value)
    this.#value = this.#value.concat(newValue)
    this.#output()
  }

  //виводе на дісплей калькулятора
  static #output = () => {
    this.#save()
    window.output.innerHTML = this.#value
  }

  //кнопка крапка
  static dot = () => {
    // поки ми не поставимо якийсь символ, то не сможемо
    //поставити ще одну крапку - тобто в одному числі
    //не може бути дві крапки
    // #isDot вказали по замовчуванню  null вище,
    //тут робимо перевірку - нижче вказуємо true
    // а в методы ор повертаємо на true
    if (this.#isDot) {
      return null
    }
    // щоб не можна було поставити дві крапки підряд
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }
    // поки ми не поставимо якийсь символ, то не сможемо
    //поставити ще одну крапку - тобто в одному числі
    //не може бути дві крапки
    this.#value = this.#value.concat('.')
    this.#output()
    this.#isDot = true
  }

  //додавання знаків - + * =
  static op = (opValue) => {
    //перевіряє чи остання літера(звертаємось до рядка як
    // до масиву ) число - якщо ні то далі код не виконується -
    //тобто щоб поставити знак - перед ним має бути число
    //(два знаки підряд - не поставляться)
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat(opValue)
    this.#output()
    this.#isDot = false
  }

  // для кнопки C
  static reset = () => {
    this.#value = ''
    //теж треба очищувати
    this.#isDot = false
    this.#output()
  }

  //для =
  static result = () => {
    this.#value = String(eval(this.#value))
    this.#output()
  }

  //збереження поточного значення калькулятора
  //в локальне сховище
  static #save = () => {
    window.localStorage.setItem(this.#NAME, this.#value)
  }
  //буде підгружати поточне значення
  // або давати пустий рядок
  static #load = () => {
    this.#value =
      window.localStorage.getItem(this.#NAME) || ''
  }

  //технічний метод для ініціалізації(до  #load() не можемо звернутись)
  static init = () => {
    this.#load()
    //this.#output()
    console.log('Calc is init')
  }
}
Calc.init()
window.calc = Calc
