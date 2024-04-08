const regexValue = /^(?=.{1,500}$).+/
const regexDecimal = /^[0-9]+([,][0-9]+)?$/


// regexValue: permite maximo 500 caracteres y minimo 1
// regexDecimal: solo acepta un numero junto con . decimal


function validation(data) {
    const errors = {}
    if (!regexValue.test(data.name)) errors.name = 'No dejes el campo vacio y no repitas nombres'
    if (!regexDecimal.test(data.price)) errors.price = 'Precio invalido'
    if (!regexValue.test(data.description)) errors.description = 'Debe tener un valor de maximo 500 caracteres'
    return errors
}



export default validation