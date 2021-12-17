import ReactPlayer from 'react-player';

const Video = () => {
    return (
        <div className="video-container">
            <ReactPlayer 
                className={"video-box"}
                url={"https://www.youtube.com/watch?v=vxgjbqMGObg&ab_channel=Scrimba"}
                muted={false}
                controls={false}
                playing={true}
                muted={true}
                height={"100%"}
                width={"100%"}
            />
        </div>
    )
}

export default Video;