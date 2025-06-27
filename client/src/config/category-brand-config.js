// src/config/category-brand-config.js
// Category-Brand mapping configuration
export const categoryBrandMapping = {
  men: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
    { id: "tommy", label: "Tommy Hilfiger" },
    { id: "calvin", label: "Calvin Klein" },
  ],
  women: [
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "forever21", label: "Forever 21" },
    { id: "mango", label: "Mango" },
    { id: "vero", label: "Vero Moda" },
    { id: "only", label: "Only" },
  ],
  kids: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "h&m", label: "H&M" },
    { id: "zara", label: "Zara" },
    { id: "carter", label: "Carter's" },
    { id: "gap", label: "Gap Kids" },
    { id: "disney", label: "Disney" },
  ],
  accessories: [
    { id: "fossil", label: "Fossil" },
    { id: "titan", label: "Titan" },
    { id: "casio", label: "Casio" },
    { id: "rayban", label: "Ray-Ban" },
    { id: "oakley", label: "Oakley" },
    { id: "michael", label: "Michael Kors" },
    { id: "coach", label: "Coach" },
    { id: "generic", label: "Generic" },
  ],
  footwear: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "reebok", label: "Reebok" },
    { id: "vans", label: "Vans" },
    { id: "converse", label: "Converse" },
    { id: "sketchers", label: "Sketchers" },
    { id: "crocs", label: "Crocs" },
  ],
  electronics: [
    { id: "apple", label: "Apple" },
    { id: "samsung", label: "Samsung" },
    { id: "sony", label: "Sony" },
    { id: "lg", label: "LG" },
    { id: "dell", label: "Dell" },
    { id: "hp", label: "HP" },
    { id: "lenovo", label: "Lenovo" },
    { id: "xiaomi", label: "Xiaomi" },
  ],
  home: [
    { id: "ikea", label: "IKEA" },
    { id: "wayfair", label: "Wayfair" },
    { id: "ashley", label: "Ashley Furniture" },
    { id: "west", label: "West Elm" },
    { id: "pottery", label: "Pottery Barn" },
    { id: "homeDepot", label: "Home Depot" },
    { id: "lowes", label: "Lowe's" },
    { id: "generic", label: "Generic" },
  ],
  sports: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "under", label: "Under Armour" },
    { id: "reebok", label: "Reebok" },
    { id: "wilson", label: "Wilson" },
    { id: "spalding", label: "Spalding" },
    { id: "yonex", label: "Yonex" },
  ],
  books: [
    { id: "penguin", label: "Penguin" },
    { id: "harper", label: "HarperCollins" },
    { id: "simon", label: "Simon & Schuster" },
    { id: "random", label: "Random House" },
    { id: "oxford", label: "Oxford" },
    { id: "cambridge", label: "Cambridge" },
    { id: "mcgraw", label: "McGraw Hill" },
    { id: "pearson", label: "Pearson" },
  ],
  beauty: [
    { id: "loreal", label: "L'Oréal" },
    { id: "maybelline", label: "Maybelline" },
    { id: "revlon", label: "Revlon" },
    { id: "mac", label: "MAC" },
    { id: "nykaa", label: "Nykaa" },
    { id: "lakme", label: "Lakmé" },
    { id: "olay", label: "Olay" },
    { id: "nivea", label: "Nivea" },
  ],
};

// Categories list
export const categories = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "accessories", label: "Accessories" },
  { id: "footwear", label: "Footwear" },
  { id: "electronics", label: "Electronics" },
  { id: "home", label: "Home & Garden" },
  { id: "sports", label: "Sports & Outdoors" },
  { id: "books", label: "Books & Education" },
  { id: "beauty", label: "Beauty & Personal Care" },
];

// Get brands by category
export const getBrandsByCategory = (categoryId) => {
  if (!categoryId || !categoryBrandMapping[categoryId]) {
    return [];
  }
  return categoryBrandMapping[categoryId];
};

// Get all unique brands (for general use)
export const getAllBrands = () => {
  const allBrands = [];
  const brandIds = new Set();
  
  Object.values(categoryBrandMapping).forEach(brands => {
    brands.forEach(brand => {
      if (!brandIds.has(brand.id)) {
        brandIds.add(brand.id);
        allBrands.push(brand);
      }
    });
  });
  
  return allBrands.sort((a, b) => a.label.localeCompare(b.label));
};

// Map category ID to label
export const categoryOptionsMap = categories.reduce((acc, category) => {
  acc[category.id] = category.label;
  return acc;
}, {});

// Map brand ID to label (from all brands)
export const brandOptionsMap = getAllBrands().reduce((acc, brand) => {
  acc[brand.id] = brand.label;
  return acc;
}, {});

// Filter options for shopping view
export const filterOptions = {
  category: categories,
  brand: getAllBrands(),
};

// Sort options
export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

// Shopping view header menu items
export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shop/listing",
  },
  {
    id: "home",
    label: "Home & Garden",
    path: "/shop/listing",
  },
  {
    id: "sports",
    label: "Sports",
    path: "/shop/listing",
  },
  {
    id: "books",
    label: "Books",
    path: "/shop/listing",
  },
  {
    id: "beauty",
    label: "Beauty",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

// Address form controls
export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

// Form controls for registration and login (keeping existing)
export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];



