import { KeyIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
const EquipmentTechnical = ({ type, eqData }) => {
  return (
    <div className="flex flex-col items-center justify-top text-primary-800 bg-primary-200">
      <span className="flex flex-row items-center w-full p-4 mb-4 text-2xl font-bold gap-x-2 bg-primary-400">
        <WrenchScrewdriverIcon className="w-10 h-10" /> Technical Data
      </span>

      <div>
        <ul>
        {type === "Mast" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Type: {eqData[0].type}
              </span>
            </li>
          )}
          {type === "Sail" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Color: {eqData[0].color}
              </span>
            </li>
          )}
          {type === "Sail" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Luff: {eqData[0].luff}
              </span>
            </li>
          )}
          {type === "Sail" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Boom: {eqData[0].boom}
              </span>
            </li>
          )}
          {type === "Sail" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Battens: {eqData[0].battens}
              </span>
            </li>
          )}
          {type === "Sail" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Cams: {eqData[0].cams}
              </span>
            </li>
          )}
          {type === "Sail" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Head: {eqData[0].head}
              </span>
            </li>
          )}
          {type === "Sail" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Mast: {eqData[0].mast}
              </span>
            </li>
          )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Volume: {eqData[0].volume} liters
              </span>
            </li>
          )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Width: {eqData[0].width}
              </span>
            </li>
          )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Length: {eqData[0].length}
              </span>
            </li>
          )}
          {type !== "Sundry" && (
          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              <KeyIcon className="w-6 h-6" /> Weight: {eqData[0].weight}
            </span>
          </li>
        )}
          {type === "Sundry" && (
          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              <KeyIcon className="w-6 h-6" /> Model: {eqData[0].model}
            </span>
          </li>
        )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Programme: {eqData[0].programme}
              </span>
            </li>
          )}
          {type === "Boom" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Adjustment Length: {eqData[0].adj_length}
              </span>
            </li>
          )}
          {type === "Boom" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Adjustment Type: {eqData[0].adj_type}
              </span>
            </li>
          )}
          {type === "Boom" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Diameter: {eqData[0].diameter}
              </span>
            </li>
          )}
          {type === "Boom" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Body: {eqData[0].body}
              </span>
            </li>
          )}
          {type === "Boom" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Front End: {eqData[0].front_end}
              </span>
            </li>
          )}
          {type === "Boom" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Back End: {eqData[0].back_end}
              </span>
            </li>
          )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Fin Box: {eqData[0].fin_box}
              </span>
            </li>
          )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Fin Size: {eqData[0].fin_size}
              </span>
            </li>
          )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Sail Size: {eqData[0].sail_size}
              </span>
            </li>
          )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Technology: {eqData[0].technology}
              </span>
            </li>
          )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Shaper: {eqData[0].shaper}
              </span>
            </li>
          )}
          {type === "Mast" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> IMCS: {eqData[0].imcs}
              </span>
            </li>
          )}
          {type === "Mast" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Carbon: {eqData[0].carbon}
              </span>
            </li>
          )}
          
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Tail: {eqData[0].tail}
              </span>
            </li>
          )}
        
          
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Back Strap: {eqData[0].back_strap}
              </span>
            </li>
          )}
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Front Strap: {eqData[0].front_strap}
              </span>
            </li>
          )}
          
          
          
          {type === "Board" && (
            <li>
              <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Serial Number: {eqData[0].serial_number}
              </span>
            </li>
          )}
          
          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              <a
                href={eqData[0].web_url}
                className="flex flex-row items-center w-full text-xl font-medium gap-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <KeyIcon className="w-6 h-6" />
                Maker WEB: {eqData[0].web_url}
              </a>
            </span>
          </li>

          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              {eqData[0].is_active && (
                <>
                  <KeyIcon className="w-6 h-6" />
                  Status: Active
                </>
              )}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full mb-6 text-xl font-medium gap-x-2">
              {!eqData[0].is_active && (
                <>
                  <KeyIcon className="w-6 h-6" />
                  Status: Inactive
                </>
              )}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EquipmentTechnical;
