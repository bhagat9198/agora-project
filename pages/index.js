import TabContainer from "../components/tabs/tabContainer";
// import VideoPanelHost from "../components/videopanel/videoPanelHost";
// import VideoPanel from "../components/videopanel/videoPanel";
// import './../services/AgoraRTC_N-4.13.0'

import dynamic from "next/dynamic"
const VideoPanelHost = dynamic(() => import("./../components/videopanel/videoPanelHost"), {
  // Do not import in server side
  ssr: false,
})

export default function Home() {
  return (
    <>
      <div className="flex" style={{height: '100vh'}} >
        <div className="w-10/12 " >
          <VideoPanelHost />
        </div>
        <div className="hidden w-2/12 md:block overflow-x-auto">
          <TabContainer />
        </div>
      </div>
    </>
  )
}
