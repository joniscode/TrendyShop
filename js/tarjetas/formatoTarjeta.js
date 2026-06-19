export const getCardBrand = (number) => {
  const cleanNumber = number.replace(/\D/g, "");

  if (/^3[47]/.test(cleanNumber)) return "AMEX";
  if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) return "MASTERCARD";
  if (/^4/.test(cleanNumber)) return "VISA";

  return "CARD";
};

export const formatCardNumber = (value) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

export const formatExpiration = (value) => {
  const cleanValue = value.replace(/\D/g, "").slice(0, 4);

  if (cleanValue.length <= 2) return cleanValue;

  return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`;
};
