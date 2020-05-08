class Day {
    constructor({
        date = null,
        cases = 0,
        event_id = null
    }) {
        this.date = date;
        this.cases = cases;
        this.event_id = event_id;
    }
}

export default Day;