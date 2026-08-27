import { test as base, expect, Page } from '@playwright/test';
import { DrillOpsDashboardPage } from '../pom/DrillOpsDashboardPage';
import { standardUser, type TestUser } from '../data/users';

type Fixtures = {
  testUser: TestUser;
  loggedDashboard: DrillOpsDashboardPage;
};

export const test = base.extend<Fixtures>({
  testUser: async ({}, use) => {
    await use(standardUser);
  },

  loggedDashboard: async ({ page, testUser }: { page: Page; testUser: TestUser }, use) => {
    const dashboard = new DrillOpsDashboardPage(page);
    await page.goto('https://www.saucedemo.com/');
    await dashboard.login(testUser);
    await use(dashboard);
  }
});

export { expect };