export function getPdfDescription(pdf_urls, url_type, asset) {
    if (!Array.isArray(pdf_urls) || !url_type || !asset) return "";
  
    const missingPatterns = {
      instruction: "0000_No_Instructions",
      invoice: "0000_Missing_Invoice",
    };
  
    const fallbackDescriptions = {
      instruction: "0000 No Instructions.pdf",
      invoice: "0000 No Invoice.pdf",
    };
  
    const targetUrl = pdf_urls.find((url) =>
      url.includes(url_type === "instruction" ? "Instructions" : "Invoice")
    );
  
    const isMissing = targetUrl?.includes(missingPatterns[url_type]);
  
    return isMissing
      ? fallbackDescriptions[url_type]
      : `${asset.selcode} - ${asset.card_description}.pdf`;
  }

  
  