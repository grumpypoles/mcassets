import { KeyIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
const AssetsTechnical = ({ eqData }) => {
  // Check if technical instruction exists
  let pdf_urls;
  if (
    eqData?.technical?.instructions &&
    eqData.technical.instructions.length > 0
  ) {
    pdf_urls = `/instructions/${eqData.technical.instructions}`;
  } else {
    pdf_urls = `/instructions/AssetImageMissing.jpg`;
  }

  return (
    <div className="flex flex-col items-center justify-top text-primary-800 bg-primary-200">
      <span className="flex flex-row items-center w-full p-4 mb-4 text-2xl font-bold gap-x-2 bg-primary-400">
        <WrenchScrewdriverIcon className="w-10 h-10" /> Technical Data
      </span>

      <div>
        <ul>
          <li>
            <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
              <KeyIcon className="w-6 h-6" /> Category:{" "}
              {eqData.technical.category}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
              <KeyIcon className="w-6 h-6" /> Location:{" "}
              {eqData.technical.location}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
              <KeyIcon className="w-6 h-6" /> Serial Number:{" "}
              {eqData.technical.serial_number}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
              <KeyIcon className="w-6 h-6" /> Status: {eqData.status}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              <a
                href={eqData.technical.maker.web}
                className="flex flex-row items-center w-full text-xl font-medium gap-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <KeyIcon className="w-6 h-6" />
                Maker WEB: {eqData.technical.maker.web}
              </a>
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full mb-10 text-xl font-medium gap-x-2">
              <a
                href={pdf_urls}
                className="flex flex-row items-center w-full text-xl font-medium gap-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <KeyIcon className="w-6 h-6" />
                Instructions: {eqData.technical.instructions}
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AssetsTechnical;
