export function Video() {
    return (
      <video  autoPlay controls preload="true" className="my-video">
        <source src="/tamboula.mp4" type="video/mp4" />
      
        Your browser does not support the video tag.
      </video>
    )
  }