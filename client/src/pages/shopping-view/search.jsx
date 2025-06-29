// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { fetchProductDetails } from "@/store/shop/products-slice";
// import {
//   getSearchResults,
//   resetSearchResults,
// } from "@/store/shop/search-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// function SearchProducts() {
//   const [keyword, setKeyword] = useState("");
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const { searchResults } = useSelector((state) => state.shopSearch);
//   const { productDetails } = useSelector((state) => state.shopProducts);

//   const { user } = useSelector((state) => state.auth);

//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { toast } = useToast();
//   useEffect(() => {
//     if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
//       setTimeout(() => {
//         setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
//         dispatch(getSearchResults(keyword));
//       }, 1000);
//     } else {
//       setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
//       dispatch(resetSearchResults());
//     }
//   }, [keyword]);

//   function handleAddtoCart(getCurrentProductId, getTotalStock) {
//     console.log(cartItems);
//     let getCartItems = cartItems.items || [];

//     if (getCartItems.length) {
//       const indexOfCurrentItem = getCartItems.findIndex(
//         (item) => item.productId === getCurrentProductId
//       );
//       if (indexOfCurrentItem > -1) {
//         const getQuantity = getCartItems[indexOfCurrentItem].quantity;
//         if (getQuantity + 1 > getTotalStock) {
//           toast({
//             title: `Only ${getQuantity} quantity can be added for this item`,
//             variant: "destructive",
//           });

//           return;
//         }
//       }
//     }

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

//   function handleGetProductDetails(getCurrentProductId) {
//     console.log(getCurrentProductId);
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   console.log(searchResults, "searchResults");

//   return (
//     <div className=" mt-20 container mx-auto md:px-6 px-4 py-8">
//       <div className="flex justify-center mb-8">
//         <div className="w-full flex items-center">
//           <Input
//             value={keyword}
//             name="keyword"
//             onChange={(event) => setKeyword(event.target.value)}
//             className="py-6"
//             placeholder="Search Products..."
//           />
//         </div>
//       </div>
//       {!searchResults.length ? (
//         <h1 className="text-2xl font-bold">No result found!</h1>
//       ) : null}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {searchResults.map((item) => (
//           <ShoppingProductTile
//             handleAddtoCart={handleAddtoCart}
//             product={item}
//             handleGetProductDetails={handleGetProductDetails}
//           />
//         ))}
//       </div>
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// }

// export default SearchProducts;

import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm && searchTerm.trim() !== "" && searchTerm.trim().length > 3) {
        setSearchParams(new URLSearchParams(`?keyword=${encodeURIComponent(searchTerm)}`));
        dispatch(getSearchResults(searchTerm));
      } else {
        setSearchParams(new URLSearchParams());
        dispatch(resetSearchResults());
      }
    }, 500),
    [dispatch, setSearchParams]
  );

  // Update keyword and trigger debounced search
  useEffect(() => {
    handleSearch(keyword);
  }, [keyword, handleSearch]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="mt-20 container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {keyword.trim() && searchResults.length === 0 && (
        <h1 className="text-2xl font-bold">No result found!</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            key={item.id || item._id}
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
