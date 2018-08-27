import { createTracksFromFolder } from '@data/github/track-reader';

describe('Reading tracks', () => {
  const tracks = createTracksFromFolder();

  test('Read all tracks from local folder', () => {
    expect(tracks.length).toBe(10);
  });

  test('Read the correct number of steps for each track', () => {
    expect(tracks[0].steps.length).toBe(3);
    expect(tracks[1].steps.length).toBe(3);
    expect(tracks[2].steps.length).toBe(3);
    expect(tracks[3].steps.length).toBe(3);
    expect(tracks[4].steps.length).toBe(2);
    expect(tracks[5].steps.length).toBe(3);
    expect(tracks[6].steps.length).toBe(3);
    expect(tracks[7].steps.length).toBe(3);
    expect(tracks[8].steps.length).toBe(2);
    expect(tracks[9].steps.length).toBe(2);
  });
});
