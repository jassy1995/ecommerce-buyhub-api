import crypto from 'crypto';

export const generateRandomHex = (size = 16) => {
  return crypto.randomBytes(size).toString('hex');
};

export const generateOtp = () => {
  let code = '';
  do {
    code += crypto.randomBytes(3).readUIntBE(0, 3);
  } while (code.length < 6);
  return code.slice(0, 6);
};

export const generateSlug = (text: string) => {
  text = text.trim();
  text = text.toLowerCase();
  text = text.replace(/ /g, '-');
  text = text.replace(/-+/g, '-');
  text = text.replace(/[^\w-]+/g, '');
  return text;
};

export const capitalize = (word: string) => {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const parseDateString = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split('/').map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    // Invalid date format
    return null;
  }
  const isDayMonthFormat = day <= 12 && month > 12;
  const [validDay, validMonth] = isDayMonthFormat ? [month, day] : [day, month];
  const date = new Date(Date.UTC(year, validMonth - 1, validDay));
  if (isNaN(date.getTime())) {
    // Invalid date values
    return null;
  }
  return date;
};

export const extractJSONObject = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse JSON', e);
    return null;
  }
};
