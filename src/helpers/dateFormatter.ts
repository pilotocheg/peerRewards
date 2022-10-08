const minute = 60 * 1000;
const hour = minute * 60;
const day = hour * 24;

const getPlural = (amount: number) => (amount > 1 ? 's' : '');

export const getDateString = (date: Date) => {
  const diff = Date.now() - date.getTime();

  if (diff < minute) {
    return 'Less than a minute ago';
  }
  if (diff < hour) {
    const mins = Math.floor(diff / minute);
    return `${mins} min${getPlural(mins)} ago`;
  }
  if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${getPlural(hours)} ago`;
  }
  if (diff <= day * 3) {
    const days = Math.floor(diff / day);
    return `${days} day${getPlural(days)} ago`;
  }
  return date.toDateString();
};
