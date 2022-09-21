const webdriver = require('selenium-webdriver');
let baseUrl = "https://shop-app-ebiznes-123.azurewebsites.net/"

async function runTestMainMenuWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://alioramus_Dj2H6Q:XUHixs6yPsZMV9r3d9ss@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();
  try {
    let baseUrl = "https://shop-app-ebiznes-123.azurewebsites.net/"
    await driver.get(baseUrl);
    await driver.wait(webdriver.until.titleMatches(/Simple shop/i), 10000);

    let menuLinks = await driver
      .findElements(webdriver.By.xpath('//div[contains(@class, "MuiToolbar-root")]/div/a'))
    if(menuLinks.length !== 5) throw new Error("Invalid number of links in menu")
    if((await menuLinks[0].getText()).toLowerCase() !== "produkty") throw new Error("Invalid menu item")
    if((await menuLinks[0].getAttribute("href")) !== `${baseUrl}products`) throw new Error("Invalid menu link")
    if((await menuLinks[1].getText()).toLowerCase() !== "kategorie") throw new Error("Invalid menu item")
    if((await menuLinks[1].getAttribute("href")) !== `${baseUrl}categories`) throw new Error("Invalid menu link")
    if((await menuLinks[2].getText()).toLowerCase() !== "promocje") throw new Error("Invalid menu item")
    if((await menuLinks[2].getAttribute("href")) !== `${baseUrl}promotions`) throw new Error("Invalid menu link")
    if((await menuLinks[3].getText()).toLowerCase() !== "zamówienia") throw new Error("Invalid menu item")
    if((await menuLinks[3].getAttribute("href")) !== `${baseUrl}orders`) throw new Error("Invalid menu link")
    if((await menuLinks[4].getAttribute("href")) !== `${baseUrl}api/login`) throw new Error("Invalid login url")

    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Product has been successfully added to the cart!"}}'
    );
  } catch (e) {
    await driver.executeScript(
      `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${e.message}"}}`
    );
  }
  await driver.quit();
}

async function runTestAddProductToBucketWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://alioramus_Dj2H6Q:XUHixs6yPsZMV9r3d9ss@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();
  try {
    await driver.get(baseUrl);
    let addToBucket = driver
      .findElement(webdriver.By.xpath('//button[text()="Dodaj do koszyka"]'))
    await driver.wait(webdriver.until.elementIsVisible(addToBucket), 10000);
    // locating product on webpage and getting name of the product
    addToBucket.click()
    let bucketLink = await driver
      .findElement(webdriver.By.xpath('//a[contains(@href, "/bucket")]'))
    bucketLink.click()
    await driver.wait(webdriver.until.urlContains("bucket"))
    let price = driver.findElement(webdriver.By.xpath('//p[contains(text(), "Cena")]'))
    await driver.wait(webdriver.until.elementIsVisible(price))
    let product = await driver.findElement(webdriver.By.xpath('//p[text()="Sweets"]'))
    if ((await product.getText()) !== "Sweets") throw new Error("Invalid product name")
    let productPrice = await driver.findElement(webdriver.By.xpath('//p[contains(text(), "Cena")]'))
    let productAmount = await driver.findElement(webdriver.By.xpath('//p[contains(text(), "Ilość")]'))
    if ((await product.getText()) !== "Sweets") throw new Error("Invalid product name")
    if (!(await productPrice.getText()).includes("5")) throw new Error("Invalid product price ")
    if (!(await productAmount.getText()).includes("1")) throw new Error("Invalid product amount")
    let title = await driver.findElement(webdriver.By.xpath('//h3'))
    if ((await title.getText()) !== "Produkty") throw new Error("Invalid title")
    let loginToConfirm = await driver.findElement(webdriver.By.xpath('//p[text()="Zaloguj się, aby złozyć zamówienie."]'))
    if (!(await loginToConfirm.isDisplayed())) throw new Error("Confirmation button is not visible")
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Product has been successfully added to the cart!"}}'
    );
  } catch (e) {
    await driver.executeScript(
      `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${e.message}"}}`
    );
  }
  await driver.quit();
}
async function runTestRemoveProductFromBucketWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://alioramus_Dj2H6Q:XUHixs6yPsZMV9r3d9ss@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();
  try {
    await driver.get(baseUrl);
    let addToBucket = driver
      .findElement(webdriver.By.xpath('//button[text()="Dodaj do koszyka"]'))
    await driver.wait(webdriver.until.elementIsVisible(addToBucket), 10000);
    // locating product on webpage and getting name of the product
    addToBucket.click()
    let bucketLink = await driver
      .findElement(webdriver.By.xpath('//a[contains(@href, "/bucket")]'))
    bucketLink.click()
    await driver.wait(webdriver.until.urlContains("bucket"))
    let price = driver.findElement(webdriver.By.xpath('//p[contains(text(), "Cena")]'))
    await driver.wait(webdriver.until.elementIsVisible(price))
    let title = await driver.findElement(webdriver.By.xpath('//h3'))
    if ((await title.getText()) !== "Produkty") throw new Error("Invalid title")
    let loginToConfirm = await driver.findElement(webdriver.By.xpath('//p[text()="Zaloguj się, aby złozyć zamówienie."]'))
    if (!(await loginToConfirm.isDisplayed())) throw new Error("Confirmation button is not visible")
    let removeProductButton = await driver.findElement(webdriver.By.xpath('//button[text()="Usuń"]'))
    removeProductButton.click()
    let productsPrice = await driver.findElement(webdriver.By.xpath('//p[contains(text(), "Cena")]'))
    if (!(await productsPrice.getText()).includes("0")) throw new Error("Invalid products price ")

    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Product has been successfully added to the cart!"}}'
    );
  } catch (e) {
    await driver.executeScript(
      `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${e.message}"}}`
    );
  }
  await driver.quit();
}


async function runTestPromotionsWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://alioramus_Dj2H6Q:XUHixs6yPsZMV9r3d9ss@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();
  try {
    await driver.get(baseUrl);
    let promotionsLink = await driver
      .findElement(webdriver.By.xpath('//a[contains(@href, "/promotions")]'))
    promotionsLink.click()
    await driver.wait(webdriver.until.urlContains("promotions"))
    let promotionsHeader = driver.findElement(webdriver.By.xpath('//h2'))
    if ((await promotionsHeader.getText()) !== "Promocje") throw new Error("Invalid title")

    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Product has been successfully added to the cart!"}}'
    );
  } catch (e) {
    await driver.executeScript(
      `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${e.message}"}}`
    );
  }
  await driver.quit();
}

async function runTestCategoriesWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://alioramus_Dj2H6Q:XUHixs6yPsZMV9r3d9ss@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();
  try {
    await driver.get(baseUrl);
    let categoriesLink = await driver
      .findElement(webdriver.By.xpath('//a[contains(@href, "/categories")]'))
    categoriesLink.click()
    await driver.wait(webdriver.until.urlContains("categories"))
    let categoriesHeader = driver.findElement(webdriver.By.xpath('//h2'))
    if ((await categoriesHeader.getText()) !== "Kategorie") throw new Error("Invalid title")
    let foodCategory = await driver.findElement(webdriver.By.xpath('//a[contains(@href, "/products?category=1")]'))
    if ((await foodCategory.getText()) !== "FOOD: FOOD AND MORE") throw new Error("Invalid description for category")
    foodCategory.click()
    await driver.wait(webdriver.until.urlContains("/products?category=1"))

    let product = await driver.findElement(webdriver.By.xpath('//p[text()="Sweets"]'))
    if (!(await product.isDisplayed())) throw new Error("Sweets should be visible in food category")

    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Product has been successfully added to the cart!"}}'
    );
  } catch (e) {
    await driver.executeScript(
      `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${e.message}"}}`
    );
  }
  await driver.quit();
}
async function runTestOrdersWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://alioramus_Dj2H6Q:XUHixs6yPsZMV9r3d9ss@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();
  try {
    await driver.get(baseUrl);
    let ordersLink = await driver
      .findElement(webdriver.By.xpath('//a[contains(@href, "/orders")]'))
    ordersLink.click()
    await driver.wait(webdriver.until.urlContains("orders"))
    let loginInfo = driver.findElement(webdriver.By.xpath('//p[text()="Zaloguj się aby zobaczyć tą stronę."]'))
    if (!(await loginInfo.isDisplayed())) throw new Error("There should be info to login in on orders")

    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Product has been successfully added to the cart!"}}'
    );
  } catch (e) {
    await driver.executeScript(
      `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${e.message}"}}`
    );
  }
  await driver.quit();
}

const capabilities1 = {
  'bstack:options' : {
    "os": "Windows",
    "osVersion": "11",
    "buildName" : "browserstack-build-1",
    "sessionName" : "Parallel test shop",
  },
  "browserName": "Chrome",
  "browserVersion": "103.0",
}
runTestMainMenuWithCaps(capabilities1);
runTestAddProductToBucketWithCaps(capabilities1);
runTestRemoveProductFromBucketWithCaps(capabilities1);
runTestCategoriesWithCaps(capabilities1);
runTestPromotionsWithCaps(capabilities1);
runTestOrdersWithCaps(capabilities1);