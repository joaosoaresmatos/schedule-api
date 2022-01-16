let contactEmail = 'joao@email.com';
let resourceId = 1;
let scheduleIntervalSelected = {
    input: '08:50 às 10:30',
    value: 'Interval',
    tracking: 'Interval',
    inputMatch: '08:50 às 10:30',
    inputMatchClean: '0850 as 1030',
    chosenOptionNumber: 1
};
let dateSelected = {
    input: '20/02/2022',
    value: 'date',
    tracking: 'Date',
    inputMatch: '20/02/2022',
    inputMatchClean: '20022022',
    chosenOptionNumber: 1
};

console.log(
    run(
        contactEmail,
        resourceId,
        JSON.stringify(scheduleIntervalSelected),
        JSON.stringify(dateSelected)
    )
);
function run(contactEmail, resourceId, scheduleIntervalSelected, dateSelected) {
    scheduleIntervalSelected = JSON.parse(scheduleIntervalSelected);
    dateSelected = JSON.parse(dateSelected);
    const dateSplitted = dateSelected.inputMatch.split('/');
    const year = parseInt(dateSplitted[2]);
    const month = parseInt(dateSplitted[1] - 1);
    const day = parseInt(dateSplitted[0]);
    const date = new Date(year, month, day);

    let interval = scheduleIntervalSelected.inputMatch; // 10:00 as 11:00
    let start = new Date(date);
    let end = new Date(date);
    // start.setDate(19);
    // end.setDate(19);
    // start.setMonth(2);
    // end.setMonth(2);
    // start.setMonth(2);
    // end.setMonth(2);
    let intervalSplitted = [];
    const numberRegex = RegExp(/\d{1,2}/gm);

    let match;

    while ((match = numberRegex.exec(interval)) !== null) {
        intervalSplitted.push(match[0]);
    }

    start.setUTCHours(intervalSplitted[0]);
    start.setUTCMinutes(intervalSplitted[1]);
    end.setUTCHours(intervalSplitted[2]);
    end.setUTCMinutes(intervalSplitted[3]);

    return {
        resourceId: resourceId,
        userEmail: contactEmail,
        start: start,
        end: end
    };
}
