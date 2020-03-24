interface SelectOption {
  label: string
  value: string
}

const properties = {
  telephone: ['LocalBusiness', 'Hotel', 'TravelAgency'],
  priceRange: ['LocalBusiness', 'Hotel', 'TravelAgency'],
  address: ['LocalBusiness', 'Hotel', 'TravelAgency'],
  geoCoordinates: ['LocalBusiness', 'Hotel', 'TravelAgency'],
  openingHoursSpecification: ['LocalBusiness', 'Hotel', 'TravelAgency'],
  howTo: ['HowTo'],
  faqPage: ['FAQPage'],
  service: ['Service'],
  itemList: ['ItemList']
};

export const hasProperty = (type: string | SelectOption | undefined, property: keyof typeof properties) => {
  const validTypes = properties[property];
  if (!!type && validTypes) {
    const value = typeof type === 'string' ? type : type.value;
    return validTypes.includes(value);
  }
  return false;
};