const moment = require('moment');

const START_WORKDAY = 9;
const END_WORKDAY = 17;

function avaialableSlots(eventsList) {
  const results = [];
  const today = moment().startOf('day');

  // check available slots for next 7 days
  for (let i = 1; i <= 7; i++) {
    for (let j = START_WORKDAY; j < END_WORKDAY; j++) {
      const start = today.clone().add({days: i, hours: j});
      const end = start.clone().add(1, 'hour');
      if (allUnbooked(eventsList, start, end)) results.push(start.toISOString());
    }
  }
  return results;
}

// helpers
function allUnbooked(eventsList, start, end) {
  for (const events of eventsList) {
    if (!isAvailable(events, start, end)) return false;
  }
  return true;
}

function isAvailable(events, start, end) {
  for (const event of events) {
    const eventStart = moment(event.start);
    const eventEnd = moment(event.end);

    if (eventEnd > start && eventStart < end) return false;
  }
  return true;
}

module.exports = avaialableSlots;
