import gsap from 'gsap';

interface AnimationOptions {
  container: HTMLElement | null;
  elementFlexDirection: string;
  elementJustifyContent: string;
  elementAlignItems: string;
  isOpen: boolean;
  topOpen?: string;
  topClosed?: string;
}

export const AnimateMenu = ({
  container,
  elementFlexDirection,
  elementJustifyContent,
  elementAlignItems,
  isOpen,
  topOpen = '0',
  topClosed = '-350px'
}: AnimationOptions): void => {
  if (container) {
    if (isOpen) {
      gsap.set(container, {
        display: 'flex',
        flexDirection: elementFlexDirection,
        justifyContent: elementJustifyContent,
        alignItems: elementAlignItems,
        opacity: 0
      });
      gsap.to(container, {
        top: topOpen,
        opacity: 1,
        duration: 0.6,
        ease: 'expo.inOut'
      });
    } else {
      gsap.to(container, {
        top: topClosed,
        opacity: 0,
        duration: 0.6,
        ease: 'expo.inOut',
        onComplete: () => {
          container.style.display = 'none';
        }
      });
    }
  }
};
