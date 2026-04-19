import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordRequest } from "../../redux/profileSlice";
import { motion } from "framer-motion";
import { Lock, X, RotateCcw, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

export default function ChangePasswordModal({ onClose, onSuccess }) {
  const dispatch = useDispatch();
  const { passwordLoading } = useSelector((s) => s.profile);

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.new_password !== form.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        changePasswordRequest({
          old_password: form.old_password,
          new_password: form.new_password,
          confirm_password: form.confirm_password,
        }),
      ).unwrap();

      onSuccess(form.new_password);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-md border border-border-subtle flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-dashboard-bg/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Lock className="text-primary" size={20} />
            </div>
            <h3 className="text-lg font-bold text-text-main">
              Update Password
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-dashboard-bg rounded-full text-text-muted"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-card-bg space-y-5">
          <InputField
            label="Old Password *"
            name="old_password"
            value={form.old_password}
            onChange={handleChange}
          />

          <InputField
            label="New Password *"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
          />

          <InputField
            label="Confirm Password *"
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-5 border-t border-border-subtle bg-dashboard-bg/50">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <RotateCcw size={14} /> Cancel
          </button>

          <Button
            onClick={handleSubmit}
            disabled={passwordLoading}
            className="bg-primary text-black h-10 px-8 font-bold rounded-xl flex items-center gap-2"
          >
            {passwordLoading ? "Sending OTP..." : "Update Password"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-text-muted uppercase ml-1">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className="w-full bg-dashboard-bg border border-border-subtle rounded-xl px-4 py-2.5 pr-12 text-sm text-text-main focus:border-primary focus:outline-none"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
