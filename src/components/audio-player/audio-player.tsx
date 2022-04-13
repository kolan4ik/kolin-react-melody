import { useRef, useState, useEffect } from 'react';

type AudioPlayerProps = {
  isPlaying: boolean,
  src: string,
  onPlayButtonClick: () => void;
}

function AudioPlayer ({isPlaying, src, onPlayButtonClick} : AudioPlayerProps) : JSX.Element{
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if(audioRef.current !== null){
      audioRef.current.onloadeddata = () => setIsLoading(false);
    }

    return () => {
      if(audioRef.current !== null){
        audioRef.current.onloadeddata = null;
        audioRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if(audioRef.current === null){
      return;
    }
    if(isPlaying){
      audioRef.current.play();
      return;
    }
    audioRef.current.pause();

  }, [isPlaying]);

  return (
    <>
      <button className={`track__button track__button--${isPlaying ? 'pause': 'play'}`} disabled={isLoading} onClick={onPlayButtonClick } type="button"></button>
      <div className="track__status">
        <audio ref={audioRef} src={src}></audio>
      </div>
    </>

  );
}

export default AudioPlayer;
