import { test, expect } from '@playwright/test';

test('Login Oncare', async ({ page }) => {
  await page.goto('https://qaapp.oncaregroup.com/sign-in?re=https:%2F%2Fqa.oncaregroup.com%2FSistema%2FModulos.php');
  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('jaziel.moran');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill(process.env.PASSWORD_SECRETO!);
  await page.getByRole('button', { name: 'Ingresar' }).click();
});