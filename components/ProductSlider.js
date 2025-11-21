// GUERRA PACHECO GEORGE MIKY -5C24B
import { useState, useRef, useEffect } from 'react';

export default function ProductSlider({ products }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = 320;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const checkScroll = () => {
    const container = sliderRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = sliderRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          style={{
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#3b82f6';
            e.target.style.color = 'white';
            e.target.style.borderColor = '#3b82f6';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = 'black';
            e.target.style.borderColor = '#e5e7eb';
          }}
        >
          ‹
        </button>
      )}

      <div
        ref={sliderRef}
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          padding: '16px 0',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        className="hide-scrollbar"
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              minWidth: '280px',
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {product}
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#3b82f6';
            e.target.style.color = 'white';
            e.target.style.borderColor = '#3b82f6';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = 'black';
            e.target.style.borderColor = '#e5e7eb';
          }}
        >
          ›
        </button>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
