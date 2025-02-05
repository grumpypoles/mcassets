export const getYear = (date) => {
  const newDate = new Date(date);
  return newDate.getFullYear();
};

export const getMonthAbbreviation = (date) => {
  const month = new Date(date);
  return month.toLocaleString("default", { month: "short" });
};

export function buildAssetsData(formData, imageFile, instructionsFile, invoiceFile, action) {
  const data = {
    ...(action === "add" && { selcode: formData.get("selcode") || "" }),
    card: {
      description: formData.get("card_description") || "",
      model: formData.get("card_model") || "",
      image: imageFile.name || null,
    },
    technical: {
      //category: formData.get("technical_category") || "",
      //location: formData.get("technical_location") || "",
      maker: {
        web: formData.get("technical_maker_web") || "",
        name: formData.get("technical_maker_name") || "",
      },
      instructions: instructionsFile.name || null,
      model_number: formData.get("technical_model_number") || "",
      serial_number: formData.get("technical_serial_number") || "",
    },
    finance: {
      purchase: {
        date: formData.get("finance_purchase_date") || "",
        location: formData.get("finance_purchase_location") || "",
        amount: formData.get("finance_purchase_amount") || "",
        invoice: invoiceFile.name || null,
        note: formData.get("finance_purchase_note") || "",
      },
      disposal: {
        date: formData.get("finance_disposal_date") || "",
        amount: formData.get("finance_disposal_amount") || "",
      },
    },
    status: formData.get("is_active") || "",
    // admin: {
    //   creation_date: new Date().toISOString(),
    // },
  };

  return data;
}


