import { Page, test } from '@playwright/test';

test.describe('Game', () => {
	let page1: Page;
	const player1Name = 'player1';
	let gameId: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		page1 = await context.newPage();
	});

	test.afterAll(async ({ browser }) => {
		await browser.close();
	});

	test('create game', async () => {
		await page1.goto('/');
		// Wait for websocket to connect to server
		await page1.waitForTimeout(1000);
		
		await page1.locator("input").fill(player1Name);
		await page1.locator("button").click();

		await page1.waitForURL(url => {
			const urlParts = url.toString().split('/');
			return !!urlParts[urlParts.length - 1];
		});

		gameId = page1.url().split('/')[1];

		const players = page1.locator("ul");

		await players.locator(`li:has-text(\"${player1Name}\")`).isVisible();
	});
})



