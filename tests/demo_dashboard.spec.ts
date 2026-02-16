import { test, expect } from '@playwright/test';

test.describe('Demo Presentación - Flujos Críticos de Negocio', () => {

  // Configuración para que todos vayan al mismo sitio
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // CASO 1: Login Exitoso (El clásico para mostrar en reportes)
  test('TC-01: Validación de Inicio de Sesión Correcto', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Validación visual: Que aparezca el título "Products"
    await expect(page.getByText('Products')).toBeVisible();
  });

  // CASO 2: Agregar producto al carrito (Simula una transacción)
  test('TC-02: Agregar Item al Carrito de Compras', async ({ page }) => {
    // Login rápido
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Acción: Agregar la mochila
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Validación: El globo del carrito debe mostrar "1"
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  // CASO 3: Validación de Precios (Muestra que validas datos numéricos)
  test('TC-03: Validación de Integridad de Precios', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Validamos que el precio de la mochila sea $29.99
    const precio = page.locator('.inventory_item_price').first();
    await expect(precio).toContainText('$29.99');
  });

  // CASO 4: Navegación al Detalle (Muestra navegación entre páginas)
  test('TC-04: Navegación a Detalle de Producto', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Clic en el nombre del producto
    await page.getByText('Sauce Labs Backpack').click();

    // Validación: Botón de "Back to products" debe ser visible
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });

  // CASO 5: Logout (Cierra el ciclo del usuario)
  test('TC-05: Cierre de Sesión Seguro', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Abrir menú lateral
    await page.click('#react-burger-menu-btn');
    
    // Clic en Logout
    await page.click('#logout_sidebar_link');

    // Validación: Regresamos al login
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
  // 🔴 ESTADO: FAILED (Fallo de Aserción)
  // Útil para mostrar: "El test corrió bien, pero el dato no era el esperado"
  test('TC-06: Validación de Inventario (Fallo Intencional)', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Intentamos validar que el título sea "CARRITO" cuando en realidad es "PRODUCTS"
    // Esto generará una barra ROJA en el reporte
    await expect(page.locator('.title')).toHaveText('CARRITO DE COMPRAS'); 
  });

  // ⚠️ ESTADO: BROKEN (Timeout / Elemento no encontrado)
  // Útil para mostrar: "El test se rompió porque la página tardó o cambió"
  test('TC-07: Verificar Elemento Inexistente (Simulación de Bug)', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Le damos un tiempo corto (2s) para buscar un botón que NO existe
    // Esto suele marcarse como "Broken" o "Failed" con error de Timeout
    test.setTimeout(5000); // Forzamos límite de tiempo total
    await expect(page.locator('#boton-fantasma-que-no-existe')).toBeVisible({ timeout: 2000 });
  });

  // ⚪ ESTADO: SKIPPED (Prueba Omitida)
  // Útil para mostrar: "Esta prueba está pendiente de arreglar o no aplica hoy"
  test('TC-08: Prueba de Funcionalidad Futura (Skipped)', async ({ page }) => {
    test.skip(true, 'Esta funcionalidad se liberará en el próximo Sprint');
    
    // Este código nunca se ejecutará
    await page.goto('https://google.com');
  });

  // 🔴 ESTADO: SOFT ASSERTION FAILURE (Fallo "Suave")
  // Útil para mostrar: "Fallaron varias cosas pequeñas, pero el test terminó"
  test('TC-09: Validación Visual Múltiple (Soft Assertions)', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Soft assertions: No detienen el test si fallan, reportan todo al final
    await expect.soft(page.locator('.title')).toHaveText('PRODUCTOS'); // Fallará (es "PRODUCTS")
    await expect.soft(page.locator('.shopping_cart_badge')).toBeVisible(); // Pasará (si hay items) o Fallará
    
    // El reporte mostrará todos los errores acumulados
  });

  // 🟢 ESTADO: PASSED (Otro éxito para equilibrar)
  test('TC-10: Login de Usuario Bloqueado (Validación Correcta)', async ({ page }) => {
    // Usamos el usuario que está bloqueado a propósito
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Validamos que aparezca el mensaje de error correcto
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
  });

});