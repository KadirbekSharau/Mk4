import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsPage } from './forms_page';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FormsPage
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FormsPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'crowdy'`, () => {
    const fixture = TestBed.createComponent(FormsPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('crowdy');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(FormsPage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('crowdy app is running!');
  });
});
