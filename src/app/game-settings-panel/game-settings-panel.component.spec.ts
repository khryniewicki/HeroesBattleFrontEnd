import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSettingsPanelComponent } from './game-settings-panel.component';

describe('GameSettingsPanelComponent', () => {
  let component: GameSettingsPanelComponent;
  let fixture: ComponentFixture<GameSettingsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSettingsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSettingsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
