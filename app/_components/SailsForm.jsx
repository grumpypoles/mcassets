import { useState, useEffect } from "react";

import { addSail } from "@/app/_lib/actions_sails";
import { editSail } from "@/app/_lib/actions_sails";
import Image from "next/image";

const SailsForm = ({ equipment, edit }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [invoiceUrls, setInvoiceUrls] = useState([]);

  useEffect(() => {
    if (edit) {
      const imageUrlsString = equipment[0]?.image || "[]"; // Default to '[]' if image is undefined
      const parsedImageUrls = JSON.parse(imageUrlsString);
      setImageUrls(parsedImageUrls); // Update state with image URLs
    }
  }, [edit, equipment]);

  useEffect(() => {
    if (edit) {
      const invoiceImageUrls = equipment[0]?.invoice || "[]";
      setInvoiceUrls(invoiceImageUrls); // Update state with image URLs
   
    }
  }, [edit, equipment]);
 
  // State for form data
  const [formData, setFormData] = useState({
    selcode: "SAxx",
    model: "",
    make: "",
    year: "",
    size: "",
    color: "",
    weight: "",
    luff: "",
    boom: "",
    battens: "",
    cams: "",
    head: "",
    mast: "",
    // image: "",
    web_url: "",
    is_active: "",
    app_user_id: "",
    purchase_date: "",
    merchant: "",
    retail_price: "",
    paid_price: "",
    comments: "",
    // invoice: "",
    disposal_date: "1990-01-01",
    disposal: "",
    disposal_price: "0.00",
    // Add other fields here...
  });

  // Populate form if `edit` is true and `mastData` is provided
  useEffect(() => {
    if (edit && equipment) {
      setFormData({
        selcode: equipment[0].selcode || "",
        model: equipment[0].model || "",
        make: equipment[0].make || "",
        year: equipment[0].year || "",
        size: equipment[0].size || "",
        color: equipment[0].color || "",
        weight: equipment[0].weight || "3.0",
        luff: equipment[0].luff || "",
        boom: equipment[0].boom || "",
        battens: equipment[0].battens || "",
        cams: equipment[0].cams || "0",
        head: equipment[0].head || "",
        mast: equipment[0].mast || "",
        // image: equipment[0].image || "",
        web_url: equipment[0].web_url || "",
        is_active: equipment[0].is_active || "",
        app_user_id: equipment[0].app_user_id || "",
        purchase_date: equipment[0].purchase_date || "",
        merchant: equipment[0].merchant || "",
        retail_price: equipment[0].retail_price || "",
        paid_price: equipment[0].paid_price || "",
        comments: equipment[0].comments || "",
        // invoice: equipment[0].invoice || "",
        disposal_date: equipment[0].disposal_date || "1990-01-01",
        disposal: equipment[0].disposal || "",
        disposal_price: equipment[0].disposal_price || "0.00",
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
              {edit ? "Edit Sail" : "Add New Sail"}
            </h1>
          </div>
          <form className="px-8 pb-6" action={edit ? editSail : addSail}>
            <div className="grid grid-cols-12 gap-2 pt-4 mb-5">
              <div>
                <label
                  htmlFor="selcode"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Code
                </label>
                <input
                  type="text"
                  name="selcode"
                  id="selcode"
                  placeholder="SA"
                  value={formData.selcode}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  id="year"
                  required
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="make"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Maker
                </label>
                <input
                  type="text"
                  name="make"
                  id="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="model"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  required
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="head"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Head
                </label>
                <select
                  id="head"
                  name="head"
                  required
                  value={formData.head}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  <option value="Fixed" className="text-centre">
                    Fixed
                  </option>
                  <option value="Variable" className="text-left">
                    Variable
                  </option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="size"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Size
                </label>
                <input
                  type="number"
                  min="3"
                  max="12"
                  step="0.10"
                  name="size"
                  id="size"
                  required
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="weight"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Weight
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.01"
                  name="weight"
                  id="weight"
                  required
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-5 ">
              <div className="col-span-2">
                <label
                  htmlFor="luff"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Luff
                </label>
                <input
                  type="number"
                  step="0.10"
                  name="luff"
                  id="luff"
                  required
                  value={formData.luff}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="boom"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Boom
                </label>
                <input
                  type="number"
                  name="boom"
                  step="0.10"
                  id="boom"
                  required
                  value={formData.boom}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="battens"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Battens
                </label>
                <input
                  type="number"
                  name="battens"
                  id="battens"
                  required
                  value={formData.battens}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="cams"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Cams
                </label>
                <input
                  type="number"
                  name="cams"
                  id="cams"
                  required
                  value={formData.cams}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="color"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  required
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="mast"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Mast
                </label>
                <input
                  type="text"
                  name="mast"
                  id="mast"
                  required
                  value={formData.mast}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-5 ">
              <div className="col-span-4">
                <label
                  htmlFor="image"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Select Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  required
                  className="w-full text-base font-semibold text-primary-800 bg-primary-100 border rounded cursor-pointer file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-primary-100 file:hover:bg-primary-200 file:text-primary-900"
                />
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="invoice"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Select Invoice
                </label>
                <input
                  type="file"
                  name="invoice"
                  id="invoice"
                  placeholder="MT"
                  className="w-full text-base font-semibold text-primary-800 bg-primary-100 border rounded cursor-pointer file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-primary-100 file:hover:bg-primary-200 file:text-primary-900"
                />
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="web_url"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Maker URL
                </label>
                <input
                  type="url"
                  name="web_url"
                  id="web_url"
                  value={formData.web_url}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-5 ">
              <div className="col-span-3">
                <label
                  htmlFor="merchant"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Merchant
                </label>
                <input
                  type="text"
                  name="merchant"
                  id="merchant"
                  required
                  value={formData.merchant}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="comments"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Comments
                </label>
                <input
                  type="text"
                  name="comments"
                  id="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="purchase_date"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchase_date"
                  id="purchase_date"
                  value={formData.purchase_date}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="retail_price"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  $ Retail Price
                </label>
                <input
                  type="number"
                  step="0.10"
                  name="retail_price"
                  id="retail_price"
                  required
                  value={formData.retail_price}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="paid_price"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  $ Paid Price
                </label>
                <input
                  type="number"
                  step="0.10"
                  name="paid_price"
                  id="paid_price"
                  required
                  value={formData.paid_price}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-5 ">
              <div className="col-span-2"></div>
              <div className="col-span-2"></div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-5 ">
              <div className="col-span-2">
                <label
                  htmlFor="disposal_date"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Disposal Date
                </label>
                <input
                  type="date"
                  name="disposal_date"
                  // defaultValue={"1990-01-01"}
                  id="disposal_date"
                  value={formData.disposal_date}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="disposal_price"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  $ Disposal Revenue
                </label>
                <input
                  type="number"
                  step="0.10"
                  name="disposal_price"
                  defaultValue={0.0}
                  id="disposal_price"
                  value={formData.disposal_price}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="disposal"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Disposal Method
                </label>
                <input
                  type="text"
                  name="disposal"
                  id="disposal"
                  value={formData.disposal}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="is_active"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Status
                </label>
                <select
                  id="is_active"
                  name="is_active"
                  value={formData.is_active}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  <option value="true" className="text-centre">
                    Active
                  </option>
                  <option value="false" className="text-left">
                    Inactive
                  </option>
                </select>
              </div>
              {/* <div className="col-span-2"></div> */}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-4 font-semibold transition-all rounded-md bg-primary-700 text-primary-100 hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
              >
                {edit ? "Update Sail" : "Add Sail"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {edit && imageUrls.length > 0 && (
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
      )}
    </>
  );
};

export default SailsForm;
