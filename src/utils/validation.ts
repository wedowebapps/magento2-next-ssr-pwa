export const handleCardNumberChange = (e: any) => {
  const formattedCardNumber = e.target.value.replace(/\s/g, ""); // Remove spaces

  if (/^\d+$/.test(formattedCardNumber) || formattedCardNumber === "") {
    e.target.value =
      formattedCardNumber
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || "";
  }
};

export const handleExpiryDateChange = (e: any) => {
  const formattedExpiryDate = e.target.value.replace(/[^0-9]/g, "");

  if (/^\d{0,4}$/.test(formattedExpiryDate)) {
    e.target.value =
      formattedExpiryDate
        .match(/.{1,2}/g)
        ?.join("/")
        .substr(0, 5) || "";
  }
};

export const handleCvcChange = (e: any) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};
