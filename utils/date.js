
const dateGetter = () => {
    const today = new Date();

    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
};

const getStartDate = (month) => {
    const today = new Date();

    return `${month}/1/${today.getFullYear()}`
};

const getEndDate = (month) => {
    const today = new Date();

    return `${month}/31/${today.getFullYear()}`
};

const startDate = () => {
    const today = new Date();

    return `${today.getMonth() + 1}/1/${today.getFullYear()}`
    // return `${today.getFullYear()}-${today.getMonth()}-01`
};

const endDate = () => {
    const today = new Date();

    return `${today.getMonth() + 1}/31/${today.getFullYear()}`
    // return `${today.getFullYear()}-${today.getMonth()}-31`
}

module.exports = { dateGetter, getStartDate, getEndDate, startDate, endDate };



console.log(endDate());