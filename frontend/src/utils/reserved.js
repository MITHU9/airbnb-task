export const getDisabledDates = (reservations) => {
  const dates = [];
  reservations.forEach((res) => {
    const start = new Date(res.checkIn);
    const end = new Date(res.checkOut);
    const current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  });
  return dates;
};
