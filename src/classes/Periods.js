class Periods {
    constructor({
        id = null,
        start = '',
        end = '',
        event = null,
        comment = null
    }) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.event = event;
        this.comment = comment;
    }
}

export default Periods;