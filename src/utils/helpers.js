export const PLACE_IDS = {
  sydney:    "ChIJN1t_tDeuEmsRUsoyG83frY4",
  london:    "ChIJdd4hrwug2EcRmSrV3Vo6llI",
  paris:     "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
  newyork:   "ChIJOwg_06VPwokRYv534QaPC8g",
  dubai:     "ChIJRcbZaklDXz4RYlEphFBu5r0",
  tokyo:     "ChIJ51cu8IcbXWARiRtXIothAS4",
  rome:      "ChIJu46S-ZZhLxMROG5lkwZ3D7k",
  barcelona: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
  bali:      "ChIJoQ8Q6NB1aRERei0znQ-NKHY",
};

export const getPlaceId = (query) => {
  if (!query) return PLACE_IDS.sydney;
  const key = query.toLowerCase().replace(/\s/g, "");
  return PLACE_IDS[key] || PLACE_IDS.sydney;
};

export const normalize = (item) => {
  if (!item) return { id: "", name: "", city: "", price: "", rating: "", image: "", description: "" };
  return {
    id: String(item.id || item.listing?.id || item.demandStayListing?.id || ""),
    name: item.name || item.listing?.name || item.demandStayListing?.name || "Unnamed Property",
    city: item.city || item.listing?.city || item.listing?.publicAddress || "",
    price: item.price || item.pricingQuote?.rate?.amount || item.listing?.price || "",
    rating: item.star_rating || item.avg_rating || item.listing?.avgRatingLocalized || "",
    image:
      item.picture?.thumbnail ||
      item.xl_picture_url ||
      item.listing?.picture?.large ||
      item.contextualPictures?.[0]?.picture ||
      "https://placehold.co/300x200?text=No+Image",
    description: item.description || item.summary || item.listing?.description || item.listing?.summary || "",
  };
};
