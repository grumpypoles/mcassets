import { useState, useEffect } from "react";

import Image from "next/image";
import { addLocation, editLocation } from "@/app/_lib/actions_locations";

const LocationForm = ({ equipment, edit }) => {
  

  // State for form data
  const [formData, setFormData] = useState({
    spot: "",
    sport: "",
    map_location: "",
    latitude: "",
    longitude: "",
    // Add other fields here...
  });

  // Populate form if `edit` is true and `mastData` is provided
  useEffect(() => {
    if (edit && equipment) {
      setFormData({
        spot: equipment[0].spot || "",
        sport: equipment[0].sport || "",
        map_location: equipment[0].map_location || "",
        make: equipment[0].make || "",
        latitude: equipment[0].latitude || "",
        longitude: equipment[0].longitude || "",
        app_user_id: equipment[0].app_user_id || "",
        // Add other fields here...
      });
    }
  }, [edit, equipment]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex items-center justify-center py-3">
        <div className="w-full mx-auto bg-primary-800">
          <div className="px-8 pt-6 pb-4 border-b-4 border-primary-700 ">
            <h1 className="text-4xl font-semibold text-primary-500">
              {edit ? "Edit Location" : "Add New Location"}
            </h1>
          </div>
          <form
            className="px-8 pb-6"
            action={edit ? editLocation : addLocation}
          >
            <div className="grid grid-cols-4 gap-2 pt-4 mb-5">
              <input
                type="number"
                name="id"
                id="id"
                hidden={true}
                value={formData.id}
                onChange={handleInputChange}
              />
              <div className="">
                <label
                  htmlFor="spot"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Sailing / SUP Location
                </label>
                <input
                  type="text"
                  name="spot"
                  id="spot"
                  placeholder="Ocean Location"
                  value={formData.spot}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>

              <div className="">
                <label
                  htmlFor="sport"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Ocean Sports
                </label>
                <select
                  id="sport"
                  name="sport"
                  value={formData.sport}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  <option value="Windsuring" className="text-centre">
                    Windsurfing
                  </option>
                  <option value="SUP" className="text-left">
                    SUP
                  </option>
                </select>
              </div>
              <div className="">
                <label
                  htmlFor="latitude"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  id="latitude"
                  step="0.000001" // Allows precision up to 6 decimal places
                  min="-90"
                  max="90"
                  required
                  value={formData.latitude}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="">
                <label
                  htmlFor="longitude"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  id="longitude"
                  step="0.000001" // Allows precision up to 6 decimal places
                  min="-180"
                  max="180"
                  required
                  value={formData.longitude}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-5 ">
              <div className="col-span-4">
                <label
                  htmlFor="map_location"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  My Google Map
                </label>
                <textarea
                  rows={5}
                  name="map_location"
                  id="map_location"
                  required
                  className="w-full text-sm font-semibold text-primary-800 bg-primary-100 border rounded cursor-pointer file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-primary-100 file:hover:bg-primary-200 file:text-primary-900"
                />
              </div>
            </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-4 font-semibold transition-all rounded-md bg-primary-700 text-primary-100 hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
                >
                  {edit ? "Edit Location" : "Add Location"}
                </button>
              </div>
          </form>
        </div>
      </div>
      {/* {edit && imageUrls.length > 0 && (
        <div className="flex flex-row justify-center px-6 py-8 space-x-7 max-h-96 bg-primary-800">
          <Image
            src={imageUrls[0]} // Use the first image URL
            alt="Sundry Image"
            height={0}
            width={0}
            sizes="100vw"
            className="w-1/6 h-auto rounded-t-xl"
          />
          <Image
            src={invoiceUrls[0]}
            alt="Invoice Image"
            height={0}
            width={0}
            sizes="100vw"
            className="w-1/6 h-auto rounded-t-xl"
          />
        </div>
      )} */}
    </>
  );
};

export default LocationForm;
