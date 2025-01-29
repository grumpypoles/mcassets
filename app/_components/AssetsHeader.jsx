const AssetHeader = ({ eqData }) => {
  const arg1 = eqData.selcode;
  const arg2 = eqData.card.description;
  const arg3 = eqData.technical.maker.name;
  const arg4 = eqData.card.model;

  return (
    <div className="w-full px-5 py-3 text-2xl font-bold rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400">
      <h1>
        {arg1} {arg2}
        {arg3?.length > 0 && ` Maker: ${arg3}`}
        {arg4?.length > 0 && ` Model: ${arg4}`}
      </h1>
    </div>
  );
};

export default AssetHeader;
