import { test, expect } from '@playwright/test';

test('Búsqueda en Wikipedia (Compatible Firefox)', async ({ page }) => {
  // 1. Ir a la web
  await page.goto('https://es.wikipedia.org/', { waitUntil: 'domcontentloaded' });

  // 2. BUSCAR
  const cajaBusqueda = page.getByRole('searchbox');
  
  // Escribimos la palabra
  await cajaBusqueda.fill('automatización'); 
  
  // TRUCO DE EXPERTO:
  // En lugar de presionar Enter "en la caja", presionamos el teclado global.
  // Esto evita que Firefox falle si aparecen sugerencias de búsqueda.
  await page.keyboard.press('Enter');

  // 3. VERIFICACIÓN
  await expect(page.getByRole('heading', { name: /Automatiza/i }).first()).toBeVisible();
});