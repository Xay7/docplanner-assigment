import { test, expect } from '@playwright/test';
import { DateTime } from 'luxon';

test('Should be correct calendar dates', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const todayElement = page.getByText('Today');
  const firstSibling = todayElement.locator('xpath=following-sibling::*[1]');
  const siblingText = await firstSibling.innerText();
  const expectedTodayDate = DateTime.local().toFormat('d MMM');

  expect(siblingText).toBe(expectedTodayDate);

  await page.locator('button:nth-child(9)').click();

  const nextWeekSibling = todayElement.locator('xpath=following-sibling::*[1]');
  const nextWeekText = await nextWeekSibling.innerText();
  const expectedNextWeekDate = DateTime.local().plus({ days: 7 }).toFormat('d MMM');

  expect(nextWeekText).toBe(expectedNextWeekDate);
});
