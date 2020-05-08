class Event {
    constructor({
        id = null,
        title = '',
        description = '',
        r = 0,
        icon = ''
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.r = r;
        this.icon = icon;
    }
}

export default Event;