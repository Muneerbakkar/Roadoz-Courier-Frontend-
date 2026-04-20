import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVerify } from "../../redux/profileSlice";
import { motion } from "framer-motion";
import { X, Mail, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

export default function VerifyOtpModal({ onClose, newPassword }) {
  const dispatch = useDispatch();
  const { otpLoading } = useSelector((s) => s.profile);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    const loadingToast = toast.loading("Verifying OTP...");

    try {
      await dispatch(
        changePasswordVerify({
          otp: finalOtp,
        }),
      ).unwrap();

      toast.dismiss(loadingToast);
      toast.success("Password updated successfully");

      onClose();
    } catch (err) {
      toast.dismiss(loadingToast);

      console.log("ERROR:", err);

      toast.error(err?.message || err?.detail || "OTP verification failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-md border border-border-subtle"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <ShieldCheck className="text-primary" size={20} />
            </div>
            <h3 className="text-lg font-bold text-text-main">Verify OTP</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-dashboard-bg rounded-full text-text-muted"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="text-primary" size={28} />
          </div>

          <div>
            <h2 className="text-xl font-bold">Check your email</h2>
            <p className="text-sm text-text-muted">
              Enter the verification code sent to your email
            </p>
          </div>

          {/* OTP boxes */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 text-center text-lg font-bold rounded-xl border border-border-subtle 
                focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary"
              />
            ))}
          </div>

          <p className="text-xs text-text-muted">
            Didn’t get a code?{" "}
            <span className="text-primary font-bold cursor-pointer hover:underline">
              resend
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border-subtle">
          <Button
            onClick={handleVerify}
            disabled={otpLoading}
            className="w-full h-12 bg-primary text-black font-bold rounded-xl"
          >
            {otpLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
