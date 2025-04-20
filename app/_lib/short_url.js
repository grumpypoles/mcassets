// components/ShortUrlDisplay.jsx

const ShortUrlDisplay = ({ url }) => {
  const rawUrl = Array.isArray(url) ? url[0] : url;

  if (typeof rawUrl !== "string") {
    console.warn("Expected a string for 'url', but got:", rawUrl);
    return null;
  }

  const lastSegment = rawUrl.split("/").pop();

  // Find the index of the 4-digit code (pattern: 4 digits at the start)
  const match = lastSegment.match(/\d{4}/);
  const startIndex = match ? match.index : 0;

  const shortText = lastSegment.slice(startIndex, startIndex + 25);

  return <span style={{ textDecoration: "underline" }}>{shortText}</span>;
};


  
  export default ShortUrlDisplay;
  