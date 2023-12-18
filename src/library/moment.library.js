import moment from "moment"

class LibMoment {
    constructor(options) {}

    convert(date, format) {
        return moment(date).format(format)
    }

    currentDate() {
        return moment().toDate()
    }

    getMoment(date) {
        return moment(date)
    }
}

export default new LibMoment()
