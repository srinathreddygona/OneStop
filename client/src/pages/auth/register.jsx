

import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ShoppingBag } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    dispatch(registerUser(formData)).then((data) => {
      setIsLoading(false);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-100 via-light-blue-100 to-blue-200 px-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-cyan-300 via-light-blue-100 to-blue-200 shadow-2xl rounded-3xl border-0">
        <CardHeader className="text-center pb-4 pt-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-md">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-1">
            Create New Account
          </CardTitle>
          <p className="text-stone-500 text-sm">
            Join us to explore a curated collection of the latest tech, fashion, and diverse products from across top brands and industries.
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <div className="space-y-5">
            {/* Username Field */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                value={formData.userName}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing up...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link className="text-black-600 hover:text-rose-800 font-semibold" to="/auth/login">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthRegister;