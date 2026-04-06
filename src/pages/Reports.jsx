import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export function Reports() {
  const orderFields = [
    "Buyer Mobile", "Buyer Name", "Buyer State", "Breadth",
    "Order Date", "Address 1", "PinCode", "Order Status",
    "Total Order Qty", "Weight", "Address", "Amount",
    "Shipping Charges", "Payment Type", "Phone", "Length",
    "City", "Height", "Product Details"
  ];

  const shipmentFields = [
    "Shipment Date", "Delivered Time", "Courier Name", "AWB Number",
    "RTO Deliverd Time", "Remittance ID", "Zone"
  ];

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedShipments, setSelectedShipments] = useState([]);

  const handleToggleOrder = (field) => {
    setSelectedOrders(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleToggleShipment = (field) => {
    setSelectedShipments(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleSelectAllOrders = (e) => {
    if (e.target.checked) {
      setSelectedOrders(orderFields);
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectAllShipments = (e) => {
    if (e.target.checked) {
      setSelectedShipments(shipmentFields);
    } else {
      setSelectedShipments([]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Generate Report</h1>
        <p className="text-sm text-primary mt-1 font-medium">
          <Link
            to="/"
            className="hover:underline cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-text-muted mx-1">&gt;&gt;</span> Generate Report
        </p>
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-text-main mb-6 border-b border-border-subtle pb-4">Report Configurations</h2>

            <div className="space-y-2 max-w-sm mb-10">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Date Range</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select date range"
                  className="w-full bg-dashboard-bg border border-border-subtle rounded-md pl-3 pr-10 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                  <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                    Orders Fields
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="select-all-orders"
                      checked={selectedOrders.length === orderFields.length}
                      onChange={handleSelectAllOrders}
                      className="w-4 h-4 rounded border-border-subtle text-primary accent-primary cursor-pointer"
                    />
                    <label htmlFor="select-all-orders" className="text-sm font-bold text-primary cursor-pointer">Select All</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
                  {orderFields.map((field) => (
                    <label key={field} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id={`order-${field}`}
                        checked={selectedOrders.includes(field)}
                        onChange={() => handleToggleOrder(field)}
                        className="w-4 h-4 rounded border-border-subtle text-primary accent-primary cursor-pointer"
                      />
                      <span className="text-sm text-text-main group-hover:text-primary transition-colors">{field}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                  <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                    Shipment Fields
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="select-all-shipments"
                      checked={selectedShipments.length === shipmentFields.length}
                      onChange={handleSelectAllShipments}
                      className="w-4 h-4 rounded border-border-subtle text-primary accent-primary cursor-pointer"
                    />
                    <label htmlFor="select-all-shipments" className="text-sm font-bold text-primary cursor-pointer">Select All</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
                  {shipmentFields.map((field) => (
                    <label key={field} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id={`shipment-${field}`}
                        checked={selectedShipments.includes(field)}
                        onChange={() => handleToggleShipment(field)}
                        className="w-4 h-4 rounded border-border-subtle text-primary accent-primary cursor-pointer"
                      />
                      <span className="text-sm text-text-main group-hover:text-primary transition-colors">{field}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8 border-t border-border-subtle mt-8">
            <Button className="bg-primary hover:bg-primary/90 text-black h-11 px-12 font-bold rounded-md shadow-md transition-all active:scale-95">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}