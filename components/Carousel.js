// GUERRA PACHECO GEORGE MIKY -5C24B
import { useState, useEffect } from 'react';

export default function Carousel({ items, autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
      {/* Slides */}
      <div style={{ 
        display: 'flex', 
        transition: 'transform 0.5s ease-in-out',
        transform: `translateX(-${currentIndex * 100}%)`
      }}>
        {items.map((item, index) => (
          <div 
            key={index}
            style={{ 
              minWidth: '100%',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: item.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {item.content}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s',
          zIndex: 10
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.8)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.5)'}
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s',
          zIndex: 10
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.8)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.5)'}
      >
        ›
      </button>

      {/* Dots indicator */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentIndex === index ? '24px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              background: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
}
