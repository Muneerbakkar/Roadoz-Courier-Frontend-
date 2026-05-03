import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export default function PickupAddressModal({
  isOpen,
  onClose,
  pickupForm,
  handlePickupChange,
  handleSavePickup,
  loading,
  error,
  inputClass,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-card-bg border border-border-subtle rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-border-subtle">
          <h2 className="text-xl font-semibold text-text-main">
            Add Pickup Address
          </h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* FORM */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="nickname"
            value={pickupForm.nickname}
            onChange={handlePickupChange}
            placeholder="Address Nickname*"
            className={inputClass}
          />
          <input
            name="contact_name"
            value={pickupForm.contact_name}
            onChange={handlePickupChange}
            placeholder="Contact Name*"
            className={inputClass}
          />
          <input
            name="phone"
            value={pickupForm.phone}
            onChange={handlePickupChange}
            placeholder="Phone*"
            className={inputClass}
          />
          <input
            name="email"
            value={pickupForm.email}
            onChange={handlePickupChange}
            placeholder="Email"
            type="email"
            className={inputClass}
          />
          <input
            name="address_line_1"
            value={pickupForm.address_line_1}
            onChange={handlePickupChange}
            placeholder="Address Line 1*"
            className={inputClass}
          />
          <input
            name="address_line_2"
            value={pickupForm.address_line_2}
            onChange={handlePickupChange}
            placeholder="Address Line 2"
            className={inputClass}
          />
          <input
            name="pincode"
            value={pickupForm.pincode}
            onChange={handlePickupChange}
            placeholder="Pincode*"
            className={inputClass}
          />
          <input
            name="city"
            value={pickupForm.city}
            onChange={handlePickupChange}
            placeholder="City*"
            className={inputClass}
          />
          <input
            name="state"
            value={pickupForm.state}
            onChange={handlePickupChange}
            placeholder="State*"
            className={inputClass}
          />
          <input
            name="country"
            value={pickupForm.country}
            onChange={handlePickupChange}
            className={`${inputClass} bg-dashboard-bg`}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="px-6 pb-2 text-red-500 text-sm">
            {Array.isArray(error) ? error[0]?.msg : error}
          </div>
        )}

        {/* FOOTER */}
        <div className="p-6 border-t border-border-subtle flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-sm px-6 py-2.5 hover:bg-text-muted/5 rounded-lg"
          >
            Close
          </button>

          <Button
            onClick={handleSavePickup}
            disabled={loading}
            className="bg-primary text-black px-8 py-2.5 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

