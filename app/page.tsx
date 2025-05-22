'use client';

// app/page.tsx (untuk App Router)
import { useState, useEffect, useRef } from 'react';
import styles from './styles/Birthday.module.css';

export default function BirthdayGreeting() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [loveClicks, setLoveClicks] = useState([false, false, false, false]);
  const [showMessages, setShowMessages] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const messages = [
    "ANJAYYYY ULTAH NIH INEM 🤣🤣🤣🤣",
    "Happy Birthday,",
    "Meskipun gatau namamu siapa pokok inem yang kutahu nama e😭😭",
    "Semoga yang disemogakan terkabul oke",
    "Sehat selalu ya!",
    "Semoga ga salah cowo lagi",
    "Oh iya, semoga di hari spesialmu ini kamu dapat menjadi pribadi yang lebih baik lagi yaa.. 🥳🥳🥳🥳",
    "Happy Level Up Day Inem!! 🥳"
  ];

  useEffect(() => {
    if (showMessages) {
      // Tampilkan "Tunggu..." selama 3 detik
      setShowWaiting(true);
      const waitingTimer = setTimeout(() => {
        setShowWaiting(false);
        setCurrentMessageIndex(0); // Mulai dari pesan pertama
      }, 3000);
      return () => clearTimeout(waitingTimer);
    }
  }, [showMessages]);

  const handleNextMessage = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
    }
  };

  const createFallingHeart = () => {
    const heart = document.createElement('div');
    heart.className = styles.fallingHeart;
    heart.innerHTML = '❄️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3) + 2 + 's';
    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 5000);
  };

  const handleGiftClick = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      setShowNameInput(true);
      if (audioRef.current) {
        audioRef.current.play();
        setAudioPlaying(true);
      }
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() && userName.length <= 10) {
      setShowNameInput(false);
      setCurrentStep(2);
      setTimeout(() => setCurrentStep(3), 1000);
    } else {
      alert('Nama tidak boleh kosong atau lebih dari 10 karakter!');
    }
  };

  const handleLoveClick = (index) => {
    const newLoveClicks = [...loveClicks];
    newLoveClicks[index] = true;
    setLoveClicks(newLoveClicks);

    if (newLoveClicks.every(click => click)) {
      setCurrentMessageIndex(-1); // Reset ke -1 agar mulai dari "Tunggu..."
      setTimeout(() => {
        setCurrentStep(4);
        setShowMessages(true);
      }, 500);
    }
  };

  return (
    <>
      {/* Metadata akan dihandle di layout.tsx untuk App Router */}
      <div className={styles.container}>
        {/* Background */}
        <div className={styles.background}>
          <img 
            src="https://raw.githubusercontent.com/Studentalthaf/gabut/main/a2.jpeg" 
            alt="Background"
            className={styles.wallpaper}
          />
          <div className={styles.blur}></div>
        </div>

        {/* Audio */}
        <audio 
          ref={audioRef}
          src="/music/hahah.mp3"
          loop
        />

        {/* Content */}
        <div className={styles.content}>
          {/* Initial Gift Box */}
          {currentStep === 0 && (
            <div className={styles.giftSection}>
              <div className={styles.giftBox} onClick={handleGiftClick}>
                <img 
                  src="https://feeldreams.github.io/kadoin.png" 
                  alt="Gift Box"
                  className={styles.giftImage}
                />
              </div>
              <p className={styles.instruction}>Klik Kadonya!</p>
            </div>
          )}

          {/* Name Input */}
          {showNameInput && (
            <div className={styles.nameInputSection}>
              <h2>Masukin Nama Kamu Inem</h2>
              <form onSubmit={handleNameSubmit}>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Nama kamu..."
                  className={styles.nameInput}
                  maxLength={10}
                />
                <button type="submit" className={styles.submitBtn}>
                  OK
                </button>
              </form>
            </div>
          )}

          {/* Greeting */}
          {currentStep >= 2 && (
            <div className={styles.greetingSection}>
              <h1 className={styles.greeting}>Hai, {userName} ✨</h1>
            </div>
          )}

          {/* Stickers */}
          {currentStep >= 2 && (
            <div className={styles.stickers}>
              <img src="https://feeldreams.github.io/bunga.gif" className={styles.sticker} />
              <img src="https://feeldreams.github.io/pusn.gif" className={styles.sticker} />
              <img src="https://feeldreams.github.io/pandacoklat.gif" className={styles.sticker} />
              <img src="https://feeldreams.github.io/cilukba.gif" className={styles.sticker} />
              <img src="https://feeldreams.github.io/pandakuning.gif" className={styles.sticker} />
              <img src="https://feeldreams.github.io/emawh.gif" className={styles.sticker} />
            </div>
          )}

          {/* Message Box */}
          {currentStep >= 3 && (
            <div className={styles.messageBox}>
              <p className={styles.message}>Aku Ada Sesuatu Nih Nem 🤣🤣🤣🤣</p>
              
              {!showMessages && (
                <>
                  <p className={styles.instruction}>KLIK 4 KUCING INI DULU 😺😺😺😺</p>
                  <div className={styles.loveRow}>
                    {loveClicks.map((clicked, index) => (
                      <button
                        key={index}
                        className={styles.loveButton}
                        onClick={() => handleLoveClick(index)}
                        disabled={clicked}
                      >
                        {clicked ? '😺' : '😺 '}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {showMessages && (
                <div className={styles.birthdayMessages}>
                  {showWaiting ? (
                    <p className={styles.message}>Tunggu...</p>
                  ) : (
                    <>
                      {messages.slice(0, currentMessageIndex + 1).map((message, index) => (
                        <p 
                          key={index} 
                          className={`${styles.message} ${index === currentMessageIndex ? styles.newMessage : ''} ${
                            index >= 2 && index <= 6 ? styles.specialMessage : ''
                          }`}
                        >
                          {message}
                        </p>
                      ))}
                      {currentMessageIndex < messages.length - 1 && (
                        <button 
                          onClick={handleNextMessage}
                          className={styles.nextButton}
                        >
                          😺 Klik untuk lanjut
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}