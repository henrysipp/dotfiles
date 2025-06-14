import { GObject, property, register } from "astal";
import Wp from "gi://AstalWp";

@register()
export default class Volume extends GObject.Object {
  @property(Number)
  declare volume: number;

  @property(Number)
  declare volumeMax: number;

  @property(Boolean)
  declare muted: boolean;

  private wp: any;
  private speaker: any;

  constructor() {
    super();
    this.volume = 0;
    this.volumeMax = 1; // WirePlumber uses 0-1 range
    this.muted = false;
    
    this.wp = Wp.get_default();
    this.initVolume();
  }

  private initVolume() {
    // Wait for WirePlumber to be ready
    if (this.wp.audio && this.wp.audio.default_speaker) {
      this.setupSpeaker();
    } else {
      this.wp.connect("ready", () => {
        this.setupSpeaker();
      });
    }
  }

  private setupSpeaker() {
    this.speaker = this.wp.audio.default_speaker;
    
    if (!this.speaker) {
      console.error("No default speaker found");
      return;
    }

    // Set initial values
    this.muted = this.speaker.mute;
    this.volume = this.muted ? 0 : this.speaker.volume;

    // Monitor changes
    this.speaker.connect("notify::volume", () => {
      if (!this.muted) {
        this.volume = this.speaker.volume;
        this.notify("volume");
      }
    });

    this.speaker.connect("notify::mute", () => {
      this.muted = this.speaker.mute;
      this.volume = this.muted ? 0 : this.speaker.volume;
      this.notify("muted");
      this.notify("volume");
    });
  }

  setVolume(value: number) {
    if (this.speaker) {
      // Clamp between 0 and 1
      const clampedValue = Math.max(0, Math.min(1, value));
      
      // If setting volume > 0 while muted, unmute first
      if (clampedValue > 0 && this.speaker.mute) {
        this.speaker.mute = false;
        // Small delay to ensure unmute is processed
        setTimeout(() => {
          this.speaker.volume = clampedValue;
        }, 50);
      } else {
        this.speaker.volume = clampedValue;
      }
    }
  }

  toggleMute() {
    if (this.speaker) {
      this.speaker.mute = !this.speaker.mute;
    }
  }

  get volumePercent() {
    return this.volume * 100;
  }
}