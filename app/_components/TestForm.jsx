const TestForm = () => {
  return (
    <div className="flex items-center justify-center p-12">
      
      <div className="w-full mx-auto bg-primary-800">
      <div className="px-8 py-6 ">
        <h1 className="text-6xl font-semibold text-primary-500" >Masts</h1>
      </div>
        <form className="px-8 pb-6">
          <div className="grid grid-cols-12 gap-2 mb-5 ">
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
                placeholder="MT"
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
                // placeholder="Year"
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
                // placeholder="Maker"
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
                // placeholder="Model"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="type"
                className="block mb-3 text-base font-medium text-primary-300"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              >
                <option value="option1" className="text-centre">
                  RDM
                </option>
                <option value="option2" className="text-left">
                  SDM
                </option>
              </select>
              {/* <input
                  type="text"
                  name="type"
                  id="type"
                  // placeholder="RDM"
                  value={'RDM'}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                /> */}
            </div>
            <div>
              <label
                htmlFor="length"
                className="block mb-3 text-base font-medium text-primary-300"
              >
                Length
              </label>
              <input
                type="number"
                name="length"
                id="length"
                // placeholder="Length"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block mb-3 text-base font-medium text-primary-300"
              >
                Weight
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
                // placeholder="Maker"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="imcs"
                className="block mb-3 text-base font-medium text-primary-300"
              >
                IMCS
              </label>
              <input
                type="number"
                name="imcs"
                id="imcs"
                // placeholder="Maker"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="carbon"
                className="block mb-3 text-base font-medium text-primary-300"
              >
                Carbon %
              </label>
              <input
                type="number"
                name="carbon"
                id="carbon"
                // placeholder="Carbon"
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
                //   placeholder="MT"
                className="w-full text-sm font-semibold text-primary-800 bg-primary-100 border rounded cursor-pointer file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-primary-100 file:hover:bg-primary-200 file:text-primary-900"
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
                // placeholder="URL"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              />
            </div>
            <div className="col-span-4">
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
                // placeholder="Merchant"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 mb-5 ">
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
                placeholder="MT"
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
                name="retail_price"
                id="retail_price"
                // placeholder="URL"
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
                name="paid_price"
                id="paid_price"
                // placeholder="Merchant"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              />
            </div>
            <div className="col-span-2">
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
                // placeholder="Merchant"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
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
                className="w-full text-sm font-semibold text-primary-800 bg-primary-100 border rounded cursor-pointer file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-primary-100 file:hover:bg-primary-200 file:text-primary-900"
              />
            </div>
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
                id="disposal_date"
                placeholder="MT"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              />
            </div>
            <div className="col-span-2">
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
                // placeholder="URL"
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
                name="disposal_price"
                id="disposal_price"
                // placeholder="Merchant"
                className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              />
            </div>
            <div className="col-span-2"></div>
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
                className="w-full px-6 py-3 text-base font-medium border rounded-md border-primary-200 bg-primary-100 text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
              >
                <option value="option1" className="text-centre">
                  Active
                </option>
                <option value="option2" className="text-left">
                  Inactive
                </option>
              </select>
              {/* <input
                  type="text"
                  name="is_active"
                  id="is_active"
                  // placeholder="RDM"
                  // value={'RDM'}
                  className="w-full rounded-md border border-primary-200 bg-primary-100 py-2.5 px-6 text-base font-medium text-primary-900 focus:ring focus:ring-opacity-50 disabled:opacity-50"
                /> */}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-4 font-semibold transition-allrounded-md bg-primary-700 text-primary-100 hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            >
              Submit
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default TestForm;
