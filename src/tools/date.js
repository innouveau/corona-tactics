const months = ["januari","februari","maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
const msPerDay = 24 * 3600 * 1000;

const formatFromString = function(dateString) {
    let chunks, month;
    chunks = dateString.split('-');
    month = months[Number(chunks[1]) - 1];
    return chunks[2] + ' ' + month + ' ' + chunks[0];
};

const formatFromStringFromMs = function(d) {
    let date, day, month, year;
    date = new Date(d);
    month = getMonthName(date.getMonth());
    day = date.getDate();
    year = date.getFullYear();
    return day + ' ' + month + ' ' + year;
};

const offsetFromMs = function(ms, days) {
    return ms + (msPerDay * days);
};

const getMonthName = function(month) {
    return months[month];
};

const getOffsetByDateString = function(dateString) {
    let ms, startMs, diff;
    startMs = new Date(window.config.start);
    ms = new Date(dateString).getTime();
    diff = ms - startMs;
    return Math.round(diff / msPerDay);
};

export default {
    formatFromString,
    formatFromStringFromMs,
    offsetFromMs,
    getMonthName,
    getOffsetByDateString
}