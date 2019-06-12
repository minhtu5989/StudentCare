import * as Common from '@constants/Common.js'

const validateEmail = (email)=> {
    let errorMessage = ""
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        errorMessage += 'Invalid email address\n'
    }
    return errorMessage
}

const validatePhone = (phoneNumber)=> {
    let errorMessage = "";
    if (!Common.MOBILE_NUMBER_REGEX.test(phoneNumber)) {
        errorMessage += Common.ERROR_INVALID_MOBILE_NUMBER
    }
    return errorMessage
}

export {
    validateEmail,
    validatePhone
}