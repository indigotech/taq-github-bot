// You can import your modules
import { createTracksFromFolder } from '../src/data/mappers/track-reader';
// test('that we can run tests', () => {
//   // your real tests go here
//   expect(1 + 2 + 3).toBe(6)
// })

test('Read tracks from .md files', () => {
  const tracks = createTracksFromFolder();
  expect(tracks.length).toBe(10);
});

// For more information about testing with Jest see:
// https://facebook.github.io/jest/
