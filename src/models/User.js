import {bool} from 'yup';

class User {
  constructor(email, password, phone, name, gender) {
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.name = name;
    this.gender = Boolean(gender);
  }
}

export default User;
