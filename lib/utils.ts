import * as jose from "jose";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format time
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Format date
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const customNanoid = customAlphabet(alphabet, 10);

export const MAX_AUTOCOMPLETE_CHOICES = 25;
export const MAX_EMBED_FIELDS = 25;
export const MAX_ALLOWED_PAYMENT_METHODS = 5;

export const BOT_COMMAND_BUTTON_IDS = {
  PAYMENT_METHOD: "paymentMethod",
  COPY_PHONE_NUMBER: "copyPhoneNumber",
};

export const MODAL_IDS = {
  DELIVERY_PRODUCT: "deliveryProductModal",
  UPDATE_PAYMENT_METHOD: "updatePaymentMethodModal",
  ADD_PAYMENT_METHOD: "addPaymentMethodModal",
  UPDATE_PRODUCT: "updateProductModal",
  ADD_PRODUCT: "addProductModal",
};

export type DecodedToken = jose.JWTPayload & {
  userId: string;
  role: string;
  guildId: string;
  guildName: string;
};

export const decodeJWT = async (token: string) => {
  if (!token) {
    return null;
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload as DecodedToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
