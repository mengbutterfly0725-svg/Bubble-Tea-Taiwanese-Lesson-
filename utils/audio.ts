export enum SoundEffect {
  Success = 'Success',
  Error = 'Error',
  Click = 'Click',
  Select = 'Select',
  Connect = 'Connect',
  Disconnect = 'Disconnect',
}

const soundUrls: Record<SoundEffect, string> = {
  [SoundEffect.Success]: 'https://cdn.pixabay.com/audio/2022/03/15/audio_2b28b1a64b.mp3', // Chime
  [SoundEffect.Error]: 'https://cdn.pixabay.com/audio/2022/03/10/audio_b5fa53267b.mp3',   // Error buzz
  [SoundEffect.Click]: 'https://cdn.pixabay.com/audio/2022/03/15/audio_182a360822.mp3',   // UI Click
  [SoundEffect.Select]: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bb630cc098.mp3',    // Select Pop
  [SoundEffect.Connect]: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3b09232c4.mp3', // Connect Pop
  [SoundEffect.Disconnect]: 'https://cdn.pixabay.com/audio/2022/03/10/audio_1c977c7c25.mp3', // Disconnect Pop
};

// Pre-load audio to avoid delays on first play and to cache it.
const audioCache: { [key in SoundEffect]?: HTMLAudioElement } = {};

Object.keys(soundUrls).forEach(key => {
    const sound = key as SoundEffect;
    audioCache[sound] = new Audio(soundUrls[sound]);
    audioCache[sound]?.load();
});


export const playSound = (sound: SoundEffect) => {
  const audio = audioCache[sound];
  if (audio) {
    // Rewind to the start in case it's already playing
    audio.currentTime = 0;
    audio.play().catch(error => {
      // Autoplay is often blocked by browsers until the user interacts with the page.
      // This is generally not an issue here since sounds are triggered by user actions.
      console.warn(`Sound effect '${sound}' couldn't be played:`, error);
    });
  }
};