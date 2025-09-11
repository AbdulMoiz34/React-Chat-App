const EmailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
const usernameRegex = /^[a-z][a-z0-9_]{2,15}$/;

const passwordPattern = {
    value: passwordRegex,
    message: "At least 8 chars, 1 lowercase & 1 number & 1 uppercase."
};

const emailPattern = {
    value: EmailRegex,
    message: "Invalid email address."
};

const usernamePattern = {
    value: usernameRegex,
    message: '3-16 chars; start with a letter; small letters/digits/_ only.'
};

export { passwordPattern, emailPattern, usernamePattern };