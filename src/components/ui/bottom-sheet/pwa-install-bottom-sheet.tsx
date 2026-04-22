"use client";

import { useEffect, useState } from "react";
import { BottomSheet } from "@/components/ui/bottom-sheet/bottom-sheet";
import { Button } from "@/components/ui/button";

export default function PwaInstallBottomSheet() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }
    // Also check iOS standalone
    if ((window.navigator as unknown as { standalone?: boolean }).standalone === true) {
      return;
    }

    const hasPrompted = localStorage.getItem("pwaPrompted");
    if (hasPrompted) {
      // Omit prompting if we already dismissed recently, 
      // but for demonstration we'll just check if it's there
      // We can expire it after some days if we want
      const diff = Date.now() - parseInt(hasPrompted, 10);
      const days = diff / (1000 * 60 * 60 * 24);
      if (days < 7) return; // Wait 7 days before prompting again
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    
    if (isIOSDevice) {
      setIsIos(true);
      // Wait a bit before showing to not disrupt immediate UX
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Wait a bit before showing
      setTimeout(() => setIsOpen(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      (deferredPrompt as unknown as { prompt: () => void }).prompt();
      const { outcome } = await (deferredPrompt as unknown as { userChoice: Promise<{ outcome: string }> }).userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      }
      setDeferredPrompt(null);
    }
    closePrompt();
  };

  const closePrompt = () => {
    setIsOpen(false);
    localStorage.setItem("pwaPrompted", Date.now().toString());
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={closePrompt} title="Install Sushiro Calculator">
      <div className="flex flex-col gap-4 mt-4">
        <p className="text-sm text-gray-600">
          {isIos ? (
            <>
              To install this app on your iOS device, tap the <strong>Share</strong> button 
              at the bottom of your screen and then tap <strong>Add to Home Screen</strong>.
            </>
          ) : (
            "Install our app on your device for quick access and better experience!"
          )}
        </p>

        <div className="flex gap-2 w-full mt-4">
          <Button type="secondary" className="w-1/2" onClick={closePrompt} label="Maybe Later" />
          {!isIos && (
             <Button type="primary" className="w-1/2 bg-red-600 text-white" onClick={handleInstall} label="Install" />
          )}
        </div>
      </div>
    </BottomSheet>
  );
}