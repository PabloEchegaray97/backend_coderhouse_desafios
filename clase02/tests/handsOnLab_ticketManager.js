class TicketManager {
    #precioBaseDeGanancia;
    constructor() {
        this.events = [];
        this.#precioBaseDeGanancia = 1.15;
    }
    getEvents = () => {
        return this.events;
    }
    getNextID = () => {
        const count=this.events.length;
        const nextID = (count > 0) ? this.events[count-1].id + 1 : 1 //count-1 es el ultimo elemento del arreglo, tomamos su id y le sumamos 1, caso contrario si count = 0 id va a ser = a 1
        return nextID;
    }
    addEvent = (name, place, price, capacity, date = new Date().toLocaleDateString()) => {
        const event = {
            id:this.getNextID(),
            name,
            place,
            price: price* this.#precioBaseDeGanancia,
            capacity: capacity ?? 50,
            date: date ?? new Date().toLocaleDateString(),
            attendants: []
        }
        this.events.push(event)
    }
}

const manager = new TicketManager();
manager.addEvent('Lolapallooza', 'BA', 10000, null, null);
manager.addEvent('Hallabalooza', 'Mendoza', 500, 2000, null);
manager.addEvent('Chapafest', 'Chapanay city', 2000,5000, null);


console.log(manager.getEvents());