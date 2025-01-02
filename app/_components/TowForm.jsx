import { useState, useEffect } from "react";

import Image from "next/image";
import { addTow, editTow } from "@/app/_lib/actions_tow";

const TowForm = ({edit, data1, data2, data3, data4, data5, data6, data7, data8, data9 }) => {
  // console.log(`Equipment: ${data9[0].spot}`);
  // console.log(`Data 9: ${data9[0].spot}`)


  // Append a new item to the list
  const additionalItem = { full_description: "No Sail" };
  
  // Assuming 'data' is an array, append the item
  const updatedData6 = data6 ? [...data6, additionalItem] : [additionalItem];

  
  // console.log(disciplines)
  // const spotsData = locations;
  //  console.log(locations.spotsData)
  // const [imageUrls, setImageUrls] = useState([]);
  // const [invoiceUrls, setInvoiceUrls] = useState([]);

  // useEffect(() => {
  //   if (edit) {
  //     const imageUrlsString = data9[0]?.image || "[]"; // Default to '[]' if image is undefined
  //     const parsedImageUrls = JSON.parse(imageUrlsString);
  //     setImageUrls(parsedImageUrls); // Update state with image URLs
  //   }
  // }, [edit, equipment]);

  // useEffect(() => {
  //   if (edit) {
  //     const invoiceImageUrls = data9[0]?.invoice || "[]";
  //     setInvoiceUrls(invoiceImageUrls); // Update state with image URLs

  //   }
  // }, [edit, equipment]);

  // State for form data
  const [formData, setFormData] = useState({
    date: "",
    s_time: "13:00",
    e_time: "14:00",
    duration: "00:00:00",
    distance: "0.00",
    spot: "",
    sport: "",
    discipline: "",
    wind_direction: "",
    wind_strength: "",
    swell_size: "",
    swell_direction: "",
    tide_height: "",
    tide_direction: "",
    sail: "",
    board: "",
    rating: "",
    comments: "",
    app_user_id: "",
    // Add other fields here...
  });

  // Populate form if `edit` is true and `mastData` is provided
  useEffect(() => {
    if (edit && data9) {
      setFormData({
        date: data9[0].date || "",
        s_time: data9[0].s_time || "",
        e_time: data9[0].e_time || "",
        duration: data9[0].duration || "",
        distance: data9[0].distance || "0.00",
        spot: data9[0].spot || "",
        sport: data9[0].sport || "",
        discipline: data9[0].discipline || "",
        wind_direction: data9[0].wind_direction || "",
        wind_strength: data9[0].wind_strength || "",
        swell_size: data9[0].swell_size || "0",
        swell_direction: data9[0].swell_direction || "",
        tide_height: data9[0].tide_height || "",
        tide_direction: data9[0].tide_direction || "",
        sail: data9[0].sail || "",
        board: data9[0].board || "",
        rating: data9[0].rating || "",
        comments: data9[0].comments || "",
        id: data9[0].id,
        // Add other fields here...
      });
    }
  }, [edit, data9]);

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
              {edit ? "Edit Session" : "Add New Session"}
            </h1>
          </div>
          <form className="px-8 pb-6" action={edit ? editTow : addTow}>
            <div className="grid grid-cols-12 gap-2 pt-4 mb-5">
            <input
                type="number"
                name="id"
                id="id"
                hidden={true}
                value={formData.id}
                onChange={handleInputChange}
              />
           
              <div className="col-span-2">
                <label
                  htmlFor="date"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  placeholder=""
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="s_time"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Start at
                </label>
                <input
                  type="time"
                  name="s_time"
                  id="s_time"
                  required
                  value={formData.s_time}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="e_time"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  End at
                </label>
                <input
                  type="time"
                  name="e_time"
                  id="e_time"
                  required
                  value={formData.e_time}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="duration"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Duration
                </label>
                <input
                  type="duration"
                  name="duration"
                  id="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="distance"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Distance
                </label>
                <input
                  type="distance"
                  name="distance"
                  id="duration"
                  value={formData.distance}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="spot"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Location
                </label>
                <select
                  name="spot"
                  id="spot"
                  required
                  value={formData.spot}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {data1 && data1.length > 0 ? (
                    data1.map((location, index) => (
                      <option key={index} value={location.spot}>
                        {location.spot}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-5 ">
              <div className="col-span-2">
                <label
                  htmlFor="sport"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Water Sport
                </label>
                <select
                  id="sport"
                  name="sport"
                  required
                  value={formData.sport}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  <option value="Windsurfing" className="text-centre">
                    Windsurfing
                  </option>
                  <option value="SUP" className="text-left">
                    SUP
                  </option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="spot"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Discipline
                </label>
                <select
                  name="discipline"
                  id="discipline"
                  required
                  value={formData.discipline}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {data2 && data2.length > 0 ? (
                    data2.map((location, index) => (
                      <option key={index} value={location.discipline}>
                        {location.discipline}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="wind_strength"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                   Wind Strength
                </label>
                <select
                  name="wind_strength"
                  id="wind_strength"
                  required
                  value={formData.wind_strength}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {data3 && data3.length > 0 ? (
                    data3.map((location, index) => (
                      <option key={index} value={location.strength}>
                        {location.strength}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="wind_direction"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                   Wind Direction
                </label>
                <select
                  name="wind_direction"
                  id="wind_direction"
                  required
                  value={formData.wind_direction}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {data4 && data4.length > 0 ? (
                    data4.map((location, index) => (
                      <option key={index} value={location.direction}>
                        {location.direction}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="swell_size"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                   Swell Size
                </label>
                <select
                  name="swell_size"
                  id="swell_size"
                  required
                  value={formData.swell_size}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {data5 && data5.length > 0 ? (
                    data5.map((location, index) => (
                      <option key={index} value={location.swell}>
                        {location.swell}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="swell_direction"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                   Swell Direction
                </label>
                <select
                  name="swell_direction"
                  id="swell_direction"
                  required
                  value={formData.swell_direction}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {data4 && data4.length > 0 ? (
                    data4.map((location, index) => (
                      <option key={index} value={location.direction}>
                        {location.direction}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div> 
            </div>
            <div className="grid grid-cols-12 gap-2 mb-5 ">
              <div className="col-span-2">
                <label
                  htmlFor="tide_height"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Tide Size
                </label>
                <select
                  id="tide_height"
                  name="tide_height"
                  required
                  value={formData.tide_height}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  <option value="High" className="text-centre">
                    High
                  </option>
                  <option value="Mid" className="text-left">
                    Mid
                  </option>
                  <option value="Low" className="text-left">
                    Low
                  </option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="tide_direction"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Tide Direction
                </label>
                <select
                  id="tide_direction"
                  name="tide_direction"
                  required
                  value={formData.tide_direction}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  <option value="Faling" className="text-centre">
                    Faling
                  </option>
                  <option value="Rising" className="text-left">
                    Rising
                  </option>
                </select>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="sail"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                   Sail
                </label>
                <select
                  name="sail"
                  id="sail"
                  required
                  value={formData.sail}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {updatedData6 && updatedData6.length > 0 ? (
                    updatedData6.map((location, index) => (
                      <option key={index} value={location.full_description}>
                        {location.full_description}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="board"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                   Board
                </label>
                <select
                  name="board"
                  id="board"
                  required
                  value={formData.board}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {data7 && data7.length > 0 ? (
                    data7.map((location, index) => (
                      <option key={index} value={location.full_description}>
                        {location.full_description}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="rating"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                   Rating
                </label>
                <select
                  name="rating"
                  id="rating"
                  required
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {data8 && data8.length > 0 ? (
                    data8.map((location, index) => (
                      <option key={index} value={location.rating}>
                        {location.rating}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>

            </div>
            <div className="grid grid-cols-12 gap-2 mb-5 ">
              <div className="col-span-12">
                <label
                  htmlFor="comments"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Comments
                </label>
                <textarea
                  rows={5}
                  name="comments"
                  id="comments"
                  required
                  value={formData.comments}
                  onChange={handleInputChange}
                  className="w-full text-xl font-semibold text-primary-800 bg-primary-100 border rounded cursor-pointer file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-primary-100 file:hover:bg-primary-200 file:text-primary-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-5 ">
              <div className="col-span-2"></div>
              <div className="col-span-2"></div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-4 font-semibold transition-all rounded-md bg-primary-700 text-primary-100 hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
              >
                {edit ? "Update Session" : "Add Session"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* {edit && imageUrls.length > 0 && (
        <div className="flex flex-row justify-center space-x-7 p-6 px-12 py-8 max-h-96 bg-primary-800">
          <Image
            src={imageUrls[0]} // Use the first image URL
            alt="Sail Image"
            height={0}
            width={0}
            sizes="100vw"
            className="w-1/6 h-auto rounded-t-xl"
          />
          <Image
            src={invoiceUrls[0]}
            alt=""
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

export default TowForm;

