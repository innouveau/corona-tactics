import dataCases from '@/data/cases';
import Day from './Day';
import dateTools from '@/tools/date';

class Tactic {
    constructor({
        id = null,
        title = '',
        color = '',
        periods = [],
        days = [],
        visible = true,
        open = false,
        played = false
    }) {
        this.id = id;
        this.title = title;
        this.color = color;
        this.periods = periods;
        this.days = days;
        this.visible = visible;
        this.open = open;
        this.played = played;
        this.fillCases();
        //console.log(this.days.map(d => d.cases))
    }

    getPeriodByDate(date) {
        for (let period of this.periods) {
            let start, end;
            start = new Date(period.start).getTime();
            end = new Date(period.end).getTime();
            // console.log(new Date(date), new Date(period.start), new Date(period.end));
            if (date >= start && date <= end) {
                return period;
            }
        }
        return null;
    }

    getLastDay() {
        return this.days[this.days.length - 1].cases;
    }

    getRandom() {
        let range = 0.2;
        return 1 + ((Math.random() * range) - (0.5 * range));
    }

    fillCases() {
        let start, n;
        start = new Date(window.config.start).getTime();
        n = 180;
        this.days = [];

        for (let i = 0; i < (n + 1); i++) {
            let date, cases, event_id;
            date = dateTools.offsetFromMs(start, i);


            if (i >= dataCases.length || (this.id === 1 && i > 10) || (this.id === 4 && i > 30)) {
                // expectation
                let period = this.getPeriodByDate(date);
                if (period) {
                    event_id = period.event.id;
                    cases = Math.min(17000000, Math.max(0, Math.floor(this.getLastDay() * period.event.r * this.getRandom())));
                }
            } else {
                // really happend cases
                // the factor is to compensate for all missed cases
                let factor = 50;
                cases = dataCases[i] * factor;
                event_id = 1;
            }
            if (cases > 0) {
                this.days.push(
                    new Day({
                        date: date,
                        cases: cases,
                        event_id: event_id
                    })
                )
            }

        }
    }
}

export default Tactic;