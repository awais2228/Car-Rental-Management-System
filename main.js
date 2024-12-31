// Base class for all users
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  login(inputUsername, inputPassword) {
    return this.username === inputUsername && this.password === inputPassword;
  }
}

// Admin class extending User
class Admin extends User {
  constructor(username, password) {
    super(username, password);
  }

  addCar(car) {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars.push(car);
    localStorage.setItem("cars", JSON.stringify(cars));
    console.log("Car added:", car);
  }

  removeCar(company, model, year) {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars = cars.filter(
      (car) =>
        car.company !== company || car.model !== model || car.year !== year
    );
    localStorage.setItem("cars", JSON.stringify(cars));
    console.log(`Car removed: ${company} ${model} (${year})`);
  }

  viewCars() {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars.forEach((car) => {
      console.log(car);
    });
  }
}

// Regular User class extending User
class RegularUser extends User {
  constructor(username, password) {
    super(username, password);
    this.rentedCars = [];
  }

  viewAvailableCars() {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    return cars.filter((car) => car.available);
  }

  rentCar(carId, days) {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    const car = cars.find((c) => c.id === carId && c.available);

    if (car) {
      car.available = false;
      car.rentedBy = this.username;
      car.rentDays = days;
      this.rentedCars.push(car);

      localStorage.setItem("cars", JSON.stringify(cars));
      console.log(`${car.model} rented for ${days} days.`);
    } else {
      console.log("Car not available for rent.");
    }
  }

  returnCar(company, model, year) {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    const car = cars.find(
      (c) =>
        c.company === company &&
        c.model === model &&
        c.year === year &&
        c.rentedBy === this.username
    );

    if (car) {
      car.available = true;
      car.rentedBy = null;
      car.rentDays = 0;

      this.rentedCars = this.rentedCars.filter(
        (c) => c.company !== company || c.model !== model || c.year !== year
      );

      localStorage.setItem("cars", JSON.stringify(cars));
      console.log(`${car.model} has been returned.`);
    } else {
      console.log("No such rented car found.");
    }
  }

  viewRentedCars() {
    console.log("Rented Cars:", this.rentedCars);
  }
}

// Car class
class Car {
  constructor(id, company, model, year, rentPerDay) {
    this.id = id;
    this.company = company;
    this.model = model;
    this.year = year;
    this.rentPerDay = rentPerDay;
    this.available = true;
    this.rentedBy = null;
    this.rentDays = 0;
  }

  getDetails() {
    return `${this.company} ${this.model} (${this.year}) - $${
      this.rentPerDay
    }/day - ${this.available ? "Available" : `Rented by ${this.rentedBy}`}`;
  }
}
