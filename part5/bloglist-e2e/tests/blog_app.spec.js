const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'test',
        password: '12345',
      },
    });
    await request.post('/api/users', {
      data: {
        name: 'Test User 2',
        username: 'test2',
        password: '12345',
      },
    });

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Login').first();
    await expect(locator).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', '12345');
      await expect(page.getByRole('heading', { name: 'Blogs' })).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'wrong');
      await expect(
        page.getByRole('heading', { name: 'Blogs' })
      ).not.toBeVisible();
      await expect(
        page.getByText('invalid username or password')
      ).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', '12345');
      await createBlog(page, 'Blog1', 'Test', 'test url');
    });

    test('a new blog can be created', async ({ page }) => {
      await expect(
        page.getByText('Blog1 - Test', { exact: true })
      ).toBeVisible();
    });

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).click();
      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.getByText('Likes: 1 like')).toBeVisible();
    });

    test('a blog created by you can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).click();
      page.on('dialog', (dialog) => dialog.accept());
      await page.getByRole('button', { name: 'Remove' }).click();
      await expect(page.getByText('Blog1 - Test')).not.toBeVisible();
    });

    test('a blog not created by you cannot be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'Logout' }).click();
      await loginWith(page, 'test2', '12345');
      await page.getByRole('button', { name: 'View' }).click();
      await expect(
        page.getByRole('button', { name: 'Remove' })
      ).not.toBeVisible();
    });

    test('blogs are arranged by number of likes', async ({ page }) => {
      await createBlog(page, 'Blog2', 'Test', 'test url');
      await page.getByRole('button', { name: 'View' }).nth(1).click();
      await page.getByRole('button', { name: 'like' }).click();
      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.locator('.blog').nth(0)).toContainText('Blog2');
      await expect(page.locator('.blog').nth(1)).toContainText('Blog1');
    });
  });
});
