import { Builder, By, until, WebDriver } from 'selenium-webdriver';

const TIMEOUT_MS = 10000;

jest.setTimeout(TIMEOUT_MS + 5000);

describe('navbar shortcuts quality check.', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('dropdown menu appears and disappears on clicking the shortcut.', async () => {
    try {
      await driver.get('http://localhost:3000');

      await driver.sleep(2000);

      const shortcutWithDropdown = await driver.findElement(
        By.id('shortcut-with-dropdown')
      );

      await shortcutWithDropdown.click();

      await driver.sleep(2000);

      const dropdown = await driver.wait(
        until.elementLocated(By.id('container-dropdown')),
        TIMEOUT_MS
      );

      await shortcutWithDropdown.click();

      await driver.wait(until.elementIsNotVisible(dropdown), TIMEOUT_MS);
    } catch (error) {
      console.error('Erro durante o teste:', error);
      throw error;
    }
  });

  test('hamburger menu appears and disappears correctly on clicking the icon.', async () => {
    try {
      await driver.get('http://localhost:3000');

      await driver.manage().window().setRect({ width: 767, height: 893 });

      await driver.sleep(2000);

      const hamburgerIcon = await driver.findElement(By.id('icon-hamburger'));

      await hamburgerIcon.click();

      await driver.sleep(2000);

      const hamburgerMenu = await driver.wait(
        until.elementLocated(By.id('hamburger-menu')),
        TIMEOUT_MS
      );

      await hamburgerIcon.click();

      await driver.wait(until.elementIsNotVisible(hamburgerMenu), TIMEOUT_MS);
    } catch (error) {
      console.error('Erro durante o teste:', error);
      throw error;
    }
  });
});
