import Image from "next/image";

function AssetsHeaderImage({ eqData }) {
 

  if (!eqData || eqData.length === 0) {
    return null; // Early return if no data
  }

  // Extract the first item (assuming eqData is an array of assets)
  const asset = eqData[0];

  // Debug: Log the exact value of card_image
  

  // Case 1: card_image is already an array (correct format)
  if (Array.isArray(asset.card_image)) {
    if (asset.card_image.length === 0) {
      return <p>No image available</p>;
    }
    const imageUrl = asset.card_image[0];
    return renderImage(imageUrl, asset.card_description);
  }

  // Case 2: card_image is a stringified array (e.g., "[\"https://...\"]")
  if (typeof asset.card_image === "string") {
    try {
      const parsedArray = JSON.parse(asset.card_image);
      if (Array.isArray(parsedArray) && parsedArray.length > 0) {
        const imageUrl = parsedArray[0];
        return renderImage(imageUrl, asset.card_description);
      }
    } catch (error) {
      console.error("Failed to parse card_image:", error);
    }
  }

  // Fallback: No valid image found
  return <p>No image available</p>;
}

// Helper function to render the image (avoid code duplication)
function renderImage(url, altText) {
  return (
    <section>
      <div className="m-auto container-xl">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={url}
            alt={altText?.trim() || "Asset Image"}
            className="w-[40%] h-auto rounded-t-xl"
            width={400}
            height={300}
            sizes="50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default AssetsHeaderImage;