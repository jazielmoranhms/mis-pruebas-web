// pages/LoginPage.ts
import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  // 1. Definimos las variables que usaremos (los "Locators")
  readonly page: Page;
  readonly usuarioInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // 2. El Constructor: Se ejecuta al inicio y "mapea" los elementos
  constructor(page: Page) {
    this.page = page;
    // Aquí pon los selectores REALES de tu sitio
    this.usuarioInput = page.getByLabel('Usuario'); // o el selector que usaste
    this.passwordInput = page.getByLabel('Contraseña');
    this.loginButton = page.getByRole('button', { name: 'Ingresar' });
  }

  // 3. Métodos: Las "acciones" que puede hacer el usuario en esta página
  async irALogin() {
    await this.page.goto('https://qaapp.oncaregroup.com/sign-in?re=https:%2F%2Fqa.oncaregroup.com%2FSistema%2FModulos.php');
  }

  async loguearse(usuario: string, contrasena: string) {
    await this.usuarioInput.fill(usuario);
    await this.passwordInput.fill(contrasena);
    await this.loginButton.click();
  }
}