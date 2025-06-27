import { useEffect, useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { Search, Filter, X, Calendar, DollarSign } from "lucide-react";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [sortBy, setSortBy] = useState("orderDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  // Get unique order statuses for filter dropdown
  const uniqueStatuses = useMemo(() => {
    if (!orderList) return [];
    const statuses = [...new Set(orderList.map(order => order.orderStatus))];
    return statuses.filter(Boolean);
  }, [orderList]);

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    if (!orderList) return [];

    let filtered = orderList.filter((order) => {
      // Search filter (Order ID)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        order._id?.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === "all" || 
        order.orderStatus === statusFilter;

      // Date range filter
      const orderDate = new Date(order.orderDate);
      const fromDate = dateFromFilter ? new Date(dateFromFilter) : null;
      const toDate = dateToFilter ? new Date(dateToFilter + "T23:59:59") : null;
      
      const matchesDateRange = (!fromDate || orderDate >= fromDate) && 
        (!toDate || orderDate <= toDate);

      // Price range filter
      const orderPrice = parseFloat(order.totalAmount) || 0;
      const minPrice = minPriceFilter ? parseFloat(minPriceFilter) : null;
      const maxPrice = maxPriceFilter ? parseFloat(maxPriceFilter) : null;
      
      const matchesPriceRange = (!minPrice || orderPrice >= minPrice) && 
        (!maxPrice || orderPrice <= maxPrice);

      return matchesSearch && matchesStatus && matchesDateRange && matchesPriceRange;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "orderDate":
          aValue = new Date(a.orderDate);
          bValue = new Date(b.orderDate);
          break;
        case "totalAmount":
          aValue = parseFloat(a.totalAmount) || 0;
          bValue = parseFloat(b.totalAmount) || 0;
          break;
        case "orderStatus":
          aValue = a.orderStatus?.toLowerCase() || "";
          bValue = b.orderStatus?.toLowerCase() || "";
          break;
        case "_id":
          aValue = a._id?.toLowerCase() || "";
          bValue = b._id?.toLowerCase() || "";
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [orderList, searchTerm, statusFilter, dateFromFilter, dateToFilter, minPriceFilter, maxPriceFilter, sortBy, sortOrder]);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  function clearAllFilters() {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFromFilter("");
    setDateToFilter("");
    setMinPriceFilter("");
    setMaxPriceFilter("");
    setSortBy("orderDate");
    setSortOrder("desc");
  }

  const hasActiveFilters = searchTerm || statusFilter !== "all" || dateFromFilter || dateToFilter || minPriceFilter || maxPriceFilter;

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>All Orders</span>
          <span className="text-sm font-normal text-gray-500">
            {filteredAndSortedOrders.length} of {orderList?.length || 0} orders
          </span>
        </CardTitle>
      </CardHeader>
      
      {/* Filter Section */}
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-4 bg-gray-50/50">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="ml-auto text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search by Order ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Order ID</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Enter Order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date From */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Date From
              </label>
              <Input
                type="date"
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
              />
            </div>

            {/* Date To */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Date To
              </label>
              <Input
                type="date"
                value={dateToFilter}
                onChange={(e) => setDateToFilter(e.target.value)}
              />
            </div>

            {/* Min Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Min Price
              </label>
              <Input
                type="number"
                placeholder="0"
                value={minPriceFilter}
                onChange={(e) => setMinPriceFilter(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            {/* Max Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Max Price
              </label>
              <Input
                type="number"
                placeholder="No limit"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orderDate">Order Date</SelectItem>
                  <SelectItem value="totalAmount">Price</SelectItem>
                  <SelectItem value="orderStatus">Status</SelectItem>
                  <SelectItem value="_id">Order ID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort Order</label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedOrders && filteredAndSortedOrders.length > 0 ? (
              filteredAndSortedOrders.map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell className="font-mono text-sm">
                    {orderItem?._id}
                  </TableCell>
                  <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500 hover:bg-green-600"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600 hover:bg-red-700"
                          : orderItem?.orderStatus === "pending"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : orderItem?.orderStatus === "inProcess"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : orderItem?.orderStatus === "inShipping"
                          ? "bg-purple-500 hover:bg-purple-600"
                          : orderItem?.orderStatus === "delivered"
                          ? "bg-green-700 hover:bg-green-800"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${orderItem?.totalAmount}
                  </TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        size="sm"
                      >
                        View Details
                      </Button>
                      <AdminOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="text-gray-500">
                    {hasActiveFilters ? (
                      <div>
                        <p>No orders match the current filters.</p>
                        <Button
                          variant="link"
                          onClick={clearAllFilters}
                          className="mt-2"
                        >
                          Clear filters to show all orders
                        </Button>
                      </div>
                    ) : (
                      "No orders available"
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;