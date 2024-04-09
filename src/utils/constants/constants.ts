export const ADMIN_ONLY = ["ti", "admin"];
export const CANDIDATE_ONLY = ["ti", "user"];
export const USERS_ONLY = ["ti", "admin", "user"];

//Mínimo 8 caracteres, pelo menos uma letra, um número e um caracter especial (@$!%*#?&)
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
