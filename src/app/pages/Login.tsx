import { useState } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Send, Mail } from "lucide-react";

export function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
    console.log("Login:", formData);
    alert("Вход выполнен успешно!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold mb-2">
              {t("loginTitle")}
            </h1>
            <p className="text-muted-foreground">
              {t("loginSubtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email or Phone */}
            <div className="space-y-2">
              <Label htmlFor="emailOrPhone">
                {t("emailOrPhone")}
              </Label>
              <Input
                id="emailOrPhone"
                type="text"
                value={formData.emailOrPhone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emailOrPhone: e.target.value,
                  })
                }
                required
                className="bg-white"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                required
                className="bg-white"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                {t("forgotPassword")}
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              style={{
                backgroundColor: "var(--blue)",
                color: "white",
              }}
            >
              {t("loginButton")}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-muted-foreground">
                {t("orContinueWith")}
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-[#0088cc] text-white hover:bg-[#0077b3] border-0"
              onClick={() =>
                window.open(
                  "https://t.me/LostFoundAgentBot",
                  "_blank",
                )
              }
            >
              <Send className="w-5 h-5 mr-2" />
              {t("loginWithTelegram")}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
            >
              <Mail className="w-5 h-5 mr-2" />
              {t("loginWithGoogle")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}