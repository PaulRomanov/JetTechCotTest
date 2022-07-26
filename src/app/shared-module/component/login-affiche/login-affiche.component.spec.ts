import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAfficheComponent } from './login-affiche.component';

describe('LoginAfficheComponent', () => {
  let component: LoginAfficheComponent;
  let fixture: ComponentFixture<LoginAfficheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAfficheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
