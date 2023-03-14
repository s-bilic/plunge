const storesData = [
  {
    title: {
      text: "Food",
    },
  },
  {
    title: {
      text: "Games",
    },
  },
];

const storeTypes = [
  "Event",
  "Games",
  "Specialty",
  "Grocery",
  "Convenience",
  "Vegan",
  "Technology",
  "Bakery",
  "Cosmetics",
  "Fashion",
  "Restaurant",
  "Art",
  "Bar",
  "Other",
];

const productsData = [
  {
    name: "Flat White",
    price: 0.5,
    icon: "coffee-cup",
  },
  {
    name: "Skyrim",
    price: 2,
    icon: "funnel",
  },
];

const actionCardsData = [
  {
    title: {
      text: "Store-checkout",
    },
    content: {
      text: "Retail solution for easy store payments",
    },
  },
  {
    title: {
      text: "Self-checkout",
    },
    content: {
      text: "Retail solution for self payments within a store",
    },
  },
  {
    title: {
      text: "Online-checkout",
    },
    content: {
      text: "The option to turn your store into a webshop",
    },
  },
];

export { storesData, storeTypes, productsData, actionCardsData };
