import { AnimatePresence, motion } from "framer-motion";
import SearchBox from "../SearchBox";

interface MobileSearchPanelProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MobileSearchPanel({
  show,
  setShow,
}: MobileSearchPanelProps) {
  return (
    // <div className="mobile-search-panel" style={{ display: 'none' }}>
    //   <span className="iconfont icon-back"></span>
    //   <SearchBox />
    // </div>

    <AnimatePresence>
      {show && (
        <motion.div
          className="mobile-search-panel"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ originY: 0.5 }}
        >
          <span
            className="iconfont icon-back"
            onClick={() => setShow(false)}
          />
          <SearchBox />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
