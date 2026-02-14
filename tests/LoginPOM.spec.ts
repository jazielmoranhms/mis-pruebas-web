import { test, expect } from '@playwright/test';
// Importamos la clase que acabamos de crear
import { LoginPage } from '../pages/LoginPage';

test('Login exitoso con POM', async ({ page }) => {
  // Instanciamos el objeto (le damos vida)
  const loginPage = new LoginPage(page);

  // Usamos los métodos limpios
  await loginPage.irALogin();
  await loginPage.loguearse('jaziel.moran', process.env.PASSWORD_SECRETO!);

  // Aquí seguiría tu validación (assertion)
  //await expect(page).toHaveURL('https://qa.oncaregroup.com/Sistema/Modulos.php');
  await expect(page.getByRole('link', { name: 'Admisión' })).toBeVisible();
});