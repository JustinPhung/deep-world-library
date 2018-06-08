import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepWorldComponent } from './deep-world.component';

describe('DeepWorldComponent', () => {
  let component: DeepWorldComponent;
  let fixture: ComponentFixture<DeepWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeepWorldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeepWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
