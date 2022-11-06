const required = (v: string) => !!v || "Required";

const email = (value: string) => {
    const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !value || pattern.test(value) || "Invalid Email-Address";
};

const password = (v: string) => v.length >= 8 || "Must be at least 8 characters long";



export {
    required,
    email,
    password
}