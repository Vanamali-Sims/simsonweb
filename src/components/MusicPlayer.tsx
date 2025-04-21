'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import styles from '../app/page.module.css';

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Try to start playing when component mounts
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
      setIsPlaying(true);
    }
  }, []);

  const toggleMute = () => {
    if (iframeRef.current) {
      const message = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"' + message + '","args":""}',
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (iframeRef.current) {
      const message = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"' + message + '","args":""}',
        '*'
      );
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.musicContainer}>
      <iframe
        ref={iframeRef}
        className={styles.musicPlayer}
        src="https://www.youtube.com/embed/cziSQmHNHQs?enablejsapi=1&autoplay=1&mute=0&controls=1&loop=1&playlist=cziSQmHNHQs&playsinline=1"
        title="Lofi music stream"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className={styles.controls}>
        <button 
          onClick={togglePlay}
          className={styles.muteToggle}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button 
          onClick={toggleMute}
          className={styles.muteToggle}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
      <p className={styles.musicCaption}>
        Aesthetic lofi mix 🌙✨
      </p>
    </div>
  );
}