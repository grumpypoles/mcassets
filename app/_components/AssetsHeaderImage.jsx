import Image from "next/image";

function AssetsHeaderImage({ eqData }) {
  // Check if card.image exists
  let urls;
  if (eqData?.card?.image && eqData.card.image.length > 0) {
    urls = `/uploads/images/${eqData.card.image}`;
  } else {
    urls = `/uploads/images/AssetImageMissing.jpg`;
  }

  return (
    <section>
      <div className="m-auto container-xl">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={urls}
            alt="Asset Image"
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

export default AssetsHeaderImage;
