import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import styles from './icon-hamburger.module.css';

interface IconHamburgerProps {
  onClick: () => void;
  isColumnFormatOpen: boolean;
}

const IconHamburger: React.FC<IconHamburgerProps> = ({
  onClick,
  isColumnFormatOpen
}) => {
  const elementLineOne = useRef<HTMLDivElement>(null);
  const elementLineTwo = useRef<HTMLDivElement>(null);
  const elementLineThree = useRef<HTMLDivElement>(null);

  const applyHamburgerTransformations = useCallback(() => {
    // É um hook que serve para memorizar funções, sendo especialmente útil quando é necessário passar funções para componentes filhos. Ele otimiza o desempenho, evitando que a função seja recriada a cada renderização, a menos que haja mudanças nas dependências.

    const elements = [
      elementLineOne.current,
      elementLineTwo.current,
      elementLineThree.current
    ];

    const toggleIconHamburger = gsap.context(() => {
      if (elements.every(Boolean)) {
        if (isColumnFormatOpen) {
          gsap.to(elements[0], {
            transform: 'rotate(-45deg) translateY(9px)',
            duration: 0.6,
            ease: 'expo.inOut'
          });

          gsap.to(elements[1], {
            opacity: '0',
            duration: 0.6,
            ease: 'expo.inOut'
          });

          gsap.to(elements[2], {
            transform: 'rotate(45deg) translateY(-9px)',
            duration: 0.6,
            ease: 'expo.inOut'
          });
        } else {
          gsap.to([elements[0], elements[2]], {
            transform: 'rotate(0) translateY(0)',
            duration: 0.6,
            ease: 'expo.inOut'
          });

          gsap.to(elements[1], {
            opacity: '1',
            duration: 0.6,
            ease: 'expo.inOut'
          });
        }
      }
    }, [elements]);

    return () => toggleIconHamburger.revert();
  }, [isColumnFormatOpen]);

  useEffect(() => {
    applyHamburgerTransformations();
  }, [isColumnFormatOpen, applyHamburgerTransformations]);

  function handleIconClick() {
    onClick();
  }

  return (
    <div
      className={styles['container-icon-hamburger']}
      id="icon-hamburger"
      onClick={handleIconClick}
    >
      <div id={styles['line-one']} ref={elementLineOne}></div>
      <div id={styles['line-two']} ref={elementLineTwo}></div>
      <div id={styles['line-three']} ref={elementLineThree}></div>
    </div>
  );
};

export default IconHamburger;
