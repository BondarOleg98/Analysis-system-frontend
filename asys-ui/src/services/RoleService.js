export default class RoleService {
  async getRoles() {
    const res = await fetch("models/roles.json");
    const d = await res.json();
    return d.data;
  }
}
