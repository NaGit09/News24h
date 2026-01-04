import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Custom hook for keyboard shortcuts
 * Provides quick navigation and actions via keyboard
 */
export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Alt + H: Go to home
      if (event.altKey && event.key === "h") {
        event.preventDefault();
        navigate("/");
      }

      // Alt + G: Go to gold price
      if (event.altKey && event.key === "g") {
        event.preventDefault();
        navigate("/gia-vang");
      }

      // Alt + Arrow Up: Scroll to top
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Alt + Arrow Down: Scroll to bottom
      if (event.altKey && event.key === "ArrowDown") {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }

      // Escape: Go back
      if (event.key === "Escape") {
        event.preventDefault();
        window.history.back();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);
}
