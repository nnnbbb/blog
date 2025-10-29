import "./style.css"
import { FunctionTabs } from "@/components/Function-Tabls"
import { toolsTabs } from "./tools.interface"

export default function Tools() {
  return (
    <div className="" style={{ minHeight: 2500, height: "fit-content" }}>
      <section className="" style={{}}>
        <div className="page-header">
          <h1 className="page-title">KTools</h1>
          <p className="page-description">
            {" "}
            我会在这个平台上分享我开发的一些小工具，
            <br /> 当然，许多工具都是为了我个人能够使用方便而开发的。{" "}
          </p>
        </div>
        <FunctionTabs tabs={toolsTabs} />
      </section>
    </div>
  )
}
