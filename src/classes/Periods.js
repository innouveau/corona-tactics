class Periods {
    constructor({
        start = '',
        end = '',
        event = null,
        comment = null
    }) {
        this.start = start;
        this.end = end;
        this.event = event;
        this.comment = comment;
    }
}

export default Periods;