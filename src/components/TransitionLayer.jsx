import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function TransitionLayer() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="route-transition"
        initial={{ opacity: 1, scaleX: 1 }}
        animate={{ opacity: 0, scaleX: 0 }}
        exit={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>BLACKOUT / SIGNAL TRANSFER</span>
      </motion.div>
    </AnimatePresence>
  );
}
