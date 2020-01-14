// Roman numerals table by decade and highest decimal
const romanUnit = {
  "0": {
    "1": "I",
    "5": "V"
  },
  "1": {
    "1": "X",
    "5": "L"
  },
  "2": {
    "1": "C",
    "5": "D"
  },
  "3": {
    "1": "M"
  }
}

/**
 * Convert number to roman numerals.
 *
 * @param {Int16Array}   value           A number strictely under 5000.
 *
 * @return {Promise} Promise that await for roman numerals as a string.
 */
const toRoman = async (value) => {
  if (value > 4999 || value < 1) {
    throw "bad_parameter_value";
  }
  const stringValue = value.toString();
  let result = "";
  let decade, number;

  for (var i = 0; i < stringValue.length; i++) {
    decade = stringValue.length - 1 - i;
    number = parseInt(stringValue[i]);
    result += await getRomanNumeral(number, decade);
  }

  return result
}

/**
 * Convert a given number and decade to a roman numeral.
 *
 * @param {Int16Array}   number           A decimal number.
 * @param {Int16Array}   decade           A number.
 *
 * @return {String} Promise that await for a roman numeral as a string.
 */
const getRomanNumeral = async (number, decade) => {
  let result = "", i;
  let units;

  if (number < 4) {
    units = romanUnit[decade % 4];
    for (i = 0; i < number; i++) {
      result += units["1"];
    }
  }
  else if (number < 5) {
    units = romanUnit[decade % 4];

    // WORKAROUND : there is no symbol for 5000 number (not accurate).
    if (typeof units["5"] != "undefined")
      result = `${units["1"]}${units["5"]}`;
    else
      for (i = 0; i < number % 5; i++) {
        result += units["1"];
      }
  }
  else if (number < 9) {
    units = romanUnit[decade % 4];
    result = `${units["5"]}`;
    for (i = 0; i < number % 5; i++) {
      result += units["1"];
    }
  }
  else {
    units = romanUnit[decade % 4];
    result = `${units["1"]}`;
    units = romanUnit[(decade + 1) % 4];
    result += `${units["1"]}`;
  }
  return result
}

export { toRoman, getRomanNumeral };