import { useRef } from "react";
// @ts-ignore
import videoSrc from "../live/Mountain.mp4";

export default function ScrollVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="fixed inset-0 z-[-2] w-full h-full overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className="w-full h-full object-cover"
      />
      {/* 
          Vignette and subtle overlay to ensure content readability 
          and give it a premium cinematic feel.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
    </div>
  );
}
