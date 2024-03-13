import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalItemComponent } from './musical-item.component';

describe('MusicalItemComponent', () => {
  let component: MusicalItemComponent;
  let fixture: ComponentFixture<MusicalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicalItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
