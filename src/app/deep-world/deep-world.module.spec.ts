import { DeepWorldModule } from './deep-world.module';

describe('DeepWorldModule', () => {
  let deepWorldModule: DeepWorldModule;

  beforeEach(() => {
    deepWorldModule = new DeepWorldModule();
  });

  it('should create an instance', () => {
    expect(deepWorldModule).toBeTruthy();
  });
});
