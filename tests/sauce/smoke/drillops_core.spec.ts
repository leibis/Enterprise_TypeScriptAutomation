import { test, expect } from '../../../src/fixtures/base.fixture';
import { DrillOpsDashboardPage } from '../../../src/pom/DrillOpsDashboardPage';
import { standardUser } from '../../../src/data/users';

/**
 * --------------------------------------------------------------------------
 * DrillOps Dashboard - Smoke Suite
 * --------------------------------------------------------------------------
 * What this suite validates:
 * 1) A standard user can log in successfully.
 * 2) Inventory is visible after login.
 * 3) Adding one item updates the cart badge to "1".
 *
 * Why this matters:
 * - These are critical "happy path" checks.
 * - If any test fails, the core shopping flow is likely broken.
 *
 * Tags:
 * - @smoke => fast feedback in CI
 * --------------------------------------------------------------------------
 */
test.describe('DrillOps Dashboard Test Suite', () => {
  /**
   * Page Object used by all tests in this suite.
   * Re-created on every test to ensure test isolation.
   */
  let dashboardPage: DrillOpsDashboardPage;

  /**
   * Precondition executed before each test.
   *
   * Steps:
   * 1) Build Dashboard Page Object.
   * 2) Open app using environment-based base URL.
   * 3) Log in with standard user credentials.
   *
   * Notes for newcomers:
   * - `config.baseURL` comes from centralized runtime config.
   * - Do not hardcode URLs in test files.
   */
  test.beforeEach(async ({ page, config }) => {
    dashboardPage = new DrillOpsDashboardPage(page);
    await dashboardPage.navigateToDashboard(config.baseURL);
    await dashboardPage.login(standardUser);
  });

  /**
   * @smoke
   * Test goal:
   * Verify inventory is visible right after login.
   *
   * Expected result:
   * - Inventory container is rendered and visible.
   */
  test('@smoke Validate inventory loads after login', async () => {
    await dashboardPage.assertInventoryVisible();
  });

  /**
   * @smoke
   * Test goal:
   * Verify cart badge increments when adding one product.
   *
   * Expected result:
   * - Cart badge text equals "1".
   */
  test('@smoke Validate cart functionality', async ({ page }) => {
    // Action: add first available product to cart.
    await page.locator('.btn_inventory').first().click();

    // Assertion: cart badge shows exactly one item.
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});