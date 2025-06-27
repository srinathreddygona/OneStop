

import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { categories, categoryBrandMapping, getAllBrands, getBrandsByCategory } from "@/config/category-brand-config";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [availableBrands, setAvailableBrands] = useState(getAllBrands());
  const { toast } = useToast();

  const categorySearchParam = searchParams.get("category");

  // Update available brands based on selected categories
  useEffect(() => {
    const selectedCategories = filters.category || [];

    if (selectedCategories.length === 0) {
      // No categories selected, show all brands
      setAvailableBrands(getAllBrands());
    } else {
      // Get brands for selected categories
      const relevantBrands = new Set();
      selectedCategories.forEach((categoryId) => {
        const categoryBrands = getBrandsByCategory(categoryId) || [];
        categoryBrands.forEach((brand) => relevantBrands.add(brand.id));
      });

      // Filter available brands based on relevance
      const filteredBrands = getAllBrands().filter((brand) =>
        relevantBrands.has(brand.id)
      );

      setAvailableBrands(filteredBrands);

      // Remove selected brands that are no longer available
      if (filters.brand) {
        const validBrands = filters.brand.filter((brandId) =>
          relevantBrands.has(brandId)
        );

        if (validBrands.length !== filters.brand.length) {
          const updatedFilters = {
            ...filters,
            brand: validBrands.length > 0 ? validBrands : undefined,
          };

          // Remove empty brand array
          if (validBrands.length === 0) {
            delete updatedFilters.brand;
          }

          setFilters(updatedFilters);
          sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
        }
      }
    }
  }, [filters.category]);

  // Fetch cart items whenever the component mounts or filters change
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user, filters]);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    // Remove empty arrays
    Object.keys(cpyFilters).forEach((key) => {
      if (Array.isArray(cpyFilters[key]) && cpyFilters[key].length === 0) {
        delete cpyFilters[key];
      }
    });

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    dispatch(fetchCartItems(user?.id)).then((fetchResult) => {
      const latestCartItems = fetchResult?.payload?.items || [];

      const existingCartItem = latestCartItems.find(
        (item) => item.productId === getCurrentProductId
      );

      if (existingCartItem && existingCartItem.quantity + 1 > getTotalStock) {
        toast({
          title: `Only ${getTotalStock} quantity available for this item`,
          variant: "destructive",
        });
        return;
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
        } else {
          toast({
            title: "Failed to add product to cart",
            variant: "destructive",
          });
        }
      });
    });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Enhanced filter configuration
  const filterConfig = [
    {
      id: "category",
      label: "Category",
      options: categories,
    },
    {
      id: "brand",
      label: "Brand",
      options: availableBrands,
    },
  ];

  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      {/* Enhanced Product Filter */}
      <div className="bg-background rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        {filterConfig.map((filterSection) => (
          <div key={filterSection.id} className="mb-6">
            <h4 className="text-md font-medium mb-3">{filterSection.label}</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filterSection.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${filterSection.id}-${option.id}`}
                    checked={filters[filterSection.id]?.includes(option.id) || false}
                    onChange={() => handleFilter(filterSection.id, option.id)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor={`${filterSection.id}-${option.id}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>

            {/* Show message if no brands available for selected category */}
            {filterSection.id === "brand" &&
              availableBrands.length === 0 &&
              filters.category &&
              filters.category.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  No brands available for selected category
                </p>
              )}
          </div>
        ))}

        {/* Clear Filters Button */}
        {Object.keys(filters).length > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              setFilters({});
              sessionStorage.removeItem("filters");
              setSearchParams(new URLSearchParams());
            }}
            className="w-full mt-4"
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Products Section */}
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Active Filters Display */}
        {Object.keys(filters).length > 0 && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600">Active filters:</span>
              {Object.entries(filters).map(([filterType, filterValues]) =>
                filterValues.map((value) => {
                  const filterSection = filterConfig.find((f) => f.id === filterType);
                  const option = filterSection?.options.find((o) => o.id === value);

                  return (
                    <span
                      key={`${filterType}-${value}`}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground"
                    >
                      {option?.label || value}
                      <button
                        onClick={() => handleFilter(filterType, value)}
                        className="ml-1 hover:bg-primary-foreground hover:text-primary rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  );
                })
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem.id || productItem._id}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;