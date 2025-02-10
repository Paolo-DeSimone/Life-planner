import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveDetailDialogComponent } from './objective-detail-dialog.component';

describe('ObjectiveDetailDialogComponent', () => {
  let component: ObjectiveDetailDialogComponent;
  let fixture: ComponentFixture<ObjectiveDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectiveDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectiveDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
