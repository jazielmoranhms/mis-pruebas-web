import { test, expect } from '@playwright/test';

test('Prueba en Google', async ({ page }) => {
  // 1. Ir a Google
  await page.goto('https://www.google.com');

  // 2. Verificar que el título de la pestaña dice "Google"
  await expect(page).toHaveTitle(/Google/);
  
  // (Opcional) Tomar una captura de pantalla para que veas que sí fue
  await page.screenshot({ path: 'prueba-google.png' });
});