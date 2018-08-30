import { oneOfType, func, object, number, arrayOf } from 'prop-types';

export const refType = oneOfType([func, object]);
export const thresholdType = oneOfType([number, arrayOf(number)]);
