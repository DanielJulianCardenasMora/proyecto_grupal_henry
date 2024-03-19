const regexValue = /^(?=.{1,500}$).+/
const regexDecimal = /^\d*\.\d+$/









function validation(data) {
    const errors = {}
    if (!regexValue.test(data.name)) errors.name = 'No puedes repetir nombres'
    if (!regexDecimal.test(data.price)) errors.price = 'Numero incluyendo decimal'
    if (!regexValue.test(data.description)) errors.description = 'Debe tener un valor de maximo 500 caracteres'
    return errors
}



export default validation