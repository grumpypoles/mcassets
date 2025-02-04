export const getYear = (date) => {
  const newDate = new Date(date);
  return newDate.getFullYear();
};

export const getMonthAbbreviation = (date) => {
  const month = new Date(date);
  return month.toLocaleString("default", { month: "short" });
};

export function buildAssetsData(formData, imageFile, instructionsFile, invoiceFile, action) {
  const data = {
    ...(action === "add" && { selcode: formData.get("selcode") || "" }),
    card: {
      description: formData.get("card_description") || "",
      model: formData.get("card_model") || "",
      image: imageFile || null,
    },
    technical: {
      category: formData.get("technical_category") || "",
      location: formData.get("technical_location") || "",
      maker: {
        web: formData.get("technical_maker_web") || "",
        name: formData.get("technical_maker_name") || "",
      },
      instructions: instructionsFile || null,
      model_number: formData.get("technical_model_number") || "",
      serial_number: formData.get("technical_serial_number") || "",
    },
    finance: {
      purchase: {
        date: formData.get("finance_purchase_date") || "",
        location: formData.get("finance_purchase_location") || "",
        amount: formData.get("finance_purchase_amount") || "",
        invoice: invoiceFile || null,
        note: formData.get("finance_purchase_note") || "",
      },
      disposal: {
        date: formData.get("finance_disposal_date") || "",
        amount: formData.get("finance_disposal_amount") || "",
      },
    },
    status: formData.get("is_active") || "",
    admin: {
      creation_date: new Date().toISOString(),
    },
  };

  return data;
}


export function sundryTechnicalData(formData, imageUrls, appUserId, action) {
  return {
    ...(action === "add" && {
      selcode: formData.get("selcode"),
      app_user_id: appUserId,
    }),
    type: formData.get("type"),
    model: formData.get("model"),
    make: formData.get("make"),
    year: formData.get("year"),
    image: imageUrls,
    web_url: formData.get("web_url"),
    is_active: formData.get("is_active"),
  };
}

export function boardTechnicalData(formData, imageUrls, appUserId, action) {
  return {
    ...(action === "add" && {
      selcode: formData.get("selcode"),
      app_user_id: appUserId,
    }),
    year: formData.get("year"),
    make: formData.get("make"),
    model: formData.get("model"),
    width: formData.get("width"),
    length: formData.get("length"),
    volume: formData.get("volume"),
    tail: formData.get("tail"),
    weight: formData.get("weight"),
    technology: formData.get("technology"),
    fin_box: formData.get("fin_box"),
    fin_size: formData.get("fin_size"),
    sail_size: formData.get("sail_size"),
    back_strap: formData.get("back_strap"),
    front_strap: formData.get("front_strap"),
    shaper: formData.get("shaper"),
    programme: formData.get("programme"),
    serial_number: formData.get("serial_number"),
    image: imageUrls,
    web_url: formData.get("web_url"),
    is_active: formData.get("is_active"),
  };
}
export function boomTechnicalData(formData, imageUrls, appUserId, action) {
  return {
    ...(action === "add" && {
      selcode: formData.get("selcode"),
      app_user_id: appUserId,
    }),
    year: formData.get("year"),
    make: formData.get("make"),
    model: formData.get("model"),
    length: formData.get("length"),
    adj_length: formData.get("adj_length"),
    adj_type: formData.get("adj_type"),
    weight: formData.get("weight"),
    diameter: formData.get("diameter"),
    body: formData.get("body"),
    front_end: formData.get("front_end"),
    back_end: formData.get("back_end"),
    image: imageUrls,
    web_url: formData.get("web_url"),
    is_active: formData.get("is_active"),
  };
}

export function mastTechnicalData(formData, imageUrls, appUserId, action) {
  return {
    ...(action === "add" && {
      selcode: formData.get("selcode"),
      app_user_id: appUserId,
    }),
    year: formData.get("year"),
    make: formData.get("make"),
    model: formData.get("model"),
    type: formData.get("type"),
    length: formData.get("length"),
    weight: formData.get("weight"),
    imcs: formData.get("imcs"),
    carbon: formData.get("carbon"),
    image: imageUrls,
    web_url: formData.get("web_url"),
    is_active: formData.get("is_active"),
  };
}

export function sailTechnicalData(formData, imageUrls, appUserId, action) {
  return {
    ...(action === "add" && {
      selcode: formData.get("selcode"),
      app_user_id: appUserId,
    }),
    year: formData.get("year"),
    make: formData.get("make"),
    model: formData.get("model"),
    size: formData.get("size"),
    color: formData.get("color"),
    weight: formData.get("weight"),
    luff: formData.get("luff"),
    boom: formData.get("boom"),
    battens: formData.get("battens"),
    cams: formData.get("cams"),
    head: formData.get("head"),
    mast: formData.get("mast"),
    image: imageUrls,
    web_url: formData.get("web_url"),
    is_active: formData.get("is_active"),
  };
}

export function locationTechnicalData(formData, appUserId, action) {
  return {
    ...(action === "add" && {
      app_user_id: appUserId,
    }),
    spot: formData.get("spot"),
    sport: formData.get("sport"),
    map_location: formData.get("map_location"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    is_active: formData.get("is_active"),
  };
}

export function towTechnicalData(formData, appUserId, action) {
  return {
    ...(action === "add" && {
      app_user_id: appUserId,
    }),
    date: formData.get("date"),
    s_time: formData.get("s_time"),
    e_time: formData.get("e_time"),
    duration: formData.get("duration"),
    distance: formData.get("distance"),
    spot: formData.get("spot"),
    sport: formData.get("sport"),
    discipline: formData.get("discipline"),
    wind_direction: formData.get("wind_direction"),
    wind_strength: formData.get("wind_strength"),
    swell_size: formData.get("swell_size"),
    swell_direction: formData.get("swell_direction"),
    tide_height: formData.get("tide_height"),
    tide_direction: formData.get("tide_direction"),
    sail: formData.get("sail"),
    board: formData.get("board"),
    rating: formData.get("rating"),
    comments: formData.get("comments"),
  };
}
export function towRecData(formData, appUserId, action) {
  return {
    ...(action === "add" && {
      app_user_id: appUserId,
    }),
    date: formData.get("date"),
    activity: formData.get("sport"),
    distance: formData.get("distance"),
    duration: formData.get("duration"),
    location: formData.get("spot"),
    comments: formData.get("discipline"),
  };
}
