'use client';

import React, { useRef, useEffect } from 'react';
import { useMemo } from 'react';

import Link from 'next/link';

import styles from './brand-logo.module.css';
import gsap from 'gsap/dist/gsap';

export default function BrandLogo() {
  const containerBrandName = useRef<HTMLDivElement>(null);
  const elementBrandName = useRef<HTMLSpanElement>(null);
  const elementTrademarkSymbol = useRef<HTMLSpanElement>(null);
  const elementBrandPhrase = useRef<HTMLDivElement>(null);
  const containerLogo = useRef<HTMLDivElement>(null);

  const brandingElements = useMemo(() => {
    /*  Usado para armazenar em cache o resultado de uma expressão (valor ou objeto) e garantir que esse resultado seja reutilizado entre renderizações, a menos que as dependências mudem. */
    return [
      containerBrandName,
      elementBrandName,
      elementTrademarkSymbol,
      elementBrandPhrase,
      containerLogo
    ];
  }, []); // Vazio porque o array é criado uma única vez.

  useEffect(() => {
    const animationLogo = gsap.context(() => {
      gsap.to(containerBrandName.current, {
        right: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'expo.inOut'
      });

      gsap.to(elementBrandName.current, {
        color: '#ffffff',
        duration: 2,
        ease: 'expo.inOut'
      });

      gsap.to(elementTrademarkSymbol.current, {
        color: '#ffffff',
        duration: 1.5,
        ease: 'expo.inOut'
      });

      gsap.to(elementBrandPhrase.current, {
        delay: 0.7,
        opacity: 1,
        duration: 2,
        ease: 'expo.inOut',
        left: '10px'
      });
    }, brandingElements);

    return () => animationLogo.revert();
  }, [brandingElements]);

  return (
    <div ref={containerLogo} className={styles.logoContainer}>
      <div ref={containerBrandName} className={styles.containerBrandName}>
        <Link href="/">
          <span ref={elementBrandName} id={styles.brandName}>
            Deku-do
          </span>
          <span ref={elementTrademarkSymbol} id={styles.trademarkSymbol}>
            ®
          </span>
        </Link>
      </div>

      <div id={styles.containerBrandPhrase} ref={elementBrandPhrase}>
        <span>Cultivando Poderes — Forjando Histórias</span>
      </div>
    </div>
  );
}
