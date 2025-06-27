

// import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, X } from "lucide-react";
// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   shoppingViewHeaderMenuItems,
// } from "@/config/category-brand-config";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { logoutUser } from "@/store/auth-slice";
// import UserCartWrapper from "./cart-wrapper";
// import { useEffect, useState, useRef } from "react";
// import { fetchCartItems } from "@/store/shop/cart-slice";
// import { Label } from "../ui/label";

// // Modified MenuItems component with proper closing mechanism
// const MenuItems = ({ onClose, isInSheet }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [clickedItem, setClickedItem] = useState(null);
//   const sheetCloseRef = useRef(null);

//   function handleNavigate(getCurrentMenuItem) {
//     // Remove existing filters
//     sessionStorage.removeItem("filters");

//     // Set new filter if applicable
//     const currentFilter =
//       getCurrentMenuItem.id !== "home" &&
//       getCurrentMenuItem.id !== "products" &&
//       getCurrentMenuItem.id !== "search"
//         ? { category: [getCurrentMenuItem.id] }
//         : null;

//     if (currentFilter) {
//       sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     }

//     // Handle navigation
//     if (location.pathname.includes("listing") && currentFilter !== null) {
//       setSearchParams({ category: getCurrentMenuItem.id });
//     } else {
//       navigate(getCurrentMenuItem.path);
//     }

//     // Ensure menu closes - use appropriate method based on context
//     if (isInSheet && sheetCloseRef.current) {
//       sheetCloseRef.current.click();
//     } else if (typeof onClose === 'function') {
//       onClose();
//     }

//     setClickedItem(getCurrentMenuItem.id);
//     setTimeout(() => setClickedItem(null), 500);
//   }

//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
//       {shoppingViewHeaderMenuItems.map((menuItem) => (
//         <Label
//           onClick={() => handleNavigate(menuItem)}
//           className="text-sm font-bold cursor-pointer hover:text-red-500 transition-colors duration-150"
//           key={menuItem.id}
//         >
//           {menuItem.label}
//         </Label>
//       ))}
//       {isInSheet && <SheetClose ref={sheetCloseRef} className="hidden" />}
//     </nav>
//   );
// };

// function HeaderRightContent() {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const [openCartSheet, setOpenCartSheet] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   function handleLogout() {
//     dispatch(logoutUser());
//   }

//   useEffect(() => {
//     dispatch(fetchCartItems(user?.id));
//   }, [dispatch, user?.id]);

//   return (
//     <div className="flex lg:items-center lg:flex-row flex-col gap-4">
//       <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
//         <Button
//           onClick={() => setOpenCartSheet(true)}
//           variant="outline"
//           size="icon"
//           className="relative hover:bg-gray-100 transition-colors duration-200"
//         >
//           <ShoppingCart className="w-6 h-6" />
//           <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
//             {cartItems?.items?.length || 0}
//           </span>
//           <span className="sr-only">User cart</span>
//         </Button>
//         <UserCartWrapper
//           setOpenCartSheet={setOpenCartSheet}
//           cartItems={
//             cartItems && cartItems.items && cartItems.items.length > 0
//               ? cartItems.items
//               : []
//           }
//         />
//       </Sheet>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Avatar className="bg-black hover:bg-gray-800 transition-colors duration-200">
//             <AvatarFallback className="bg-black text-white font-extrabold">
//               {user?.userName?.[0]?.toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent side="right" className="w-56">
//           <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem 
//             onClick={() => navigate("/shop/account")}
//             className="hover:bg-gray-50 transition-colors duration-200"
//           >
//             <UserCog className="mr-2 h-4 w-4" />
//             Account
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem 
//             onClick={handleLogout}
//             className="hover:bg-gray-50 transition-colors duration-200"
//           >
//             <LogOut className="mr-2 h-4 w-4" />
//             Logout
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

// function ShoppingHeader() {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
  
//   return (
//     <header className="fixed top-0 z-40 w-full border-b bg-background">
//       <div className="flex h-16 items-center justify-between px-4 md:px-6">
//         <Link to="/shop/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
//           <span className="onestop-text">OneStop</span>
//         </Link>
        
//         <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="lg:hidden hover:bg-gray-100 transition-colors duration-200">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Toggle header menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-full max-w-xs">
//             <MenuItems onClose={() => setIsSheetOpen(false)} isInSheet={true} />
//             <HeaderRightContent />
//           </SheetContent>
//         </Sheet>
        
//         <div className="hidden lg:block">
//           <MenuItems onClose={() => {}} isInSheet={false} />
//         </div>
//         <div className="hidden lg:block">
//           <HeaderRightContent />
//         </div>
//       </div>
  
//       {/* Styling for the OneStop logo text */}
//       <style>
//       {`
//         /* OneStop Text Styling */
//         .onestop-text {
//           font-size: 1.8rem;
//           font-weight: bold;
//           letter-spacing: 2px;
//           color: rgb(0, 112, 204); /* Softer red */
//           position: relative;
//           text-shadow: 
//             0px 0px 3px rgba(0, 251, 255, 0.77),
//             0px 0px 6px rgba(0, 255, 255, 0.76);
//         }

//         /* Soft White Glow */
//         .onestop-text::before {
//           content: "OneStop";
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: -1;
//           color: white;
//           text-shadow:
//             -2px 2px 4px rgba(255, 255, 255, 0.7),
//             2px -2px 4px rgba(255, 255, 255, 0.7),
//             0px 0px 8px rgba(255, 255, 255, 0.6);
//         }

//         /* Subtle Animated Glow */
//         .onestop-text::after {
//           content: "OneStop";
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: -2;
//           color: #cc0000; /* Softer red */
//           text-shadow:
//             0px 0px 4px rgba(255, 0, 0, 0.5),
//             0px 0px 10px rgba(255, 0, 0, 0.4),
//             0px 0px 16px rgba(255, 0, 0, 0.3);
//           animation: softGlow 1.5s infinite alternate ease-in-out;
//         }

//         /* Animation for a subtle white-red glow */
//         @keyframes softGlow {
//           0% {
//             text-shadow:
//               0px 0px 5px rgba(255, 255, 255, 0.6),
//               0px 0px 12px rgba(255, 255, 255, 0.5);
//           }
//           100% {
//             text-shadow:
//               0px 0px 8px rgba(255, 255, 255, 0.7),
//               0px 0px 15px rgba(255, 255, 255, 0.6);
//           }
//         }
//       `}
//       </style>
//     </header>
//   );
// }

// export default ShoppingHeader;


// import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, X } from "lucide-react";
// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   shoppingViewHeaderMenuItems,
// } from "@/config/category-brand-config";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { logoutUser } from "@/store/auth-slice";
// import UserCartWrapper from "./cart-wrapper";
// import { useEffect, useState, useRef } from "react";
// import { fetchCartItems } from "@/store/shop/cart-slice";
// import { Label } from "../ui/label";

// // Modified MenuItems component with proper closing mechanism
// const MenuItems = ({ onClose, isInSheet }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [clickedItem, setClickedItem] = useState(null);
//   const sheetCloseRef = useRef(null);

//   function handleNavigate(getCurrentMenuItem) {
//     sessionStorage.removeItem("filters");
//     const currentFilter =
//       getCurrentMenuItem.id !== "home" &&
//       getCurrentMenuItem.id !== "products" &&
//       getCurrentMenuItem.id !== "search"
//         ? { category: [getCurrentMenuItem.id] }
//         : null;

//     if (currentFilter) {
//       sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     }

//     if (location.pathname.includes("listing") && currentFilter !== null) {
//       setSearchParams({ category: getCurrentMenuItem.id });
//     } else {
//       navigate(getCurrentMenuItem.path);
//     }

//     if (isInSheet && sheetCloseRef.current) {
//       sheetCloseRef.current.click();
//     } else if (typeof onClose === 'function') {
//       onClose();
//     }

//     setClickedItem(getCurrentMenuItem.id);
//     setTimeout(() => setClickedItem(null), 500);
//   }

//   const filteredMenuItems = shoppingViewHeaderMenuItems.filter((item, index, self) =>
//     ["home", "products", "search"].includes(item.id) &&
//     index === self.findIndex((t) => t.id === item.id)
//   );

//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
//       {filteredMenuItems.map((menuItem) => (
//         <Label
//           onClick={() => handleNavigate(menuItem)}
//           className="text-menu-item cursor-pointer hover:text-red-500 transition-colors duration-150"
//           key={menuItem.id}
//         >
//           {menuItem.label}
//         </Label>
//       ))}
//       {isInSheet && <SheetClose ref={sheetCloseRef} className="hidden" />}
//     </nav>
//   );
// };

// function HeaderRightContent() {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const [openCartSheet, setOpenCartSheet] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   function handleLogout() {
//     dispatch(logoutUser());
//   }

//   useEffect(() => {
//     dispatch(fetchCartItems(user?.id));
//   }, [dispatch, user?.id]);

//   return (
//     <div className="flex lg:items-center lg:flex-row flex-col gap-4">
//       <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
//         <Button
//           onClick={() => setOpenCartSheet(true)}
//           variant="outline"
//           size="icon"
//           className="relative hover:bg-gray-100 transition-colors duration-200"
//         >
//           <ShoppingCart className="w-6 h-6" />
//           <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
//             {cartItems?.items?.length || 0}
//           </span>
//           <span className="sr-only">User cart</span>
//         </Button>
//         <UserCartWrapper
//           setOpenCartSheet={setOpenCartSheet}
//           cartItems={
//             cartItems && cartItems.items && cartItems.items.length > 0
//               ? cartItems.items
//               : []
//           }
//         />
//       </Sheet>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Avatar className="bg-black hover:bg-gray-800 transition-colors duration-200">
//             <AvatarFallback className="bg-black text-white font-extrabold">
//               {user?.userName?.[0]?.toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent side="right" className="w-56">
//           <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem 
//             onClick={() => navigate("/shop/account")}
//             className="hover:bg-gray-50 transition-colors duration-200"
//           >
//             <UserCog className="mr-2 h-4 w-4" />
//             Account
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem 
//             onClick={handleLogout}
//             className="hover:bg-gray-50 transition-colors duration-200"
//           >
//             <LogOut className="mr-2 h-4 w-4" />
//             Logout
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

// function ShoppingHeader() {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
  
//   return (
//     <header className="fixed top-0 z-40 w-full border-b bg-background">
//       <div className="flex h-16 items-center justify-between px-4 md:px-6">
//         <Link to="/shop/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
//           <span className="onestop-text">
//             <span className="one-text">ONE</span>
//             <span className="stop-text">STOP</span>
//           </span>
//         </Link>
        
//         <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="lg:hidden hover:bg-gray-100 transition-colors duration-200">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Toggle header menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-full max-w-xs">
//             <MenuItems onClose={() => setIsSheetOpen(false)} isInSheet={true} />
//             <HeaderRightContent />
//           </SheetContent>
//         </Sheet>
        
//         <div className="hidden lg:block">
//           <MenuItems onClose={() => {}} isInSheet={false} />
//         </div>
//         <div className="hidden lg:block">
//           <HeaderRightContent />
//         </div>
//       </div>
  
//       <style>
//         {`
//           /* OneStop Text Styling with Split Colors and Google-like Font */
//           @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap'); /* Trendy illustrative font */

//           .onestop-text {
//             position: relative;
//             display: inline-flex;
//             align-items: baseline;
//             gap: 2px;
//             padding: 2px 4px;
//           }

//           .one-text {
//             font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//             font-size: 1.8rem;
//             font-weight: 900;
//             letter-spacing: 2px;
//             background: linear-gradient(45deg, #1a1a1a, #2d2d2d, #4d4d4d, #666666);
//             -webkit-background-clip: text;
//             background-clip: text;
//             color: transparent;
//             text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
//             text-transform: uppercase;
//           }

//           .stop-text {
//             font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//             font-size: 1.8rem;
//             font-weight: 900;
//             letter-spacing: 2px;
//             background: linear-gradient(45deg, #cc0000, #ff3333, #ff6666);
//             -webkit-background-clip: text;
//             background-clip: text;
//             color: transparent;
//             text-shadow: 1px 1px 2px rgba(204, 0, 0, 0.3);
//             text-transform: uppercase;
//           }

//           /* Refined illustrative halo for split text */
//           .onestop-text::after {
//             content: "";
//             position: absolute;
//             top: -6px;
//             left: -6px;
//             width: 120%;
//             height: 120%;
//             background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
//             z-index: -1;
//             clip-path: polygon(
//               50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
//             );
//             animation: pulse 2.5s infinite ease-in-out;
//             filter: blur(3px);
//             box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
//           }

//           /* Styling for menu items */
//           .text-menu-item {
//             font-family: 'Poppins', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//             font-size: 1.0rem; /* Increased from default (e.g., text-sm ~ 0.875rem) */
//             font-weight: 700; /* Bold for trendy look */
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             position: relative;
//             padding: 4px 8px;
//             background: linear-gradient(90deg, #333333, #666666);
//             -webkit-background-clip: text;
//             background-clip: text;
//             color: transparent;
//             text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Illustrative shadow */
//           }

//           .text-menu-item:hover {
//             background: linear-gradient(90deg,rgb(68, 193, 255),rgb(159, 236, 251));
//             -webkit-background-clip: text;
//             background-clip: text;
//             color: transparent;
//             transform: scale(1.1); /* Slight zoom on hover */
//             transition: transform 0.3s ease, background 0.3s ease;
//           }

//           /* Smoother pulse animation */
//           @keyframes pulse {
//             0% { transform: scale(1) translate(0, 0); }
//             50% { transform: scale(1.08) translate(2px, -2px); }
//             100% { transform: scale(1) translate(0, 0); }
//           }

//           /* Gradient animation */
//           @keyframes gradientShift {
//             0% { background-position: 0% 0%; }
//             50% { background-position: 100% 100%; }
//             100% { background-position: 0% 0%; }
//           }

//           .one-text, .stop-text {
//             background-size: 200% 200%;
//             animation: gradientShift 6s ease-in-out infinite;
//             transition: transform 0.3s ease;
//           }

//           // .one-text:hover, .stop-text:hover {
//           //   transform: scale(1.05);
//           // }

//           /* Responsive adjustments */
//           @media (max-width: 640px) {
//             .one-text, .stop-text {
//               font-size: 1.4rem;
//               letter-spacing: 1.5px;
//             }
//             .onestop-text::after {
//               top: -4px;
//               left: -4px;
//               width: 115%;
//               height: 115%;
//             }
//             .text-menu-item {
//               font-size: 1.0rem; /* Adjusted for mobile */
//               padding: 2px 6px;
//             }
//           }

//           /* Fallback for font loading */
//           @supports not (font-family: 'Poppins') {
//             .text-menu-item, .one-text, .stop-text {
//               font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//             }
//           }
//         `}
//       </style>
//     </header>
//   );
// }

// export default ShoppingHeader;

import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, X } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  shoppingViewHeaderMenuItems,
} from "@/config/category-brand-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState, useRef } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

// Modified MenuItems component with proper closing mechanism
const MenuItems = ({ onClose, isInSheet }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const sheetCloseRef = useRef(null);

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    if (currentFilter) {
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    }

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams({ category: getCurrentMenuItem.id });
    } else {
      navigate(getCurrentMenuItem.path);
    }

    if (isInSheet && sheetCloseRef.current) {
      sheetCloseRef.current.click();
    } else if (typeof onClose === 'function') {
      onClose();
    }

    setClickedItem(getCurrentMenuItem.id);
    setTimeout(() => setClickedItem(null), 500);
  }

  const filteredMenuItems = shoppingViewHeaderMenuItems.filter((item, index, self) =>
    ["home", "products", "search"].includes(item.id) &&
    index === self.findIndex((t) => t.id === item.id)
  );

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {filteredMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-menu-item cursor-pointer hover:text-red-500 transition-colors duration-150"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
      {isInSheet && <SheetClose ref={sheetCloseRef} className="hidden" />}
    </nav>
  );
};

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="modern-cart-button"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="modern-cart-badge">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="modern-profile-avatar">
            <AvatarFallback className="modern-profile-fallback">
              {user?.userName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => navigate("/shop/account")}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
          <span className="onestop-text">
            <span className="one-text">ONE</span>
            <span className="stop-text">STOP</span>
          </span>
        </Link>
        
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden hover:bg-gray-100 transition-colors duration-200">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems onClose={() => setIsSheetOpen(false)} isInSheet={true} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        
        <div className="hidden lg:block">
          <MenuItems onClose={() => {}} isInSheet={false} />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
  
      <style>
        {`
          /* OneStop Text Styling with Split Colors and Google-like Font */
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap'); /* Trendy illustrative font */

          .onestop-text {
            position: relative;
            display: inline-flex;
            align-items: baseline;
            gap: 2px;
            padding: 2px 4px;
          }

          .one-text {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: 2px;
            background: linear-gradient(45deg, #1a1a1a, #2d2d2d, #4d4d4d, #666666);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            text-transform: uppercase;
          }

          .stop-text {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: 2px;
            background: linear-gradient(45deg, #cc0000, #ff3333, #ff6666);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 1px 1px 2px rgba(204, 0, 0, 0.3);
            text-transform: uppercase;
          }

          /* Refined illustrative halo for split text */
          .onestop-text::after {
            content: "";
            position: absolute;
            top: -6px;
            left: -6px;
            width: 120%;
            height: 120%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
            z-index: -1;
            clip-path: polygon(
              50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
            );
            animation: pulse 2.5s infinite ease-in-out;
            filter: blur(3px);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
          }

          /* Styling for menu items */
          .text-menu-item {
            font-family: 'Poppins', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 1.0rem; /* Increased from default (e.g., text-sm ~ 0.875rem) */
            font-weight: 700; /* Bold for trendy look */
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            padding: 4px 8px;
            background: linear-gradient(90deg, #333333, #666666);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Illustrative shadow */
          }

          .text-menu-item:hover {
            background: linear-gradient(90deg,rgb(68, 193, 255),rgb(159, 236, 251));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            transform: scale(1.1); /* Slight zoom on hover */
            transition: transform 0.3s ease, background 0.3s ease;
          }

          /* MODERN CART BUTTON STYLING */
          .modern-cart-button {
            position: relative;
            width: 48px;
            height: 48px;
            border: none;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            overflow: visible;
          }

          .modern-cart-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%);
            border-radius: 16px;
            z-index: 0;
          }

          .modern-cart-button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }

          .modern-cart-button:active {
            transform: translateY(0) scale(1.02);
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
          }

          .modern-cart-button svg {
            color: white;
            z-index: 1;
            position: relative;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
          }

          /* MODERN CART BADGE STYLING */
          .modern-cart-badge {
            position: absolute;
            top: -10px;
            right: -10px;
            background: linear-gradient(135deg, #ff6b6b 0%,rgb(197, 225, 11) 100%);
            color: white;
            font-size: 0.75rem;
            font-weight: 700;
            min-width: 22px;
            height: 22px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
            border: 2px solid white;
            z-index: 10;
            animation: pulse-badge 2s infinite;
            padding: 2px;
          }

          @keyframes pulse-badge {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          /* MODERN PROFILE AVATAR STYLING */
          .modern-profile-avatar {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: 3px solid transparent;
            background-clip: padding-box;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            cursor: pointer;
            overflow: hidden;
          }

          .modern-profile-avatar::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c);
            border-radius: 50%;
            z-index: -1;
            background-size: 400% 400%;
            animation: gradient-rotate 3s ease infinite;
          }

          .modern-profile-avatar:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
          }

          .modern-profile-avatar:hover::before {
            animation-duration: 1s;
          }

          @keyframes gradient-rotate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .modern-profile-fallback {
            background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%);
            color: #667eea;
            font-weight: 800;
            font-size: 1.2rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
          }

          /* Smoother pulse animation */
          @keyframes pulse {
            0% { transform: scale(1) translate(0, 0); }
            50% { transform: scale(1.08) translate(2px, -2px); }
            100% { transform: scale(1) translate(0, 0); }
          }

          /* Gradient animation */
          @keyframes gradientShift {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }

          .one-text, .stop-text {
            background-size: 200% 200%;
            animation: gradientShift 6s ease-in-out infinite;
            transition: transform 0.3s ease;
          }

          /* Responsive adjustments */
          @media (max-width: 640px) {
            .one-text, .stop-text {
              font-size: 1.4rem;
              letter-spacing: 1.5px;
            }
            .onestop-text::after {
              top: -4px;
              left: -4px;
              width: 115%;
              height: 115%;
            }
            .text-menu-item {
              font-size: 1.0rem; /* Adjusted for mobile */
              padding: 2px 6px;
            }
            .modern-cart-button, .modern-profile-avatar {
              width: 44px;
              height: 44px;
            }
            .modern-cart-badge {
              top: -8px;
              right: -8px;
              min-width: 20px;
              height: 20px;
              font-size: 0.7rem;
              padding: 1px;
            }
          }

          /* Fallback for font loading */
          @supports not (font-family: 'Poppins') {
            .text-menu-item, .one-text, .stop-text {
              font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
          }
        `}
      </style>
    </header>
  );
}

export default ShoppingHeader;