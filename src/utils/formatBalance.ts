const centsSep = ".";
const thousandsSep = ",";

export function formatBalance(prevBalance: string) {
  const currency = "$";
  let number = convertBalanceToNumber(String(prevBalance));

  let minus = false;

  if (Number.isNaN(number)) {
    return;
  }

  if (number < 0) {
    minus = true;
  }

  number = Math.abs(number);

  const fixedPrecision = fixPrecision(number);
  const thousands = extractThousands(fixedPrecision);
  const cents = extractCents(fixedPrecision);

  const formattedBalance = `${minus ? "- " : ""}${
    currency || ""
  } ${thousands}${cents}`;
  return formattedBalance;
}

export function convertBalanceToNumber(input: string) {
  const sanitizedInput = sanitizeInput(input);

  return Number(sanitizedInput);
}

function sanitizeInput(input: string) {
  let sanitizedInput = input;
  sanitizedInput = removeCurrency(sanitizedInput);
  sanitizedInput = removeSeparators(sanitizedInput);

  return sanitizedInput;
}

export function removeCurrency(input: string) {
  const inputWithoutCurrency = input.replace("$", "").trim();

  return inputWithoutCurrency;
}

function removeSeparators(input: string) {
  let inputWithoutSeps = input;

  while (inputWithoutSeps.indexOf(thousandsSep) > -1) {
    inputWithoutSeps = inputWithoutSeps.replace(thousandsSep, "");
  }
  inputWithoutSeps = inputWithoutSeps.replace(centsSep, "");

  return inputWithoutSeps;
}

function fixPrecision(number: number) {
  const decimals = number / 100;
  return decimals.toFixed(2);
}

function extractThousands(sanitizedInput: string) {
  let thousands = sanitizedInput.split(centsSep)[0];
  const thousandsArr = [];

  while (thousands.length > 0) {
    thousandsArr.unshift(
      thousands.substr(Math.max(0, thousands.length - 3), 3)
    );
    thousands = thousands.substr(0, thousands.length - 3);
  }

  const formattedThousands = thousandsArr.join(thousandsSep);

  return formattedThousands;
}

function extractCents(sanitizedInput: string) {
  const cents = sanitizedInput.split(centsSep)[1];
  return centsSep + cents;
}
