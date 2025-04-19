import React from "react";
import {
  Bot,
  ShoppingCart,
  Receipt,
  CreditCard,
  CheckCircle,
  Copy,
} from "lucide-react";

const CustomerJourney = () => {
  const steps = [
    {
      id: 1,
      icon: Bot,
      title: "Use /buy Command",
      description:
        "Start by typing the /buy command in any Discord channel where the bot is present",
      preview: (
        <div className="bg-[#2B2D31] p-3 rounded-lg border border-white/10 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-xs">
              U
            </div>
            <div>
              <span className="font-medium">User</span>
              <span className="text-white/50 text-xs ml-2">
                Today at 12:34 PM
              </span>
            </div>
          </div>
          <div className="pl-10 text-white/90 font-mono">/buy</div>
        </div>
      ),
    },
    {
      id: 2,
      icon: ShoppingCart,
      title: "Browse Products",
      description:
        "The bot displays all available products in an interactive embed",
      preview: (
        <div className="bg-[#2B2D31] p-3 rounded-lg border border-white/10 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div>
              <span className="font-medium">Store Bot</span>
              <span className="text-white/50 text-xs ml-2">
                Today at 12:34 PM
              </span>
            </div>
          </div>
          <div className="pl-10">
            <div className="bg-[#383A40] p-3 rounded-lg border-l-4 border-primary">
              <div className="font-semibold mb-2">Store Products</div>
              <div className="flex flex-col gap-4 mb-3">
                <span>Premium Plan</span>
                <span>Discord Nitro</span>
              </div>
              <div className="flex gap-2 rounded bg-slate-900/40 py-2">
                <div className=" text-white px-3 py-1 rounded-md text-sm">
                  {" "}
                  /buy{" "}
                  <span className="bg-slate-900 px-2 py-1 rounded-md">
                    Product Name
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      icon: Receipt,
      title: "View Invoice",
      description:
        "After selecting an item, the bot displays an invoice with order details",
      preview: (
        <div className="bg-[#2B2D31] p-3 flex flex-col gap-2 rounded-lg border border-white/10 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div>
              <span className="font-medium">Store Bot</span>
              <span className="text-white/50 text-xs ml-2">
                Today at 12:35 PM
              </span>
            </div>
          </div>
          <div className="pl-10">
            <div className="bg-[#383A40] p-3 rounded-lg border-l-4 border-primary">
              <div className="font-semibold mb-1">Order Invoice</div>
              <div className="text-xs text-white/70 mb-3">Order ID: #58912</div>
              <div className="bg-[#2B2D31] p-2 rounded mb-3">
                <div className="flex justify-between mb-1">
                  <span>Premium Plan</span>
                  <span>$9.99</span>
                </div>
                <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$9.99</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 pl-10">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
              bKash
            </div>
            <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
              Rocket
            </div>
            <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
              PayPal
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Select Payment",
      description:
        "Choose from available payment methods to proceed with your purchase",
      preview: (
        <div className="bg-[#2B2D31] p-3 rounded-lg border border-white/10 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div>
              <span className="font-medium">Store Bot</span>
              <span className="text-white/50 text-xs ml-2">
                Today at 12:36 PM
              </span>
            </div>
          </div>
          <div className="pl-10">
            <div className="bg-[#383A40] p-3 rounded-lg border-l-4 border-primary">
              <div className="font-semibold mb-2">Payment Details</div>
              <div className="bg-[#2B2D31] p-3 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={16} className="text-blue-400" />
                  <span className="font-medium">bKash Payment</span>
                </div>
                <p className="text-sm text-white/70 mb-3">
                  Complete your payment by clicking the secure payment link
                  below.
                </p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1920px-QR_code_for_mobile_English_Wikipedia.svg.png"
                  alt="bKash"
                  className="w-1/2 bg-white"
                />
                <div className="flex items-center justify-between gap-2 bg-slate-900 mt-2 w-1/2 px-3 py-2 rounded">
                  <div className="text-white w-1/2 px-3 rounded-md text-sm font-medium">
                    +018711234234324
                  </div>
                  <Copy size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "Complete Purchase",
      description:
        "Finish your payment and receive confirmation of your purchase",
      preview: (
        <div className="bg-[#2B2D31] p-3 rounded-lg border border-white/10 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div>
              <span className="font-medium">Store Bot</span>
              <span className="text-white/50 text-xs ml-2">
                Today at 12:38 PM
              </span>
            </div>
          </div>
          <div className="pl-10">
            <div className="bg-[#383A40] p-3 rounded-lg border-l-4 border-green-500">
              <div className="font-semibold mb-1 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Payment Successful
              </div>
              <div className="text-xs text-white/70 mb-3">Order ID: #58912</div>
              <p className="text-sm">
                Thank you for your purchase! Your Premium Plan is now active.
              </p>
              <div className="mt-3 text-xs text-white/70">
                Need help? Use /support to contact our team
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="py-20 relative overflow-hidden" id="customer-journey">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple Customer Journey</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            See how easy it is for your customers to make purchases through our
            Discord bot
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/80 to-primary/20 hidden md:block"
            style={{ transform: "translateX(-50%)" }}
          ></div>

          <div className="space-y-12 md:space-y-24 relative">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-6 md:gap-10`}
              >
                {/* Step number and content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white z-10">
                      <step.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-lg text-white/70 mb-4 pl-16">
                    {step.description}
                  </p>
                </div>

                {/* Preview */}
                <div className="flex-1 transform hover:scale-105 transition-transform duration-300 shadow-xl">
                  {step.preview}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-primary/20 to-primary/20 px-6 py-2 rounded-full text-lg font-medium">
            Ready to get started?{" "}
            <span className="text-primary font-bold">
              Add the bot to your server now!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerJourney;
