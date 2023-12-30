import { useState, useRef, useEffect } from 'react';
import styles from './shortcuts.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { gsap } from 'gsap';

// icons !!
import { IoIosArrowDown } from 'react-icons/io';

// utility functions !!
import { AnimateMenu } from '../../../../lib/utils/menu-animation';

// Sub-items do dropdown
interface DropdownSubShortcut {
  id: number;
  sub_shortcut_title: string;
  sub_shortcut_link: string;
  sub_shorcut_data_testid: string;
}

// Atalhos sem dropdown
interface Shortcut {
  id: number;
  shortcut_title: string;
  shortcut_link?: string;
  Dropdown?: DropdownSubShortcut[];
}

interface ShortcutsProps {
  shortcuts: Shortcut[];
  isColumnFormat: boolean;
}

const Shortcuts: React.FC<ShortcutsProps> = ({ shortcuts, isColumnFormat }) => {
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const menuDropdown = useRef<HTMLUListElement>(null);
  const elementIoIosArrowIcon = useRef<HTMLDivElement>(null);

  function toggleDropdown(): void {
    setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen);
    // atualização se baseando no valor antigo

    if (elementIoIosArrowIcon.current) {
      const { current: IoIosArrowIcon } = elementIoIosArrowIcon;

      if (isDropdownOpen) {
        gsap.to(IoIosArrowIcon, {
          rotation: 0,
          duration: 0.6,
          ease: 'expo.inOut'
        });
      } else {
        gsap.to(IoIosArrowIcon, {
          rotation: 180,
          duration: 0.6,
          ease: 'expo.inOut'
        });
      }
    }
  }

  const renderDropdown = (dropdown: DropdownSubShortcut[]) => (
    <ul
      className={
        isColumnFormat
          ? styles.containerDropdownMobile
          : styles.containerDropdownPc
      }
      ref={menuDropdown}
      id="container-dropdown"
    >
      {dropdown.map((DropdownSubShortcut) => (
        <li key={DropdownSubShortcut.id}>
          {DropdownSubShortcut.sub_shortcut_link && (
            <Link
              data-testid={DropdownSubShortcut.sub_shorcut_data_testid}
              href={DropdownSubShortcut.sub_shortcut_link}
              style={{
                color:
                  pathname === DropdownSubShortcut.sub_shortcut_link
                    ? '#025159'
                    : '#fcfefc'
              }}
            >
              {DropdownSubShortcut.sub_shortcut_title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    AnimateMenu({
      container: menuDropdown.current,
      elementFlexDirection: 'column',
      elementJustifyContent: 'flex-start',
      elementAlignItems: 'flex-start',
      isOpen: isDropdownOpen,
      topOpen: '40px',
      topClosed: '0'
    });
  }, [isDropdownOpen]);

  return (
    <ul
      className={
        isColumnFormat
          ? styles.containerShortcutsMobile
          : styles.containerShorcutsPc
      }
    >
      {shortcuts.map((shortcut) => (
        <li key={shortcut.id} className="elementShortcut">
          {shortcut.Dropdown ? ( // Caso o Dropdown seja encontrado.
            <div onClick={toggleDropdown} className={styles.containerDropdown}>
              <div className={styles.containerShortcutDropdown}>
                <span id="shortcut-with-dropdown" className="elementShortcut">
                  {shortcut.shortcut_title}
                </span>
                <div ref={elementIoIosArrowIcon} id={styles.dropdownArrowIcon}>
                  <IoIosArrowDown />
                </div>
              </div>
              {renderDropdown(shortcut.Dropdown)}
            </div>
          ) : (
            // Caso o dropdown não seja encontrado.

            // Verificação para garantir que shortcut_link seja uma string antes de passá-lo para o Link
            shortcut.shortcut_link && (
              <Link
                href={shortcut.shortcut_link}
                style={{
                  color:
                    pathname === shortcut.shortcut_link ? '#025159' : '#fcfefc'
                }}
              >
                {shortcut.shortcut_title}
              </Link>
            )
          )}
        </li>
      ))}
    </ul>
  );
};

export default Shortcuts;
