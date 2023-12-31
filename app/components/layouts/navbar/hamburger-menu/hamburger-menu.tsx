import { useRef, useState, useEffect } from 'react';

import Link from 'next/link';

import styles from './hamburger-menu.module.css';

import IconHamburger from './icon-hamburger/icon-hamburger';
import Shortcuts from '../shortcuts/shortcuts';

import { AnimateMenu } from '../../../../lib/utils/menu-animation';

interface DropdownSubShortcut {
  id: number;
  sub_shortcut_title: string;
  sub_shortcut_link: string;
}

interface Shortcut {
  id: number;
  shortcut_title: string;
  shortcut_link?: string;
  dropdown?: DropdownSubShortcut[];
}

interface HamburgerMenuShortcutsProp {
  shortcuts: Shortcut[];
}

const HamburgerMenu: React.FC<HamburgerMenuShortcutsProp> = (props) => {
  const containerMenuHamburger = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  function ToggleMobileMenu() {
    setMenuOpen((setIsMenuOpen) => !setIsMenuOpen);
  }

  useEffect(() => {
    AnimateMenu({
      container: containerMenuHamburger.current,
      elementFlexDirection: 'column',
      elementJustifyContent: 'flex-end',
      elementAlignItems: 'flex-start',
      isOpen: isMenuOpen,
      topOpen: '-20px',
      topClosed: '-50px'
    });
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={styles['container-hamburger-menu']}
        id="hamburger-menu"
        ref={containerMenuHamburger}
      >
        <Shortcuts shortcuts={props.shortcuts} isColumnFormat={true} />
        <button id={styles.mobileIntroButton}>
          <Link href="#home-content">É novo por aqui?</Link>
        </button>
      </div>
      <IconHamburger
        onClick={ToggleMobileMenu}
        isColumnFormatOpen={isMenuOpen}
      />
    </>
  );
};

export default HamburgerMenu;
