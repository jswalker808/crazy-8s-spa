import { Page, expect, test } from '@playwright/test';

test.describe('Game', () => {
	let page1: Page;
	let page2: Page;
	const player1Name = 'player1';
	const player2Name = 'player2';
	let gameId: string | undefined;
	const defaultTimeout = 1000;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		page1 = await context.newPage();
		page2 = await context.newPage();
	});

	test.afterAll(async ({ browser }) => {
		await browser.close();
	});

	test('run game', async () => {
		// Create game
		await page1.goto('/');
		await page1.waitForTimeout(defaultTimeout);
		
		await page1.locator("input").fill(player1Name);
		await page1.locator("button").click();

		await page1.waitForURL(url => {
			const urlParts = url.toString().split('/');
			return !!urlParts[urlParts.length - 1];
		});

		gameId = page1.url().split('/').pop();

		const page1Players = page1.locator("ul");
		await page1Players.locator(`li:has-text(\"${player1Name}\")`).isVisible();


		// Join game from second page
		await page2.goto(`./${gameId}`);
		await page2.waitForTimeout(defaultTimeout);

		await page2.locator("input").fill(player2Name);
		await page2.locator("button").click();
		await page2.waitForTimeout(defaultTimeout);

		expect(await page1Players.locator(`li:has-text(\"${player1Name}\")`).isVisible()).toBeTruthy();
		expect(await page1Players.locator(`li:has-text(\"${player2Name}\")`).isVisible()).toBeTruthy();
		const page2Players = page2.locator("ul");
		expect(await page2Players.locator(`li:has-text(\"${player1Name}\")`).isVisible()).toBeTruthy();
		expect(await page2Players.locator(`li:has-text(\"${player2Name}\")`).isVisible()).toBeTruthy();
		

		// Player 2 leave game
		await page2.close();
		const numPage1Players = await page1Players.locator("li");
		await page1.waitForTimeout(defaultTimeout);
		await expect(numPage1Players).toHaveCount(1);
		await page1Players.locator(`li:has-text(\"${player1Name}\")`).isVisible();
	});
})



