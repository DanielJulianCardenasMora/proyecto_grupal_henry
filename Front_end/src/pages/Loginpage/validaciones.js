import React from "react";

export const validateEmail = (params) => {
    const {email} = params
    console.log('Email validate: ' + email)

}

export const validatePassword = (params) => {
    const {password} = params
    console.log('Password validate: ' + password)
}

export const Register = (params) => {
  const { email, password, name } = params;

  console.log(`REGISTER:
    Email: ${email},
    Password: ${password},
    Name: ${name}`);

    
}