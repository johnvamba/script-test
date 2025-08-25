var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Technician {
    // you can add your own attribute
    constructor(name, averageRepairTime) {
        this._name = name;
        this._averageRepairTime = averageRepairTime;
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set averageRepairTime(averageRepairTime) {
        this._averageRepairTime = averageRepairTime;
    }
    get averageRepairTime() {
        return this._averageRepairTime;
    }
    repairing(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            // add logic to simulate technician repairing process
            // you can use:
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(customer);
                }, this._averageRepairTime * 1000);
            });
            // or your own logic
        });
    }
}
class Customer {
    // you can add your own attribute
    constructor(name, phoneSeries) {
        this._name = name;
        this._phoneSeries = phoneSeries;
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set phoneSeries(phoneSeries) {
        this._phoneSeries = phoneSeries;
    }
    get phoneSeries() {
        return this._phoneSeries;
    }
}
class ServiceCenter {
    // you can add your own attribute
    constructor(name, address, technicians, customers) {
        this._name = name;
        this._address = address;
        this._technicians = technicians;
        this._customers = customers;
        this._history = [];
    }
    get name() {
        return this._name;
    }
    startOperating() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const processQueue = (customers, technicians) => {
                    if (customers.length === 0 && this._history.length === this._customers.length) {
                        console.log("\nAll repairs are done for today!\n");
                        console.table(this._history);
                        resolve(true);
                        return;
                    }
                    technicians.forEach((technician) => __awaiter(this, void 0, void 0, function* () {
                        if (customers.length === 0)
                            return; // no more customers
                        const customer = customers.shift(); // next customer
                        if (!customer)
                            return;
                        console.log(`>>Technician ${technician.name} is repairing ${customer.name}'s ${customer.phoneSeries}. <<`);
                        yield technician.repairing(customer);
                        console.log(`REPAIRING DONE: ${technician.name} FIXED ${customer.name}'s ${customer.phoneSeries}.`);
                        console.log(`${technician.name} available, call another customer!`);
                        this._history.push({
                            Technician: technician.name,
                            Customer: customer.name,
                            Phone: customer.phoneSeries
                        });
                        // recursively continue with next customer
                        processQueue(customers, [technician]);
                    }));
                };
                // Start processing with both technicians
                processQueue([...this._customers], this._technicians);
            });
        });
    }
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
const customers = new Array(10).fill(null).map((_, index) => {
    const customer = new Customer(`Customer ${index}`, phoneSeries[Math.floor(Math.random() * phoneSeries.length)]);
    return customer;
});
// Define Service Center
const serviceCenter = new ServiceCenter('First Service Center', 'Long Ring Long Land Street', technicians, customers);
console.log('Customer on queue: ');
console.table(customers);
console.log('\n');
// Begin Operating
console.log(`${serviceCenter.name} start operating today: `);
serviceCenter.startOperating().catch(err => console.log(err));
