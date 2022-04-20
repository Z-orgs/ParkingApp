class Vehicle {
  constructor(license, type, id) {
    this.id = id;
    this.license = license;
    this.type = type;
  }
  // toString() {
  //   return (
  //     "insert into vehicle(license, type, id) values(" +
  //     '"' +
  //     this.license +
  //     '", ' +
  //     '"' +
  //     this.type +
  //     '", ' +
  //     this.id +
  //     ")"
  //   );
  // }
}
export default Vehicle;
