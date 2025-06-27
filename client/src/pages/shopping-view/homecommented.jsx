// import { Button } from "@/components/ui/button";
// import bannerOne from "../../assets/banner-1.webp";
// import bannerTwo from "../../assets/banner-2.webp";
// import bannerThree from "../../assets/banner-3.webp";
// import {
//   Airplay,
//   BabyIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   CloudLightning,
//   Heater,
//   Images,
//   Shirt,
//   ShirtIcon,
//   ShoppingBasket,
//   UmbrellaIcon,
//   WashingMachine,
//   WatchIcon,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { getFeatureImages } from "@/store/common-slice";

// const categoriesWithIcon = [
//   { id: "men", label: "Men", icon: ShirtIcon },
//   { id: "women", label: "Women", icon: CloudLightning },
//   { id: "kids", label: "Kids", icon: BabyIcon },
//   { id: "accessories", label: "Accessories", icon: WatchIcon },
//   { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
// ];

// const brandsWithIcon = [
//   { id: "nike", label: "Nike", icon: Shirt },
//   { id: "adidas", label: "Adidas", icon: WashingMachine },
//   { id: "puma", label: "Puma", icon: ShoppingBasket },
//   { id: "levi", label: "Levi's", icon: Airplay },
//   { id: "zara", label: "Zara", icon: Images },
//   { id: "h&m", label: "H&M", icon: Heater },
// ];


// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const { featureImageList } = useSelector((state) => state.commonFeature);

//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters");
//     const currentFilter = {
//       [section]: [getCurrentItem.id],
//     };

//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     navigate(`/shop/listing`);
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   function handleAddtoCart(getCurrentProductId) {
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: "Product is added to cart",
//         });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [featureImageList]);

//   useEffect(() => {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: {},
//         sortParams: "price-lowtohigh",
//       })
//     );
//   }, [dispatch]);

//   console.log(productList, "productList");

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="relative w-full h-[600px] overflow-hidden">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((slide, index) => (
//               <img
//                 src={slide?.image}
//                 key={index}
//                 className={`${
//                   index === currentSlide ? "opacity-100" : "opacity-0"
//                 } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
//               />
//             ))
//           : null}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) =>
//                 (prevSlide - 1 + featureImageList.length) %
//                 featureImageList.length
//             )
//           }
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronLeftIcon className="w-4 h-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) => (prevSlide + 1) % featureImageList.length
//             )
//           }
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
//         >
//           <ChevronRightIcon className="w-4 h-4" />
//         </Button>
//       </div>
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Shop by category
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {categoriesWithIcon.map((categoryItem) => (
//               <Card
//                 onClick={() =>
//                   handleNavigateToListingPage(categoryItem, "category")
//                 }
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{categoryItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {brandsWithIcon.map((brandItem) => (
//               <Card
//                 onClick={() => handleNavigateToListingPage(brandItem, "brand")}
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{brandItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Feature Products
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList && productList.length > 0
//               ? productList.map((productItem) => (
//                   <ShoppingProductTile
//                     handleGetProductDetails={handleGetProductDetails}
//                     product={productItem}
//                     handleAddtoCart={handleAddtoCart}
//                   />
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// }

// export default ShoppingHome;


// import { Button } from "@/components/ui/button";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { getFeatureImages } from "@/store/common-slice";
// import { categories, getAllBrands } from "@/config/category-brand-config";

// import VideoSection from "../../components/admin-view/VideoSection";

// // Updated categories with expanded list
// const categoriesWithImages = [
//   {
//     id: "men",
//     label: "Men",
//     image: <img 
//       src="/images/29482642-three-men-fashion-metraseksualy-shop-shopping-walk.jpg"
//       alt="Men's Fashion"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "women",
//     label: "Women",
//     image: <img 
//       src="/images/happy-young-group-women-shopping-big-mall-bags-78254692.webp"
//       alt="Women's Fashion"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "kids",
//     label: "Kids",
//     image: <img 
//       src="/images/360_F_209237853_PkcPTlx2zh7HIx7xFS0pe7xNWV02fP3v.jpg"
//       alt="Kids' Fashion"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "accessories",
//     label: "Accessories",
//     image: <img 
//       src="/images/fashion-women-stylish-accessories-outfit-600nw-1532053424.webp"
//       alt="Accessories"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "footwear",
//     label: "Footwear",
//     image: <img 
//       src="/images/download (1).jpg"
//       alt="Footwear"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "electronics",
//     label: "Electronics",
//     image: <img 
//       src="/images/default-electronics.jpg"
//       alt="Electronics"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "home",
//     label: "Home & Garden",
//     image: <img 
//       src="/images/default-home-garden.jpg"
//       alt="Home & Garden"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "sports",
//     label: "Sports & Outdoors",
//     image: <img 
//       src="/images/default-sports.jpg"
//       alt="Sports & Outdoors"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "books",
//     label: "Books & Education",
//     image: <img 
//       src="/images/default-books.jpg"
//       alt="Books & Education"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "beauty",
//     label: "Beauty & Personal Care",
//     image: <img 
//       src="/images/default-beauty.jpg"
//       alt="Beauty & Personal Care"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   }
// ];

// // Updated brands with expanded list
// const brandsWithLogos = [
//   {
//     id: "nike",
//     label: "Nike",
//     logo: <img 
//       src="/images/download.jpg" 
//       alt="Nike logo" 
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "adidas",
//     label: "Adidas",
//     logo: <img 
//       src="/images/download (3).png" 
//       alt="Adidas logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "puma",
//     label: "Puma",
//     logo: <img 
//       src="/images/puma-logo-and-art-free-vector.jpg" 
//       alt="Puma logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "levi",
//     label: "Levi's",
//     logo: <img 
//       src="/images/download (2).png" 
//       alt="Levi's logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "zara",
//     label: "Zara",
//     logo: <img 
//       src="/images/download (4).png" 
//       alt="Zara logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "h&m",
//     label: "H&M",
//     logo: <img 
//       src="/images/download.png" 
//       alt="H&M logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "tommy",
//     label: "Tommy Hilfiger",
//     logo: <img 
//       src="/images/default-tommy.jpg" 
//       alt="Tommy Hilfiger logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "calvin",
//     label: "Calvin Klein",
//     logo: <img 
//       src="/images/default-calvin.jpg" 
//       alt="Calvin Klein logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "forever21",
//     label: "Forever 21",
//     logo: <img 
//       src="/images/default-forever21.jpg" 
//       alt="Forever 21 logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "mango",
//     label: "Mango",
//     logo: <img 
//       src="/images/default-mango.jpg" 
//       alt="Mango logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "apple",
//     label: "Apple",
//     logo: <img 
//       src="/images/default-apple.jpg" 
//       alt="Apple logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "samsung",
//     label: "Samsung",
//     logo: <img 
//       src="/images/default-samsung.jpg" 
//       alt="Samsung logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "sony",
//     label: "Sony",
//     logo: <img 
//       src="/images/default-sony.jpg" 
//       alt="Sony logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "ikea",
//     label: "IKEA",
//     logo: <img 
//       src="/images/default-ikea.jpg" 
//       alt="IKEA logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "fossil",
//     label: "Fossil",
//     logo: <img 
//       src="/images/default-fossil.jpg" 
//       alt="Fossil logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "rayban",
//     label: "Ray-Ban",
//     logo: <img 
//       src="/images/default-rayban.jpg" 
//       alt="Ray-Ban logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "loreal",
//     label: "L'Oréal",
//     logo: <img 
//       src="/images/default-loreal.jpg" 
//       alt="L'Oréal logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "reebok",
//     label: "Reebok",
//     logo: <img 
//       src="/images/default-reebok.jpg" 
//       alt="Reebok logo"
//       className="w-24 h-12 object-contain"
//     />
//   }
// ];

// function ShoppingHome() {
//   const [uniqueKeys, setUniqueKeys] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);
//   const [brandScrollPosition, setBrandScrollPosition] = useState(0);
//   const [isDraggingCategory, setIsDraggingCategory] = useState(false);
//   const [isDraggingBrand, setIsDraggingBrand] = useState(false);
//   const [startXCategory, setStartXCategory] = useState(0);
//   const [startXBrand, setStartXBrand] = useState(0);
//   const [scrollLeftCategory, setScrollLeftCategory] = useState(0);
//   const [scrollLeftBrand, setScrollLeftBrand] = useState(0);
  
//   const categoryScrollRef = useRef(null);
//   const brandScrollRef = useRef(null);
  
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const { featureImageList } = useSelector((state) => state.commonFeature);
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters");
//     const currentFilter = {
//       [section]: [getCurrentItem.id],
//     };
//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     window.scrollTo(0, 0);
//     navigate(`/shop/listing`);
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   function handleAddtoCart(getCurrentProductId) {
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: "Product is added to cart",
//         });
//       }
//     });
//   }

//   // Drag and Animation functions for categories
//   const handleMouseDownCategory = (e) => {
//     setIsDraggingCategory(true);
//     setStartXCategory(e.pageX - categoryScrollRef.current.offsetLeft);
//     setScrollLeftCategory(categoryScrollRef.current.scrollLeft);
//   };

//   const handleMouseMoveCategory = (e) => {
//     if (!isDraggingCategory) return;
//     e.preventDefault();
//     const x = e.pageX - categoryScrollRef.current.offsetLeft;
//     const walk = (x - startXCategory) * 1.5; // Adjust scroll speed
//     categoryScrollRef.current.scrollLeft = scrollLeftCategory - walk;
//   };

//   const handleMouseUpCategory = () => {
//     setIsDraggingCategory(false);
//   };

//   const handleMouseLeaveCategory = () => {
//     setIsDraggingCategory(false);
//   };

//   // Drag and Animation functions for brands
//   const handleMouseDownBrand = (e) => {
//     setIsDraggingBrand(true);
//     setStartXBrand(e.pageX - brandScrollRef.current.offsetLeft);
//     setScrollLeftBrand(brandScrollRef.current.scrollLeft);
//   };

//   const handleMouseMoveBrand = (e) => {
//     if (!isDraggingBrand) return;
//     e.preventDefault();
//     const x = e.pageX - brandScrollRef.current.offsetLeft;
//     const walk = (x - startXBrand) * 1.5; // Adjust scroll speed
//     brandScrollRef.current.scrollLeft = scrollLeftBrand - walk;
//   };

//   const handleMouseUpBrand = () => {
//     setIsDraggingBrand(false);
//   };

//   const handleMouseLeaveBrand = () => {
//     setIsDraggingBrand(false);
//   };

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (!isDraggingCategory && categoryScrollRef.current) {
//         categoryScrollRef.current.scrollLeft += 1;
//         if (categoryScrollRef.current.scrollLeft >= categoryScrollRef.current.scrollWidth - categoryScrollRef.current.clientWidth) {
//           categoryScrollRef.current.scrollLeft = 0;
//         }
//       }
//     }, 20); // Adjust speed of animation
//     return () => clearInterval(timer);
//   }, [isDraggingCategory]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (!isDraggingBrand && brandScrollRef.current) {
//         brandScrollRef.current.scrollLeft += 1;
//         if (brandScrollRef.current.scrollLeft >= brandScrollRef.current.scrollWidth - brandScrollRef.current.clientWidth) {
//           brandScrollRef.current.scrollLeft = 0;
//         }
//       }
//     }, 20); // Adjust speed of animation
//     return () => clearInterval(timer);
//   }, [isDraggingBrand]);

//   useEffect(() => {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: {},
//         sortParams: "price-lowtohigh",
//       })
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   useEffect(() => {
//     setUniqueKeys([Date.now(), Date.now() + 1]);
//   }, []);

//   return (
//     <div className="mt-20 flex flex-col min-h-screen">
//       {/* Hero Slider Section */}
//       <div className="relative w-full h-auto min-h-[250px] sm:min-h-[350px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((slide, index) => (
//             <img
//               src={slide?.image}
//               key={index}
//               className={`${
//                 index === currentSlide ? "opacity-100" : "opacity-0"
//               } absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000`}
//               alt={`Slide ${index + 1}`}
//             />
//             ))
//           : null}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) =>
//                 (prevSlide - 1 + featureImageList.length) %
//                 featureImageList.length
//             )
//           }
//           className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 w-8 h-8 sm:w-10 sm:h-10"
//         >
//           <ChevronLeftIcon className="w-4 h-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) => (prevSlide + 1) % featureImageList.length
//             )
//           }
//           className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 w-8 h-8 sm:w-10 sm:h-10"
//         >
//           <ChevronRightIcon className="w-4 h-4" />
//         </Button>
//       </div>

//       {/* 1st video section */}
//       <div>
//         <VideoSection uniqueKey={uniqueKeys[0]} numAds={1} />
//       </div>

//       {/* Categories Section with Horizontal Scroll and Animation */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Shop by Category
//           </h2>
//           <div className="relative">
//             <div 
//               ref={categoryScrollRef}
//               className="flex gap-4 overflow-x-hidden px-12"
//               onMouseDown={handleMouseDownCategory}
//               onMouseMove={handleMouseMoveCategory}
//               onMouseUp={handleMouseUpCategory}
//               onMouseLeave={handleMouseLeaveCategory}
//               onMouseEnter={() => setIsDraggingCategory(false)}
//             >
//               {categoriesWithImages.map((categoryItem) => (
//                 <Card
//                   key={categoryItem.id}
//                   onClick={() =>
//                     handleNavigateToListingPage(categoryItem, "category")
//                   }
//                   className="cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0 w-48"
//                 >
//                   <CardContent className="flex flex-col items-center justify-center p-6">
//                     {categoryItem.image}
//                     <span className="font-bold mt-2 text-center">{categoryItem.label}</span>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Brands Section with Horizontal Scroll and Animation */}
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
//           <div className="relative">
//             <div 
//               ref={brandScrollRef}
//               className="flex gap-4 overflow-x-hidden px-12"
//               onMouseDown={handleMouseDownBrand}
//               onMouseMove={handleMouseMoveBrand}
//               onMouseUp={handleMouseUpBrand}
//               onMouseLeave={handleMouseLeaveBrand}
//               onMouseEnter={() => setIsDraggingBrand(false)}
//             >
//               {brandsWithLogos.map((brandItem) => (
//                 <Card
//                   key={brandItem.id}
//                   onClick={() => handleNavigateToListingPage(brandItem, "brand")}
//                   className="cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0 w-32"
//                 >
//                   <CardContent className="flex flex-col items-center justify-center p-4">
//                     {brandItem.logo}
//                     <span className="font-bold mt-2 text-center text-sm">{brandItem.label}</span>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 2nd video section */}
//       <div>
//         <VideoSection uniqueKey={uniqueKeys[1]} numAds={1} />
//       </div>

//       {/* Featured Products Section */}
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Featured Products
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList && productList.length > 0
//               ? productList.map((productItem) => (
//                   <ShoppingProductTile
//                     key={productItem.id}
//                     handleGetProductDetails={handleGetProductDetails}
//                     product={productItem}
//                     handleAddtoCart={handleAddtoCart}
//                   />
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>

//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// }

// export default ShoppingHome;






// import { Button } from "@/components/ui/button";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { getFeatureImages } from "@/store/common-slice";
// import { categories, getAllBrands } from "@/config/category-brand-config";

// import VideoSection from "../../components/admin-view/VideoSection";

// // Updated categories with expanded list
// const categoriesWithImages = [
//   {
//     id: "men",
//     label: "Men",
//     image: <img 
//       src="/images/29482642-three-men-fashion-metraseksualy-shop-shopping-walk.jpg"
//       alt="Men's Fashion"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "women",
//     label: "Women",
//     image: <img 
//       src="/images/happy-young-group-women-shopping-big-mall-bags-78254692.webp"
//       alt="Women's Fashion"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "kids",
//     label: "Kids",
//     image: <img 
//       src="/images/360_F_209237853_PkcPTlx2zh7HIx7xFS0pe7xNWV02fP3v.jpg"
//       alt="Kids' Fashion"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "accessories",
//     label: "Accessories",
//     image: <img 
//       src="/images/fashion-women-stylish-accessories-outfit-600nw-1532053424.webp"
//       alt="Accessories"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "footwear",
//     label: "Footwear",
//     image: <img 
//       src="/images/download (1).jpg"
//       alt="Footwear"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "electronics",
//     label: "Electronics",
//     image: <img 
//       src="/images/default-electronics.png"
//       alt="Electronics"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "home",
//     label: "Home & Garden",
//     image: <img 
//       src="/images/default-home.png"
//       alt="Home & Garden"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "sports",
//     label: "Sports & Outdoors",
//     image: <img 
//       src="/images/default-sports.png"
//       alt="Sports & Outdoors"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "books",
//     label: "Books & Education",
//     image: <img 
//       src="/images/default-books.png"
//       alt="Books & Education"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   },
//   {
//     id: "beauty",
//     label: "Beauty & Personal Care",
//     image: <img 
//       src="/images/default-beauty.png"
//       alt="Beauty & Personal Care"
//       className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
//     />
//   }
// ];

// // Updated brands with expanded list
// const brandsWithLogos = [
//   {
//     id: "nike",
//     label: "Nike",
//     logo: <img 
//       src="/images/download.jpg" 
//       alt="Nike logo" 
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "adidas",
//     label: "Adidas",
//     logo: <img 
//       src="/images/download (3).png" 
//       alt="Adidas logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "puma",
//     label: "Puma",
//     logo: <img 
//       src="/images/puma-logo-and-art-free-vector.jpg" 
//       alt="Puma logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "levi",
//     label: "Levi's",
//     logo: <img 
//       src="/images/download (2).png" 
//       alt="Levi's logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "zara",
//     label: "Zara",
//     logo: <img 
//       src="/images/download (4).png" 
//       alt="Zara logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "h&m",
//     label: "H&M",
//     logo: <img 
//       src="/images/download.png" 
//       alt="H&M logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "tommy",
//     label: "Tommy Hilfiger",
//     logo: <img 
//       src="/images/default-tommy.png" 
//       alt="Tommy Hilfiger logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "calvin",
//     label: "Calvin Klein",
//     logo: <img 
//       src="/images/default-calvin.png" 
//       alt="Calvin Klein logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "forever21",
//     label: "Forever 21",
//     logo: <img 
//       src="/images/default-forever21.png" 
//       alt="Forever 21 logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "mango",
//     label: "Mango",
//     logo: <img 
//       src="/images/default-mango.png" 
//       alt="Mango logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "apple",
//     label: "Apple",
//     logo: <img 
//       src="/images/default-apple.png" 
//       alt="Apple logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "samsung",
//     label: "Samsung",
//     logo: <img 
//       src="/images/default-samsung.png" 
//       alt="Samsung logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "sony",
//     label: "Sony",
//     logo: <img 
//       src="/images/default-sony.png" 
//       alt="Sony logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "ikea",
//     label: "IKEA",
//     logo: <img 
//       src="/images/default-ikea.png" 
//       alt="IKEA logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "fossil",
//     label: "Fossil",
//     logo: <img 
//       src="/images/default-fossil.png" 
//       alt="Fossil logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "rayban",
//     label: "Ray-Ban",
//     logo: <img 
//       src="/images/default-rayban.png" 
//       alt="Ray-Ban logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "loreal",
//     label: "L'Oréal",
//     logo: <img 
//       src="/images/default-loreal.png" 
//       alt="L'Oréal logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//     id: "reebok",
//     label: "Reebok",
//     logo: <img 
//       src="/images/default-reebok.png" 
//       alt="Reebok logo"
//       className="w-24 h-12 object-contain"
//     />
//   },
//   {
//   id: "ashley",
//   label: "Ashley Furniture",
//   logo: <img 
//     src="/images/default-ashley.png" 
//     alt="Ashley Furniture logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "cambridge",
//   label: "Cambridge",
//   logo: <img 
//     src="/images/default-cambridge.png" 
//     alt="Cambridge logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "carter",
//   label: "Carter's",
//   logo: <img 
//     src="/images/default-carter.png" 
//     alt="Carter's logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "casio",
//   label: "Casio",
//   logo: <img 
//     src="/images/default-casio.png" 
//     alt="Casio logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "coach",
//   label: "Coach",
//   logo: <img 
//     src="/images/default-coach.png" 
//     alt="Coach logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "converse",
//   label: "Converse",
//   logo: <img 
//     src="/images/default-converse.png" 
//     alt="Converse logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "crocs",
//   label: "Crocs",
//   logo: <img 
//     src="/images/default-crocs.png" 
//     alt="Crocs logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "dell",
//   label: "Dell",
//   logo: <img 
//     src="/images/default-dell.png" 
//     alt="Dell logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "disney",
//   label: "Disney",
//   logo: <img 
//     src="/images/default-disney.png" 
//     alt="Disney logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "gap",
//   label: "Gap Kids",
//   logo: <img 
//     src="/images/default-gap.png" 
//     alt="Gap Kids logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// // {
// //   id: "generic",
// //   label: "Generic",
// //   logo: <img 
// //     src="/images/default-generic.png" 
// //     alt="Generic logo" 
// //     className="w-24 h-12 object-contain"
// //   />
// // },
// {
//   id: "harper",
//   label: "HarperCollins",
//   logo: <img 
//     src="/images/default-harper.png" 
//     alt="HarperCollins logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "homeDepot",
//   label: "Home Depot",
//   logo: <img 
//     src="/images/default-homeDepot.png" 
//     alt="Home Depot logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "hp",
//   label: "HP",
//   logo: <img 
//     src="/images/default-hp.png" 
//     alt="HP logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "lakme",
//   label: "Lakmé",
//   logo: <img 
//     src="/images/default-lakme.png" 
//     alt="Lakmé logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "lenovo",
//   label: "Lenovo",
//   logo: <img 
//     src="/images/default-lenovo.png" 
//     alt="Lenovo logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "lg",
//   label: "LG",
//   logo: <img 
//     src="/images/default-lg.png" 
//     alt="LG logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "mac",
//   label: "MAC",
//   logo: <img 
//     src="/images/default-mac.png" 
//     alt="MAC logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "maybelline",
//   label: "Maybelline",
//   logo: <img 
//     src="/images/default-maybelline.png" 
//     alt="Maybelline logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "mcgraw",
//   label: "McGraw Hill",
//   logo: <img 
//     src="/images/default-mcgraw.png" 
//     alt="McGraw Hill logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "michael",
//   label: "Michael Kors",
//   logo: <img 
//     src="/images/default-michael.png" 
//     alt="Michael Kors logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "nivea",
//   label: "Nivea",
//   logo: <img 
//     src="/images/default-nivea.png" 
//     alt="Nivea logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "nykaa",
//   label: "Nykaa",
//   logo: <img 
//     src="/images/default-nykaa.png" 
//     alt="Nykaa logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "oakley",
//   label: "Oakley",
//   logo: <img 
//     src="/images/default-oakley.png" 
//     alt="Oakley logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "olay",
//   label: "Olay",
//   logo: <img 
//     src="/images/default-olay.png" 
//     alt="Olay logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "only",
//   label: "Only",
//   logo: <img 
//     src="/images/default-only.png" 
//     alt="Only logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "oxford",
//   label: "Oxford",
//   logo: <img 
//     src="/images/default-oxford.png" 
//     alt="Oxford logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "pearson",
//   label: "Pearson",
//   logo: <img 
//     src="/images/default-pearson.png" 
//     alt="Pearson logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "penguin",
//   label: "Penguin",
//   logo: <img 
//     src="/images/default-penguin.png" 
//     alt="Penguin logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "pottery",
//   label: "Pottery Barn",
//   logo: <img 
//     src="/images/default-pottery.png" 
//     alt="Pottery Barn logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "random",
//   label: "Random House",
//   logo: <img 
//     src="/images/default-random.png" 
//     alt="Random House logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "revlon",
//   label: "Revlon",
//   logo: <img 
//     src="/images/default-revlon.png" 
//     alt="Revlon logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "sketchers",
//   label: "Sketchers",
//   logo: <img 
//     src="/images/default-sketchers.png" 
//     alt="Sketchers logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "simon",
//   label: "Simon & Schuster",
//   logo: <img 
//     src="/images/default-simon.png" 
//     alt="Simon & Schuster logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "spalding",
//   label: "Spalding",
//   logo: <img 
//     src="/images/default-spalding.png" 
//     alt="Spalding logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "titan",
//   label: "Titan",
//   logo: <img 
//     src="/images/default-titan.png" 
//     alt="Titan logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "under",
//   label: "Under Armour",
//   logo: <img 
//     src="/images/default-under.png" 
//     alt="Under Armour logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "vans",
//   label: "Vans",
//   logo: <img 
//     src="/images/default-vans.png" 
//     alt="Vans logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "vero",
//   label: "Vero Moda",
//   logo: <img 
//     src="/images/default-veromoda.png" 
//     alt="Vero Moda logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "wayfair",
//   label: "Wayfair",
//   logo: <img 
//     src="/images/default-wayfair.png" 
//     alt="Wayfair logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "west",
//   label: "West Elm",
//   logo: <img 
//     src="/images/default-west.png" 
//     alt="West Elm logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "wilson",
//   label: "Wilson",
//   logo: <img 
//     src="/images/default-wilson.png" 
//     alt="Wilson logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "xiaomi",
//   label: "Xiaomi",
//   logo: <img 
//     src="/images/default-xiaomi.png" 
//     alt="Xiaomi logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "lowe's",
//   label: "Lowe's",
//   logo: <img 
//     src="/images/default-lowe.png" 
//     alt="Lowe's logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// {
//   id: "yonex",
//   label: "Yonex",
//   logo: <img 
//     src="/images/default-yonex.png" 
//     alt="Yonex logo" 
//     className="w-24 h-12 object-contain"
//   />
// },
// ];

// function ShoppingHome() {
//   const [uniqueKeys, setUniqueKeys] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHoveredCategory, setIsHoveredCategory] = useState(false);
//   const [isHoveredBrand, setIsHoveredBrand] = useState(false);
  
//   const categoryScrollRef = useRef(null);
//   const brandScrollRef = useRef(null);
  
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const { featureImageList } = useSelector((state) => state.commonFeature);
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // Create duplicated arrays for infinite scroll effect
//   const duplicatedCategories = [...categoriesWithImages, ...categoriesWithImages];
//   const duplicatedBrands = [...brandsWithLogos, ...brandsWithLogos];

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters");
//     const currentFilter = {
//       [section]: [getCurrentItem.id],
//     };
//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     window.scrollTo(0, 0);
//     navigate(`/shop/listing`);
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   function handleAddtoCart(getCurrentProductId) {
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: "Product is added to cart",
//         });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   // Infinite scroll effect for categories
//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (!isHoveredCategory && categoryScrollRef.current) {
//         const cardWidth = 256; // 192px (w-48) + 32px (gap-8)
//         const originalArrayWidth = categoriesWithImages.length * cardWidth;
        
//         categoryScrollRef.current.scrollLeft += 1;
        
//         // Reset to beginning when we've scrolled through the first set
//         if (categoryScrollRef.current.scrollLeft >= originalArrayWidth) {
//           categoryScrollRef.current.scrollLeft = 0;
//         }
//       }
//     }, 20);
    
//     return () => clearInterval(timer);
//   }, [isHoveredCategory]);

//   // Infinite scroll effect for brands
//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (!isHoveredBrand && brandScrollRef.current) {
//         const cardWidth = 160; // 128px (w-32) + 32px (gap-8)
//         const originalArrayWidth = brandsWithLogos.length * cardWidth;
        
//         brandScrollRef.current.scrollLeft += 1;
        
//         // Reset to beginning when we've scrolled through the first set
//         if (brandScrollRef.current.scrollLeft >= originalArrayWidth) {
//           brandScrollRef.current.scrollLeft = 0;
//         }
//       }
//     }, 20);
    
//     return () => clearInterval(timer);
//   }, [isHoveredBrand]);

//   useEffect(() => {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: {},
//         sortParams: "price-lowtohigh",
//       })
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   useEffect(() => {
//     setUniqueKeys([Date.now(), Date.now() + 1]);
//   }, []);

//   return (
//     <div className="mt-20 flex flex-col min-h-screen">
//       {/* Hero Slider Section */}
//       <div className="relative w-full h-auto min-h-[250px] sm:min-h-[350px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((slide, index) => (
//             <img
//               src={slide?.image}
//               key={index}
//               className={`${
//                 index === currentSlide ? "opacity-100" : "opacity-0"
//               } absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000`}
//               alt={`Slide ${index + 1}`}
//             />
//             ))
//           : null}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) =>
//                 (prevSlide - 1 + featureImageList.length) %
//                 featureImageList.length
//             )
//           }
//           className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 w-8 h-8 sm:w-10 sm:h-10"
//         >
//           <ChevronLeftIcon className="w-4 h-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) => (prevSlide + 1) % featureImageList.length
//             )
//           }
//           className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 w-8 h-8 sm:w-10 sm:h-10"
//         >
//           <ChevronRightIcon className="w-4 h-4" />
//         </Button>
//       </div>

//       {/* 1st video section */}
//       <div>
//         <VideoSection uniqueKey={uniqueKeys[0]} numAds={1} />
//       </div>

//       {/* Categories Section with Infinite Horizontal Scroll */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Shop by Category
//           </h2>
//           <div className="relative">
//             <div 
//               ref={categoryScrollRef}
//               className="flex gap-8 overflow-x-hidden px-12"
//               onMouseEnter={() => setIsHoveredCategory(true)}
//               onMouseLeave={() => setIsHoveredCategory(false)}
//               style={{
//                 scrollBehavior: 'auto' // Prevent smooth scrolling for seamless loop
//               }}
//             >
//               {duplicatedCategories.map((categoryItem, index) => (
//                 <Card
//                   key={`${categoryItem.id}-${index}`}
//                   onClick={() =>
//                     handleNavigateToListingPage(categoryItem, "category")
//                   }
//                   className="cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0 w-48"
//                 >
//                   <CardContent className="flex flex-col items-center justify-center p-6">
//                     {categoryItem.image}
//                     <span className="font-bold mt-2 text-center">{categoryItem.label}</span>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Brands Section with Infinite Horizontal Scroll */}
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
//           <div className="relative">
//             <div 
//               ref={brandScrollRef}
//               className="flex gap-8 overflow-x-hidden px-12"
//               onMouseEnter={() => setIsHoveredBrand(true)}
//               onMouseLeave={() => setIsHoveredBrand(false)}
//               style={{
//                 scrollBehavior: 'auto' // Prevent smooth scrolling for seamless loop
//               }}
//             >
//               {duplicatedBrands.map((brandItem, index) => (
//                 <Card
//                   key={`${brandItem.id}-${index}`}
//                   onClick={() => handleNavigateToListingPage(brandItem, "brand")}
//                   className="cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0 w-32"
//                 >
//                   <CardContent className="flex flex-col items-center justify-center p-4">
//                     {brandItem.logo}
//                     <span className="font-bold mt-2 text-center text-sm">{brandItem.label}</span>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 2nd video section */}
//       <div>
//         <VideoSection uniqueKey={uniqueKeys[1]} numAds={1} />
//       </div>

//       {/* Featured Products Section */}
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Featured Products
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList && productList.length > 0
//               ? productList.map((productItem) => (
//                   <ShoppingProductTile
//                     key={productItem.id}
//                     handleGetProductDetails={handleGetProductDetails}
//                     product={productItem}
//                     handleAddtoCart={handleAddtoCart}
//                   />
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>

//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// }

// export default ShoppingHome;


