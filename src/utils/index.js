import { transform, isEqual, isObject, isArray } from 'lodash';
import moment from 'moment';

export const getObjectDiff = (newObj, oldObj) => {
  let arrayIndexCounter = 0;
  return transform(newObj, (result, value, key) => {
    if (!isEqual(value, oldObj[key])) {
      const resultKey = isArray(oldObj) ? arrayIndexCounter++ : key;
      result[resultKey] =
        isObject(value) && isObject(oldObj[key])
          ? getObjectDiff(value, oldObj[key])
          : value;
    }
  });
};

export const buildDate = (day, month, year) => {
  let date = moment()
    .month(month - 1)
    .year(year);
  if (day) {
    date = date.date(day);
    return date.format('DD/MM/YYYY');
  }
  return date.format('MM/YYYY');
};
