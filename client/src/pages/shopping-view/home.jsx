
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import { categories, getAllBrands } from "@/config/category-brand-config";
import VideoSection from "../../components/admin-view/VideoSection";

// Updated categories with expanded list
const categoriesWithImages = [
  {
    id: "men",
    label: "Men",
    image: <img 
      src="/images/29482642-three-men-fashion-metraseksualy-shop-shopping-walk.jpg"
      alt="Men's Fashion"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  },
  {
    id: "women",
    label: "Women",
    image: <img 
      src="/images/happy-young-group-women-shopping-big-mall-bags-78254692.webp"
      alt="Women's Fashion"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  },
  {
    id: "kids",
    label: "Kids",
    image: <img 
      src="/images/360_F_209237853_PkcPTlx2zh7HIx7xFS0pe7xNWV02fP3v.jpg"
      alt="Kids' Fashion"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  },
  {
    id: "accessories",
    label: "Accessories",
    image: <img 
      src="/images/fashion-women-stylish-accessories-outfit-600nw-1532053424.webp"
      alt="Accessories"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  },
  {
    id: "footwear",
    label: "Footwear",
    image: <img 
      src="/images/download (1).jpg"
      alt="Footwear"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  },
  {
    id: "electronics",
    label: "Electronics",
    image: <img 
      src="/images/default-electronics.png"
      alt="Electronics"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  },
  {
    id: "home",
    label: "Home & Garden",
    image: <img 
      src="/images/default-home.png"
      alt="Home & Garden"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  },
  {
    id: "sports",
    label: "Sports & Outdoors",
    image: <img 
      src="/images/default-sports.png"
      alt="Sports & Outdoors"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  },
  {
    id: "books",
    label: "Books & Education",
    image: <img 
      src="/images/default-books.png"
      alt="Books & Education"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  },
  {
    id: "beauty",
    label: "Beauty & Personal Care",
    image: <img 
      src="/images/default-beauty.png"
      alt="Beauty & Personal Care"
      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  }
];

// Updated brands with expanded list
const brandsWithLogos = [
  {
    id: "nike",
    label: "Nike",
    logo: <img 
      src="/images/download.jpg" 
      alt="Nike logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "adidas",
    label: "Adidas",
    logo: <img 
      src="/images/download (3).png" 
      alt="Adidas logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "puma",
    label: "Puma",
    logo: <img 
      src="/images/puma-logo-and-art-free-vector.jpg" 
      alt="Puma logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "levi",
    label: "Levi's",
    logo: <img 
      src="/images/download (2).png" 
      alt="Levi's logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "zara",
    label: "Zara",
    logo: <img 
      src="/images/download (4).png" 
      alt="Zara logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "h&m",
    label: "H&M",
    logo: <img 
      src="/images/download.png" 
      alt="H&M logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "tommy",
    label: "Tommy Hilfiger",
    logo: <img 
      src="/images/default-tommy.png" 
      alt="Tommy Hilfiger logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "calvin",
    label: "Calvin Klein",
    logo: <img 
      src="/images/default-calvin.png" 
      alt="Calvin Klein logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "forever21",
    label: "Forever 21",
    logo: <img 
      src="/images/default-forever21.png" 
      alt="Forever 21 logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "mango",
    label: "Mango",
    logo: <img 
      src="/images/default-mango.png" 
      alt="Mango logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "apple",
    label: "Apple",
    logo: <img 
      src="/images/default-apple.png" 
      alt="Apple logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "samsung",
    label: "Samsung",
    logo: <img 
      src="/images/default-samsung.png" 
      alt="Samsung logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "sony",
    label: "Sony",
    logo: <img 
      src="/images/default-sony.png" 
      alt="Sony logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "ikea",
    label: "IKEA",
    logo: <img 
      src="/images/default-ikea.png" 
      alt="IKEA logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "fossil",
    label: "Fossil",
    logo: <img 
      src="/images/default-fossil.png" 
      alt="Fossil logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "rayban",
    label: "Ray-Ban",
    logo: <img 
      src="/images/default-rayban.png" 
      alt="Ray-Ban logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "loreal",
    label: "L'Oréal",
    logo: <img 
      src="/images/default-loreal.png" 
      alt="L'Oréal logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "reebok",
    label: "Reebok",
    logo: <img 
      src="/images/default-reebok.png" 
      alt="Reebok logo"
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "ashley",
    label: "Ashley Furniture",
    logo: <img 
      src="/images/default-ashley.png" 
      alt="Ashley Furniture logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "cambridge",
    label: "Cambridge",
    logo: <img 
      src="/images/default-cambridge.png" 
      alt="Cambridge logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "carter",
    label: "Carter's",
    logo: <img 
      src="/images/default-carter.png" 
      alt="Carter's logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "casio",
    label: "Casio",
    logo: <img 
      src="/images/default-casio.png" 
      alt="Casio logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "coach",
    label: "Coach",
    logo: <img 
      src="/images/default-coach.png" 
      alt="Coach logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "converse",
    label: "Converse",
    logo: <img 
      src="/images/default-converse.png" 
      alt="Converse logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "crocs",
    label: "Crocs",
    logo: <img 
      src="/images/default-crocs.png" 
      alt="Crocs logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "dell",
    label: "Dell",
    logo: <img 
      src="/images/default-dell.png" 
      alt="Dell logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "disney",
    label: "Disney",
    logo: <img 
      src="/images/default-disney.png" 
      alt="Disney logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "gap",
    label: "Gap Kids",
    logo: <img 
      src="/images/default-gap.png" 
      alt="Gap Kids logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "harper",
    label: "HarperCollins",
    logo: <img 
      src="/images/default-harper.png" 
      alt="HarperCollins logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "homeDepot",
    label: "Home Depot",
    logo: <img 
      src="/images/default-homeDepot.png" 
      alt="Home Depot logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "hp",
    label: "HP",
    logo: <img 
      src="/images/default-hp.png" 
      alt="HP logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "lakme",
    label: "Lakmé",
    logo: <img 
      src="/images/default-lakme.png" 
      alt="Lakmé logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "lenovo",
    label: "Lenovo",
    logo: <img 
      src="/images/default-lenovo.png" 
      alt="Lenovo logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "lg",
    label: "LG",
    logo: <img 
      src="/images/default-lg.png" 
      alt="LG logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "mac",
    label: "MAC",
    logo: <img 
      src="/images/default-mac.png" 
      alt="MAC logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "maybelline",
    label: "Maybelline",
    logo: <img 
      src="/images/default-maybelline.png" 
      alt="Maybelline logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "mcgraw",
    label: "McGraw Hill",
    logo: <img 
      src="/images/default-mcgraw.png" 
      alt="McGraw Hill logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "michael",
    label: "Michael Kors",
    logo: <img 
      src="/images/default-michael.png" 
      alt="Michael Kors logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "nivea",
    label: "Nivea",
    logo: <img 
      src="/images/default-nivea.png" 
      alt="Nivea logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "nykaa",
    label: "Nykaa",
    logo: <img 
      src="/images/default-nykaa.png" 
      alt="Nykaa logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "oakley",
    label: "Oakley",
    logo: <img 
      src="/images/default-oakley.png" 
      alt="Oakley logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "olay",
    label: "Olay",
    logo: <img 
      src="/images/default-olay.png" 
      alt="Olay logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "only",
    label: "Only",
    logo: <img 
      src="/images/default-only.png" 
      alt="Only logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "oxford",
    label: "Oxford",
    logo: <img 
      src="/images/default-oxford.png" 
      alt="Oxford logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "pearson",
    label: "Pearson",
    logo: <img 
      src="/images/default-pearson.png" 
      alt="Pearson logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "penguin",
    label: "Penguin",
    logo: <img 
      src="/images/default-penguin.png" 
      alt="Penguin logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "pottery",
    label: "Pottery Barn",
    logo: <img 
      src="/images/default-pottery.png" 
      alt="Pottery Barn logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "random",
    label: "Random House",
    logo: <img 
      src="/images/default-random.png" 
      alt="Random House logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "revlon",
    label: "Revlon",
    logo: <img 
      src="/images/default-revlon.png" 
      alt="Revlon logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "sketchers",
    label: "Sketchers",
    logo: <img 
      src="/images/default-sketchers.png" 
      alt="Sketchers logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "simon",
    label: "Simon & Schuster",
    logo: <img 
      src="/images/default-simon.png" 
      alt="Simon & Schuster logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "spalding",
    label: "Spalding",
    logo: <img 
      src="/images/default-spalding.png" 
      alt="Spalding logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "titan",
    label: "Titan",
    logo: <img 
      src="/images/default-titan.png" 
      alt="Titan logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "under",
    label: "Under Armour",
    logo: <img 
      src="/images/default-under.png" 
      alt="Under Armour logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "vans",
    label: "Vans",
    logo: <img 
      src="/images/default-vans.png" 
      alt="Vans logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "vero",
    label: "Vero Moda",
    logo: <img 
      src="/images/default-veromoda.png" 
      alt="Vero Moda logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "wayfair",
    label: "Wayfair",
    logo: <img 
      src="/images/default-wayfair.png" 
      alt="Wayfair logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "west",
    label: "West Elm",
    logo: <img 
      src="/images/default-west.png" 
      alt="West Elm logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "wilson",
    label: "Wilson",
    logo: <img 
      src="/images/default-wilson.png" 
      alt="Wilson logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "xiaomi",
    label: "Xiaomi",
    logo: <img 
      src="/images/default-xiaomi.png" 
      alt="Xiaomi logo" 
      className="w-24 h-12 object-contain"
    />
  },
  {
    id: "lowe's",
    label: "Lowe's",
    logo: <img 
      src="/images/default-lowe.png" 
      alt="Lowe's logo" 
      className="w-24 h-12 object-contain"
    />
  },
  
{
  id: "guess",
  label: "Guess",
  logo: (
    <img 
      src="/images/default-guess.png" 
      alt="Guess logo" 
      className="w-24 h-12 object-contain"
    />
  )
},


{
  id: "urbanladder",
  label: "Urban Ladder",
  logo: (
    <img 
      src="/images/default-urbanladder.png" 
      alt="Urban Ladder logo" 
      className="w-24 h-12 object-contain"
    />
  )
},
  {
    id: "yonex",
    label: "Yonex",
    logo: <img 
      src="/images/default-yonex.png" 
      alt="Yonex logo" 
      className="w-24 h-12 object-contain"
    />
  },
];


function ShoppingHome() {
  const [uniqueKeys, setUniqueKeys] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const [hoveredBrandCategories, setHoveredBrandCategories] = useState({});
  
  const categoryScrollRef = useRef(null);
  const brandScrollRefs = useRef({});
  const brandScrollTimers = useRef({});

  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList, isLoading, error } = useSelector((state) => state.commonFeature); // Adjusted to include loading and error
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Create duplicated arrays for infinite scroll effect
  const duplicatedCategories = [...categoriesWithImages, ...categoriesWithImages];

  // Function to get brands by category
  const getBrandsByCategory = (categoryId) => {
    return brandsWithLogos.filter((brand) =>
      categories
        .find((cat) => cat.id === categoryId)
        ?.label.toLowerCase()
        .includes(brand.label.toLowerCase()) || 
      (categoryId === "men" && ["Nike", "Adidas", "Puma", "Levi's", "Zara", "H&M", "Tommy Hilfiger", "Calvin Klein"].includes(brand.label)) ||
      (categoryId === "women" && ["Zara", "H&M", "Nike", "Adidas", "Forever 21", "Mango", "Vero Moda", "Only"].includes(brand.label)) ||
      (categoryId === "kids" && ["Nike", "Adidas", "Puma", "H&M", "Zara", "Carter's", "Gap Kids", "Disney"].includes(brand.label)) ||
      (categoryId === "accessories" && ["Fossil", "Titan", "Casio", "Ray-Ban", "Oakley", "Michael Kors", "Coach", "Guess"].includes(brand.label)) ||
      (categoryId === "footwear" && ["Nike", "Adidas", "Puma", "Reebok", "Vans", "Converse", "Sketchers", "Crocs"].includes(brand.label)) ||
      (categoryId === "electronics" && ["Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Lenovo", "Xiaomi"].includes(brand.label)) ||
      (categoryId === "home" && ["IKEA", "Wayfair", "Ashley Furniture", "West Elm", "Pottery Barn", "Home Depot", "Lowe's", "Urban Ladder"].includes(brand.label)) ||
      (categoryId === "sports" && ["Nike", "Adidas", "Puma", "Under Armour", "Reebok", "Wilson", "Spalding", "Yonex"].includes(brand.label)) ||
      (categoryId === "books" && ["Penguin", "HarperCollins", "Simon & Schuster", "Random House", "Oxford", "Cambridge", "McGraw Hill", "Pearson"].includes(brand.label)) ||
      (categoryId === "beauty" && ["L'Oréal", "Maybelline", "Revlon", "MAC", "Nykaa", "Lakmé", "Olay", "Nivea"].includes(brand.label))
    );
  };

  // function handleNavigateToListingPage(getCurrentItem, section) {
  //   sessionStorage.removeItem("filters");
  //   const currentFilter = { [section]: [getCurrentItem.id] };
  //   sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  //   window.scrollTo(0, 0);
  //   navigate(`/shop/listing`);
  // }
  function handleNavigateToListingPage(getCurrentItem, section, categoryId) {
  sessionStorage.removeItem("filters");
  let currentFilter = {};

  if (section === "brand") {
    // Use the provided categoryId to set the category filter
    currentFilter = {
      category: [categoryId], // Checkbox the category where the brand was clicked (e.g., "women" for Nike under women)
      brand: [getCurrentItem.id], // Checkbox the brand (e.g., "nike")
    };
  } else if (section === "category") {
    currentFilter = { category: [getCurrentItem.id] };
  }

  sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  window.scrollTo(0, 0);
  navigate(`/shop/listing`);
}

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Product is added to cart" });
        }
      });
  }

  const handleBrandCategoryHover = (categoryId, isHovered) => {
    setHoveredBrandCategories((prev) => ({ ...prev, [categoryId]: isHovered }));
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Infinite scroll effect for categories
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredCategory && categoryScrollRef.current) {
        const cardWidth = 256; // 192px (w-48) + 32px (gap-8)
        const originalArrayWidth = categoriesWithImages.length * cardWidth;
        categoryScrollRef.current.scrollLeft += 1;
        if (categoryScrollRef.current.scrollLeft >= originalArrayWidth) {
          categoryScrollRef.current.scrollLeft = 0;
        }
      }
    }, 10);
    return () => clearInterval(timer);
  }, [isHoveredCategory]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    setUniqueKeys([Date.now(), Date.now() + 1]);
  }, []);

  // Function to render brand band for a category
  // const renderBrandBand = (category) => {
  //   const brands = getBrandsByCategory(category.id);
  //   if (brands.length === 0) return null;

  //   return (
  //     <div key={category.id} className="mb-12">
  //       <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
  //         {category.label} 
  //       </h3>
  //       <div className="relative px-12">
  //         <div
  //           ref={(el) => (brandScrollRefs.current[category.id] = el)}
  //           className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar px-4"
  //         >
  //           {brands.map((brandItem, index) => (
  //             <Card
  //               key={`${brandItem.id}-${index}`}
  //               onClick={() => handleNavigateToListingPage(brandItem, "brand")}
  //               className="cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0 w-32"
  //             >
  //               <CardContent className="flex flex-col items-center justify-center p-4">
  //                 {brandItem.logo}
  //                 <span className="font-bold mt-2 text-center text-sm">{brandItem.label}</span>
  //               </CardContent>
  //             </Card>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };


//   const renderBrandBand = (category) => {
//   const brands = getBrandsByCategory(category.id);
//   if (brands.length === 0) return null;

//   return (
//     <div key={category.id} className="mb-12">
//       <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
//         {category.label} 
//       </h3>
//       <div className="relative px-12">
//         <div
//           ref={(el) => (brandScrollRefs.current[category.id] = el)}
//           className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar px-4"
//         >
//           {brands.map((brandItem, index) => (
//             <Card
//               key={`${brandItem.id}-${index}`}
//               onClick={() => handleNavigateToListingPage(brandItem, "brand", category.id)} // Pass category.id here
//               className="cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0 w-32"
//             >
//               <CardContent className="flex flex-col items-center justify-center p-4">
//                 {brandItem.logo}
//                 <span className="font-bold mt-2 text-center text-sm">{brandItem.label}</span>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

const renderBrandBand = (category) => {
  const brands = getBrandsByCategory(category.id);
  if (brands.length === 0) return null;

  return (
    <div key={category.id} className="mb-12 pt-8" style={{ paddingTop: "1rem" }}>
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {category.label}
      </h3>
      <div className="relative px-12">
        <div
          ref={(el) => (brandScrollRefs.current[category.id] = el)}
          className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar px-4"
          style={{ paddingTop: "1rem" }}
        >
          {brands.map((brandItem, index) => (
            <div
              key={`${brandItem.id}-${index}`}
              onClick={() => handleNavigateToListingPage(brandItem, "brand", category.id)}
              style={{
                cursor: "pointer",
                width: "8rem",
                transition: "all 0.3s ease",
                position: "relative",
                zIndex: 10,
                border: "1px solid #e5e7eb", // Light gray border for visibility
                borderRadius: "0.5rem", // Slightly curvy edges (8px)
                backgroundColor: "#ffffff", // White background to contrast border
                "&:hover": {
                  transform: "translateY(-0.5rem)",
                  boxShadow: "0 4px 15px rgba(173, 216, 230, 0.6), 0 6px 20px rgba(135, 206, 235, 0.4)",
                },
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-0.5rem)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(173, 216, 230, 0.6), 0 6px 20px rgba(135, 206, 235, 0.4)";
                e.currentTarget.style.zIndex = 20;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.zIndex = 10;
              }}
            >
              <CardContent className="flex flex-col items-center justify-center p-4">
                {brandItem.logo}
                <span className="font-bold mt-2 text-center text-sm">{brandItem.label}</span>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

  // Automatic slideshow effect
  useEffect(() => {
    if (featureImageList && featureImageList.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
      }, 4000); // Change image every 4 seconds

      // Cleanup interval on unmount or when featureImageList changes
      return () => clearInterval(interval);
    }
  }, [featureImageList]);

  return (
    <div className="mt-20 flex flex-col min-h-screen">
      {/* Hero Slider Section */}
      <div className="relative w-full h-auto min-h-[250px] sm:min-h-[350px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-[500px] text-gray-500">Loading...</div>
        ) : error ? (
          <div className="flex justify-center items-center h-[500px] text-red-500">Error: {error}</div>
        ) : featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((slide, index) => (
            <img
              src={slide?.image}
              key={index}
              className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000`}
              alt={`Slide ${index + 1}`}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-[500px] text-gray-500">No images available</div>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + (featureImageList?.length || 1)) % (featureImageList?.length || 1))}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 w-8 h-8 sm:w-10 sm:h-10"
          disabled={!featureImageList || featureImageList.length === 0}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % (featureImageList?.length || 1))}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 w-8 h-8 sm:w-10 sm:h-10"
          disabled={!featureImageList || featureImageList.length === 0}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* 1st video section */}
      <div>
        <VideoSection uniqueKey="section-1" numAds={1} filterByCategory={["men", "women", "kids", "footwear"]} />
      </div>

      {/* Categories Section with Infinite Horizontal Scroll */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="relative">
            <div 
              ref={categoryScrollRef}
              className="flex gap-8 overflow-x-hidden px-12"
              onMouseEnter={() => setIsHoveredCategory(true)}
              onMouseLeave={() => setIsHoveredCategory(false)}
              style={{ scrollBehavior: 'auto' }}
            >
              {duplicatedCategories.map((categoryItem, index) => (
                <Card
                  key={`${categoryItem.id}-${index}`}
                  onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                  className="cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0 w-48"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    {categoryItem.image}
                    <span className="font-bold mt-2 text-center">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section with Category-wise Infinite Horizontal Scroll */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Brand</h2>
          
          {/* Men Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "men"))}
          
          {/* Women Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "women"))}
          
          {/* Kids Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "kids"))}
          
          {/* Accessories Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "accessories"))}
          
          {/* Footwear Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "footwear"))}
        </div>
      </section>
          
      {/* 2nd video section - Before Electronics */}
      <div className="my-12">
        <VideoSection uniqueKey="section-2" numAds={1} filterByCategory={["home", "electronics", "sports", "books"]} />
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Electronics Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "electronics"))}
          
          {/* Home & Garden Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "home"))}
          
          {/* Sports & Outdoors Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "sports"))}
          
          {/* Books & Education Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "books"))}
          
          {/* Beauty & Personal Care Brands */}
          {renderBrandBand(categories.find((cat) => cat.id === "beauty"))}
        </div>
      </section>

      {/* 3rd video section */}
      <div>
        <VideoSection uniqueKey="section-3" numAds={1} filterByCategory={["beauty", "accessories"]} />
      </div>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;