import { oneOfType, func, object, string, arrayOf } from 'prop-types';

export const refType = oneOfType([func, object]);
export const thresholdType = oneOfType([string, arrayOf(string)]);
