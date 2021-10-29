export default class Account {
  constructor(userName, password, role) {
    this.userName = userName;
    this.password = password;
    this.roles = new Array(role);
  }
}
