import { useState, useEffect } from "react";
import { format } from "date-fns";
import { addAsset } from "@/app/_lib/mongo_actions";
import { editAsset } from "@/app/_lib/mongo_actions";
import Image from "next/image";

const AssetsForm = ({ equipment, categories, locations, edit }) => {
  const [urls, setUrls] = useState({
    image: "",
    invoice: "",
    instructions: "",
  });

  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    if (edit && equipment) {
      setUrls({
        image: equipment.card?.image ? `/uploads/images/${equipment.card.image}` : "",
        invoice: equipment.finance?.purchase?.invoice
          ? `/uploads/invoices/${equipment.finance.purchase.invoice}`
          : "",
        instructions: equipment.technical?.instructions
          ? `/uploads/instructions/${equipment.technical.instructions}`
          : "",
      });
    }
  }, [edit, equipment]);

  const initialFormData =
    edit && equipment
      ? {
          selcode: equipment.selcode ?? "",
          card_model: equipment.card?.model ?? "",
          card_description: equipment.card?.description ?? "",
          card_image: equipment.card?.image ?? "",
          technical_category: equipment.technical?.category ?? "",
          technical_location: equipment.technical?.location ?? "",
          technical_maker_name: equipment.technical?.maker?.name ?? "",
          technical_maker_web: equipment.technical?.maker?.web ?? "",
          technical_model_number: equipment.technical?.model_number ?? "",
          technical_serial_number: equipment.technical?.serial_number ?? "",
          technical_instructions: equipment.technical?.instructions ?? "",
          finance_purchase_date: equipment.finance?.purchase?.date ?? "",
          finance_purchase_location:
            equipment.finance?.purchase?.location ?? "",
          finance_purchase_amount: equipment.finance?.purchase?.amount ?? "",
          finance_purchase_note: equipment.finance?.purchase?.note ?? "",
          finance_purchase_invoice: equipment.finance?.purchase?.invoice ?? "",
          finance_disposal_date:
            equipment.finance?.disposal?.date ?? "1990-01-01",
          finance_disposal_amount:
            equipment.finance?.disposal?.amount ?? "0.00",
          finance_disposal_note: equipment.finance?.disposal?.note ?? "",
          is_active: equipment.is_active ?? "",
        }
      : {
          selcode: "",
          card_model: "",
          card_description: "",
          card_image: "",
          technical_category: "",
          technical_location: "",
          technical_maker_name: "",
          technical_maker_web: "",
          technical_model_number: "",
          technical_serial_number: "",
          technical_instructions: "",
          finance_purchase_date: "",
          finance_purchase_location: "",
          finance_purchase_amount: "",
          finance_purchase_note: "",
          finance_purchase_invoice: "",
          finance_disposal_date: "1990-01-01",
          finance_disposal_amount: "0.00",
          finance_disposal_note: "",
          is_active: "",
        };

  const [formData, setFormData] = useState(initialFormData);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // List of numeric fields that require special handling
    const numericFields = [
      "finance_purchase_amount",
      "finance_disposal_amount",
    ];

    // Check if the field is a numeric field
    if (numericFields.includes(name)) {
      // Remove commas and parse the value to a number
      const numericValue = parseFloat(value.replace(/,/g, ""));
      const isValid = !isNaN(numericValue) && numericValue >= 0; // Ensure non-negative
      // Update the state with the numeric value (or empty string if NaN)
      setFormData((prev) => ({
        ...prev,
        [name]: isValid ? numericValue : "",
      }));
    } else {
      // Default handling for other fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center py-3">
        <div className="w-full mx-auto bg-primary-800">
          <div className="px-8 pt-6 pb-4 border-b-4 border-primary-700 ">
            <h1 className="text-4xl font-semibold text-primary-500">
              {edit ? "Edit Asset" : "Add New Asset"}
            </h1>
          </div>
          <form className="px-8 pb-6" action={edit ? editAsset : addAsset} method="POST" encType="multipart/form-data">
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
                  placeholder="xxxx"
                  value={formData.selcode}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="technical_category"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Category
                </label>
                <select
                  name="technical_category"
                  id="technical_category"
                  required
                  value={formData.technical_category}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {categories && categories.length > 0 ? (
                    categories.map((category, index) => (
                      <option key={index} value={category.description}>
                        {category.description}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="technical_location"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Location
                </label>
                <select
                  name="technical_location"
                  id="technical_location"
                  required
                  value={formData.technical_location}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                >
                  {locations && locations.length > 0 ? (
                    locations.map((location, index) => (
                      <option key={index} value={location.description}>
                        {location.description}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="card_description"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="card_description"
                  id="card_description"
                  required
                  value={formData.card_description}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="technical_maker_name"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Maker
                </label>
                <input
                  type="text"
                  name="technical_maker_name"
                  id="technical_maker_name"
                  required
                  value={formData.technical_maker_name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="card_model"
                  className="block mb-3 text-base font-medium text-primary-300"
                >
                  Model
                </label>
                <input
                  type="text"
                  name="card_model"
                  id="card_model"
                  required
                  value={formData.card_model}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                />
              </div>
            </div>


            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-4 font-semibold transition-all rounded-md bg-primary-700 text-primary-100 hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
              >
                {edit ? "Update Asset" : "Add Asset"}
              </button>
            </div>
          </form>
        </div>
      </div>

</>
  );
};

export default AssetsForm;
