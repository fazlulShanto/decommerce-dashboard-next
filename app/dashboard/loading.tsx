import { Loader2 } from "lucide-react";

export default function loader() {
  return (
    <div className="h-screen w-screen items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  );
}
