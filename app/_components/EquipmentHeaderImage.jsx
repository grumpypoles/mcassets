import Image from "next/image";

function EquipmentHeaderImage({ eqData }) {
  
  // Ensure mast.image is defined
  if (!eqData[0] || !eqData[0].image) {
    return <p>No image available</p>;
  }

  // Check if mast.image is a JSON string or a plain string/array
  let urls;
  try {
    urls = typeof eqData[0].image === 'string' ? JSON.parse(eqData[0].image) : eqData[0].image;
  } catch (error) {
    console.error("Error parsing mast.image:", error);
    return <p>Invalid image format</p>;
  }

  // Ensure that urls is an array
  if (!Array.isArray(urls)) {
    return <p>Invalid image format</p>;
  }

  return (
    <section>
      <div className="m-auto container-xl">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={urls[0]}
            alt="Equipment Image"
            className="w-[40%] h-auto rounded-t-xl "
            width={0}
            height={0}
            sizes="50vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}

export default EquipmentHeaderImage;
