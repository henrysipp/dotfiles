import { GObject, property, register } from "astal";
import { execAsync } from "astal/process";
import { monitorFile, readFileAsync } from "astal/file";

@register()
export default class Brightness extends GObject.Object {
  @property(Number)
  declare screen: number;

  @property(Number)
  declare screenMax: number;

  private brightnessPath = "/sys/class/backlight/amdgpu_bl1/brightness";
  private maxBrightnessPath = "/sys/class/backlight/amdgpu_bl1/max_brightness";

  constructor() {
    super();
    this.screen = 0;
    this.screenMax = 100;
    this.initBrightness();
    this.setupMonitoring();
  }

  private async initBrightness() {
    try {
      // Read max brightness once
      const maxBrightness = await readFileAsync(this.maxBrightnessPath);
      this.screenMax = parseInt(maxBrightness.trim());
      
      // Read current brightness
      const brightness = await readFileAsync(this.brightnessPath);
      this.screen = parseInt(brightness.trim());
    } catch (error) {
      console.error("Failed to get brightness:", error);
      // Fallback to brightnessctl
      this.getScreenBrightness();
    }
  }

  private async getScreenBrightness() {
    try {
      // Get current brightness
      const brightness = await execAsync(["brightnessctl", "g"]);
      // Get max brightness
      const maxBrightness = await execAsync(["brightnessctl", "m"]);
      
      this.screen = parseInt(brightness);
      this.screenMax = parseInt(maxBrightness);
    } catch (error) {
      console.error("Failed to get brightness:", error);
    }
  }

  private setupMonitoring() {
    // Monitor brightness file for changes
    monitorFile(this.brightnessPath, async (file) => {
      const brightness = await readFileAsync(file);
      this.screen = parseInt(brightness.trim());
      this.notify("screen");
    });
  }

  async setScreenBrightness(value: number) {
    try {
      // Set brightness as percentage
      const percentage = Math.round((value / this.screenMax) * 100);
      await execAsync(["brightnessctl", "s", `${percentage}%`]);
      this.screen = value;
    } catch (error) {
      console.error("Failed to set brightness:", error);
    }
  }

  get screenPercent() {
    return (this.screen / this.screenMax) * 100;
  }
}