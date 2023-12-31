'use client';

import { useRef, useEffect } from 'react';
import styles from './navbar.module.css';
import BrandLogo from '../../icons/brand-logo';
import Shortcuts from './shortcuts/shortcuts';
import HamburgerMenu from './hamburger-menu/hamburger-menu';
import json from '../../../../public/json/navbar/shorcuts/shorcuts.json';
import { gsap } from 'gsap';

export default function Navbar() {
  const containerHeaderRef = useRef<HTMLElement>(null);
  const elementLineOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerHeaderRef.current && elementLineOverlayRef.current) {
        const { current: containerHeader } = containerHeaderRef;
        const { current: lineOverlay } = elementLineOverlayRef;

        if (window.scrollY > 0) {
          gsap.to(containerHeader, {
            width: '95vw',
            top: 0,
            backgroundColor: '#020202',
            borderRadius: '0 0 10px 10px',
            duration: 0.6,
            ease: 'expo.inOut'
          });

          gsap.to(lineOverlay, {
            width: '80vw',
            backgroundColor: '#027373',
            filter: 'drop-shadow(0 0 30px #025159)',
            duration: 0.6,
            ease: 'expo.inOut'
          });
        } else {
          gsap.to(containerHeader, {
            width: '90vw',
            top: 10,
            backgroundColor: 'transparent',
            borderRadius: 'none',
            duration: 0.6,
            ease: 'expo.inOut'
          });

          gsap.to(lineOverlay, {
            width: '5vw',
            backgroundColor: '#d6d6d6cc',
            filter: 'drop-shadow(0 0 0 transparent)',
            duration: 0.6,
            ease: 'expo.inOut'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={styles.headerContainer} ref={containerHeaderRef}>
        <div className="logo-container">
          <BrandLogo />
        </div>
        <nav>
          <div className={styles.containerShortcuts}>
            <Shortcuts shortcuts={json.Shortcuts} isColumnFormat={false} />
          </div>
          <HamburgerMenu shortcuts={json.Shortcuts} />
        </nav>
        <button id={styles.introductoryButton}>
          <a href="#home-content" data-testid="botao-de-introducao">
            É novo por aqui?
          </a>
        </button>
        <div id={styles.lineOverlay} ref={elementLineOverlayRef}></div>
      </header>
    </>
  );
}
