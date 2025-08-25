class Technician {
  private _name: string;
  private _averageRepairTime: number; // 1 minute ~ 1 second
  // you can add your own attribute

  constructor(name: string, averageRepairTime: number) {
    this._name = name;
    this._averageRepairTime = averageRepairTime;
  }

  public set name(name: string)  {
    this._name = name;
  }

  public get name() {
    return this._name;
  }

  public set averageRepairTime(averageRepairTime: number) {
    this._averageRepairTime = averageRepairTime;
  }

  public get averageRepairTime() {
    return this._averageRepairTime;
  }

  public async repairing(customer: Customer) {
    // add logic to simulate technician repairing process

    // you can use:
    return new Promise<Customer>((resolve) => {
      setTimeout(() => {
        resolve(customer);
      }, this._averageRepairTime * 1000)
    });

    // or your own logic
  }

  // you can add your own method here

}

class Customer {
  private _name: string;
  private _phoneSeries: string;
  // you can add your own attribute

  constructor(name: string, phoneSeries: string) {
    this._name = name;
    this._phoneSeries = phoneSeries;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get name(){
    return this._name;
  }

  public set phoneSeries(phoneSeries: string) {
    this._phoneSeries = phoneSeries;
  }

  public get phoneSeries(){
    return this._phoneSeries;
  }

  // you can add your own method here
}

class ServiceCenter {
  private _name: string;
  private _address: string;
  private _technicians: Technician[];
  private _customers: Customer[];
  private _history: { Customer: string; Phone: string; Technician: string }[];
  // you can add your own attribute

  constructor(name: string, address: string, technicians: Technician[], customers: Customer[]) {
    this._name = name;
    this._address = address;
    this._technicians = technicians;
    this._customers = customers;
    this._history = [];
  }

  public get name() {
    return this._name;
  }

  public async startOperating(){
    return new Promise((resolve) => {
      const processQueue = (customers, technicians) => {
        if (customers.length === 0 && this._history.length === this._customers.length) {
          console.log("\nService Center Log for today:!\n");
          console.table(this._history);
          resolve(true);
          return;
        }

        technicians.forEach(async (technician) => {
          if (customers.length === 0) return; // no more customers

          const customer = customers.shift(); // next customer
          if (!customer) return;

          console.log(`>> Technician ${technician.name} is repairing ${customer.name}'s ${customer.phoneSeries}. <<`);

          await technician.repairing(customer);

          console.log(`REPAIRING DONE: ${technician.name} FIXED ${customer.name}'s ${customer.phoneSeries}.`);
          console.log(`    ${technician.name} available, call another customer!`);

          this._history.push({
            Customer: customer.name,
            Phone: customer.phoneSeries,
            Technician: technician.name
          });

          // recursively continue with next customer
          processQueue(customers, [technician]);
        });
      };

      // Start processing with both technicians
      processQueue([...this._customers], this._technicians);
    });
  }

  // you can add your own method here
}

// ====================================================================================
// MAIN
// ====================================================================================

// Define Technician
const dalton = new Technician('Dalton', 10); // 10 seconds
const wapol = new Technician('Wapol', 20); // 20 seconds
const technicians = [dalton, wapol];
const phoneSeries = ['iPhone 14', 'iPhone 14 Pro', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 12', 'iPhone 12 Pro'];

// Define Customer
// Generate 10 customers
const customers = new Array(10).fill(null).map((_ ,index) => {
  const customer = new Customer(`Customer ${index}`, phoneSeries[Math.floor(Math.random() * phoneSeries.length)]);
  return customer;
});

// Define Service Center
const serviceCenter: ServiceCenter = new ServiceCenter('First Service Center', 'Long Ring Long Land Street', technicians, customers);
console.log('Customer on queue: ');
console.table(customers);
console.log('\n');

// Begin Operating
console.log(`${serviceCenter.name} start operating today: `);
serviceCenter.startOperating().catch(err => console.log(err));
