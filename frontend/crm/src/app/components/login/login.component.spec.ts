import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.loginForm.email).toEqual('');
    expect(component.loginForm.password).toEqual('');
    expect(component.showPassword).toBeFalse();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalse();
  });

  it('should update email when input changes', fakeAsync(() => {
    const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    
    expect(component.loginForm.email).toEqual('test@example.com');
  }));

  it('should update password when input changes', fakeAsync(() => {
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    passwordInput.value = 'testpassword';
    passwordInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    
    expect(component.loginForm.password).toEqual('testpassword');
  }));

  it('should call onLogin method when form is submitted', () => {
    spyOn(component, 'onLogin');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    
    expect(component.onLogin).toHaveBeenCalled();
  });

  it('should change password input type when visibility is toggled', () => {
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    expect(passwordInput.type).toBe('password');
    
    component.togglePasswordVisibility();
    fixture.detectChanges();
    
    expect(passwordInput.type).toBe('text');
  });

  it('should render the correct Login Page Title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('Welcome Back');
  });

  it('should render email and password inputs', () => {
    const emailInput = fixture.debugElement.query(By.css('#email'));
    const passwordInput = fixture.debugElement.query(By.css('#password'));
    
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should render social login buttons', () => {
    const socialButtons = fixture.debugElement.queryAll(By.css('.grid button'));
    expect(socialButtons.length).toBe(2);
  });

  it('should render sign up link', () => {
    const signUpLink = fixture.debugElement.query(By.css('#signup'));
    expect(signUpLink.nativeElement.textContent).toContain('Sign up');
  });
});