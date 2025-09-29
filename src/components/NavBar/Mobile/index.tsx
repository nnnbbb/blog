import { useEffect, useState } from "react";
import { navItems } from "../nav-item.interface";
import MobileFunctionPanel from "./mobile-function-panel";
import MobileSearchPanel from "./mobile-search-panel";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MobileNavBar() {
  const router = useRouter()
  const [showFunctionPanel, setShowFunctionPanel] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  return (
    <>
      <AnimatePresence>
        {!(showFunctionPanel || showSearchPanel) && (
          <motion.div
            className="small-nav left"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ originY: 0.5 }}
            onClick={() => router.push("/")}
          >
            <div className="website-icon">
              <img
                src="/favicon.png"
                alt=""
                height="45"
                width="45"
              />
              <span>神机阁</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 添加移动端元素 */}
      {/* 搜索 */}
      <MobileSearchPanel
        show={showSearchPanel}
        setShow={setShowSearchPanel}
      />
      {/* 菜单 */}
      <MobileFunctionPanel
        show={showFunctionPanel}
        setShow={setShowFunctionPanel}
        navItems={navItems}
      />


      <AnimatePresence>
        {!(showFunctionPanel || showSearchPanel) && (
          <motion.div
            className="mobile-nav-right"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ originY: 0.5 }}
          >
            <div className="mobile-search-btn" onClick={() => setShowSearchPanel(true)}>
              <span className="iconfont icon-search"></span>
            </div>
            <div className="mobile-menu-btn" onClick={() => setShowFunctionPanel(true)}>
              <span className="iconfont icon-more"></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
