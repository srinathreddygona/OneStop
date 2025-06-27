// import ProductImageUpload from "@/components/admin-view/image-upload";
// import AdminProductTile from "@/components/admin-view/product-tile";
// import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useToast } from "@/components/ui/use-toast";
// import { addProductFormElements } from "@/config";
// import {
//   addNewProduct,
//   deleteProduct,
//   editProduct,
//   fetchAllProducts,
// } from "@/store/admin/products-slice";
// import { Search, ChevronLeft, ChevronRight } from "lucide-react";
// import { Fragment, useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const initialFormData = {
//   image: null,
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: "",
//   averageReview: 0,
// };

// function AdminProducts() {
//   const [openCreateProductsDialog, setOpenCreateProductsDialog] =
//     useState(false);
//   const [formData, setFormData] = useState(initialFormData);
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const [currentEditedId, setCurrentEditedId] = useState(null);
  
//   // Search and pagination states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(12);
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");

//   const { productList } = useSelector((state) => state.adminProducts);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   // Filter and sort products based on search term and sorting options
//   const filteredAndSortedProducts = useMemo(() => {
//     if (!productList) return [];

//     let filtered = productList.filter((product) => {
//       const searchLower = searchTerm.toLowerCase();
//       return (
//         product.title?.toLowerCase().includes(searchLower) ||
//         product.category?.toLowerCase().includes(searchLower) ||
//         product.brand?.toLowerCase().includes(searchLower) ||
//         product.description?.toLowerCase().includes(searchLower)
//       );
//     });

//     // Sort products
//     filtered.sort((a, b) => {
//       let aValue = a[sortBy];
//       let bValue = b[sortBy];

//       // Handle numeric sorting for price
//       if (sortBy === "price" || sortBy === "salePrice") {
//         aValue = parseFloat(aValue) || 0;
//         bValue = parseFloat(bValue) || 0;
//       }

//       // Handle string sorting
//       if (typeof aValue === "string") {
//         aValue = aValue.toLowerCase();
//         bValue = bValue.toLowerCase();
//       }

//       if (sortOrder === "asc") {
//         return aValue > bValue ? 1 : -1;
//       } else {
//         return aValue < bValue ? 1 : -1;
//       }
//     });

//     return filtered;
//   }, [productList, searchTerm, sortBy, sortOrder]);

//   // Pagination calculations
//   const totalItems = filteredAndSortedProducts.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

//   // Reset to first page when search term changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, sortBy, sortOrder]);

//   function onSubmit(event) {
//     event.preventDefault();

//     currentEditedId !== null
//       ? dispatch(
//           editProduct({
//             id: currentEditedId,
//             formData,
//           })
//         ).then((data) => {
//           console.log(data, "edit");

//           if (data?.payload?.success) {
//             dispatch(fetchAllProducts());
//             setFormData(initialFormData);
//             setOpenCreateProductsDialog(false);
//             setCurrentEditedId(null);
//           }
//         })
//       : dispatch(
//           addNewProduct({
//             ...formData,
//             image: uploadedImageUrl,
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllProducts());
//             setOpenCreateProductsDialog(false);
//             setImageFile(null);
//             setFormData(initialFormData);
//             toast({
//               title: "Product add successfully",
//             });
//           }
//         });
//   }

//   function handleDelete(getCurrentProductId) {
//     dispatch(deleteProduct(getCurrentProductId)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllProducts());
//       }
//     });
//   }

//   function isFormValid() {
//     return Object.keys(formData)
//       .filter((currentKey) => currentKey !== "averageReview")
//       .map((key) => formData[key] !== "")
//       .every((item) => item);
//   }

//   function handlePageChange(newPage) {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   }

//   function handleItemsPerPageChange(value) {
//     setItemsPerPage(parseInt(value));
//     setCurrentPage(1);
//   }

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   console.log(formData, "productList");

//   return (
//     <Fragment>
//       {/* Header section with search and add button */}
//       <div className="mb-6 space-y-4">
//         <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//           <h1 className="text-2xl font-bold">Products Management</h1>
//           <Button onClick={() => setOpenCreateProductsDialog(true)}>
//             Add New Product
//           </Button>
//         </div>

//         {/* Search and filter section */}
//         <div className="flex flex-col sm:flex-row gap-4 items-center">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search products by title, category, brand..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
          
//           <div className="flex gap-2 items-center">
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-32">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="title">Title</SelectItem>
//                 <SelectItem value="category">Category</SelectItem>
//                 <SelectItem value="brand">Brand</SelectItem>
//                 <SelectItem value="price">Price</SelectItem>
//                 <SelectItem value="totalStock">Stock</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Select value={sortOrder} onValueChange={setSortOrder}>
//               <SelectTrigger className="w-24">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="asc">Asc</SelectItem>
//                 <SelectItem value="desc">Desc</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Results summary */}
//         <div className="flex justify-between items-center text-sm text-gray-600">
//           <span>
//             Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} products
//             {searchTerm && ` for "${searchTerm}"`}
//           </span>
//           <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
//             <SelectTrigger className="w-24">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="8">8</SelectItem>
//               <SelectItem value="12">12</SelectItem>
//               <SelectItem value="24">24</SelectItem>
//               <SelectItem value="48">48</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Products grid */}
//       <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-6">
//         {currentProducts && currentProducts.length > 0 ? (
//           currentProducts.map((productItem) => (
//             <AdminProductTile
//               key={productItem.id}
//               setFormData={setFormData}
//               setOpenCreateProductsDialog={setOpenCreateProductsDialog}
//               setCurrentEditedId={setCurrentEditedId}
//               product={productItem}
//               handleDelete={handleDelete}
//             />
//           ))
//         ) : (
//           <div className="col-span-full text-center py-8">
//             <p className="text-gray-500">
//               {searchTerm ? `No products found for "${searchTerm}"` : "No products available"}
//             </p>
//             {searchTerm && (
//               <Button
//                 variant="link"
//                 onClick={() => setSearchTerm("")}
//                 className="mt-2"
//               >
//                 Clear search
//               </Button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-center gap-2 mt-6">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft className="h-4 w-4" />
//             Previous
//           </Button>

//           <div className="flex gap-1">
//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               let pageNumber;
//               if (totalPages <= 5) {
//                 pageNumber = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNumber = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNumber = totalPages - 4 + i;
//               } else {
//                 pageNumber = currentPage - 2 + i;
//               }

//               return (
//                 <Button
//                   key={pageNumber}
//                   variant={currentPage === pageNumber ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => handlePageChange(pageNumber)}
//                   className="w-10"
//                 >
//                   {pageNumber}
//                 </Button>
//               );
//             })}
//           </div>

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       )}

//       {/* Product form sheet */}
//       <Sheet
//         open={openCreateProductsDialog}
//         onOpenChange={() => {
//           setOpenCreateProductsDialog(false);
//           setCurrentEditedId(null);
//           setFormData(initialFormData);
//         }}
//       >
//         <SheetContent side="right" className="overflow-auto">
//           <SheetHeader>
//             <SheetTitle>
//               {currentEditedId !== null ? "Edit Product" : "Add New Product"}
//             </SheetTitle>
//           </SheetHeader>
//           <ProductImageUpload
//             imageFile={imageFile}
//             setImageFile={setImageFile}
//             uploadedImageUrl={uploadedImageUrl}
//             setUploadedImageUrl={setUploadedImageUrl}
//             setImageLoadingState={setImageLoadingState}
//             imageLoadingState={imageLoadingState}
//             isEditMode={currentEditedId !== null}
//           />
//           <div className="py-6">
//             <CommonForm
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               buttonText={currentEditedId !== null ? "Edit" : "Add"}
//               formControls={addProductFormElements}
//               isBtnDisabled={!isFormValid()}
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   );
// }

// export default AdminProducts;
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  categoryBrandMapping, 
  categories, 
  getBrandsByCategory 
} from "@/config/category-brand-config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

// Dynamic form elements generator
const generateFormElements = (selectedCategory) => [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: categories,
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: getBrandsByCategory(selectedCategory),
    disabled: !selectedCategory,
    placeholder: selectedCategory ? "Select brand" : "Select category first",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  
  // Search and pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Dynamic form elements based on selected category
  const formElements = useMemo(() => {
    return generateFormElements(formData.category);
  }, [formData.category]);

  // Custom form data setter that handles category-brand relationship
  const handleFormDataChange = (newFormData) => {
    // If category changed, reset brand
    if (newFormData.category !== formData.category) {
      setFormData({
        ...newFormData,
        brand: ""
      });
    } else {
      setFormData(newFormData);
    }
  };

  // Filter and sort products based on search term, category, and sorting options
  const filteredAndSortedProducts = useMemo(() => {
    if (!productList) return [];

    let filtered = productList.filter((product) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || (
        product.title?.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower) ||
        product.brand?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
      );

      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle numeric sorting for price
      if (sortBy === "price" || sortBy === "salePrice") {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      // Handle string sorting
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [productList, searchTerm, categoryFilter, sortBy, sortOrder]);

  // Pagination calculations
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, sortBy, sortOrder]);

  function onSubmit(event) {
    event.preventDefault();

    // Validate that brand is selected if category is selected
    if (formData.category && !formData.brand) {
      toast({
        title: "Please select a brand",
        description: "Brand selection is required when category is selected.",
        variant: "destructive"
      });
      return;
    }

    // Validate that if a category is selected, it has available brands
    if (formData.category && getBrandsByCategory(formData.category).length === 0) {
      toast({
        title: "No brands available",
        description: "Selected category has no available brands. Please choose a different category.",
        variant: "destructive"
      });
      return;
    }

    // Validate that the selected brand is valid for the selected category
    if (formData.category && formData.brand) {
      const availableBrands = getBrandsByCategory(formData.category);
      const isBrandValid = availableBrands.some(brand => brand.id === formData.brand);
      
      if (!isBrandValid) {
        toast({
          title: "Invalid brand selection",
          description: "Selected brand is not available for this category.",
          variant: "destructive"
        });
        return;
      }
    }

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            toast({
              title: "Product updated successfully",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            setUploadedImageUrl("");
            toast({
              title: "Product added successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product deleted successfully",
        });
      }
    });
  }

  function isFormValid() {
    const requiredFields = ['title', 'description', 'category', 'brand', 'price', 'totalStock'];
    return requiredFields.every(field => {
      const value = formData[field];
      return value !== null && value !== undefined && value !== "";
    }) && uploadedImageUrl !== "";
  }

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }

  function handleItemsPerPageChange(value) {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  }

  // Reset form when dialog closes
  const handleDialogClose = () => {
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
  };

  // Handle edit - populate form with existing data
  const handleEdit = (product) => {
    setFormData({
      title: product.title || "",
      description: product.description || "",
      category: product.category || "",
      brand: product.brand || "",
      price: product.price || "",
      salePrice: product.salePrice || "",
      totalStock: product.totalStock || "",
      averageReview: product.averageReview || 0,
    });
    setUploadedImageUrl(product.image || "");
    setCurrentEditedId(product.id || product._id);
    setOpenCreateProductsDialog(true);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log("Form Data:", formData);
  console.log("Available brands for category:", getBrandsByCategory(formData.category));

  return (
    <Fragment>
      {/* Header section with search and add button */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Products Management</h1>
          <Button onClick={() => setOpenCreateProductsDialog(true)}>
            Add New Product
          </Button>
        </div>

        {/* Search and filter section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products by title, category, brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="totalStock">Stock</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Asc</SelectItem>
                <SelectItem value="desc">Desc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results summary */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} products
            {searchTerm && ` for "${searchTerm}"`}
            {categoryFilter !== "all" && ` in ${categories.find(c => c.id === categoryFilter)?.label}`}
          </span>
          <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-6">
        {currentProducts && currentProducts.length > 0 ? (
          currentProducts.map((productItem) => (
            <AdminProductTile
              key={productItem.id || productItem._id}
              setFormData={handleEdit}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== "all" 
                ? `No products found` 
                : "No products available"}
            </p>
            {(searchTerm || categoryFilter !== "all") && (
              <div className="mt-2 space-x-2">
                {searchTerm && (
                  <Button
                    variant="link"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </Button>
                )}
                {categoryFilter !== "all" && (
                  <Button
                    variant="link"
                    onClick={() => setCategoryFilter("all")}
                  >
                    Show all categories
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                  className="w-10"
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Product form sheet */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={handleDialogClose}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={handleFormDataChange}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={formElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;