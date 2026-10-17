// Web Audio API procedural sound synthesizer - Permanently disabled / muted per preference
class CyberSoundEngine {
  public toggleMute(): boolean {
    return true;
  }

  public getMuted(): boolean {
    return true;
  }

  public playBlip(_freq = 600, _duration = 0.04, _volume = 0.05): void {}

  public playScan(): void {}

  public playSuccess(): void {}

  public playAlert(): void {}
}

export const soundEngine = new CyberSoundEngine();
