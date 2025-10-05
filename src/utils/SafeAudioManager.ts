/**
 * SafeAudioManager - Handles mobile browser audio policies safely
 * Prevents crashes when audio permissions are revoked during idle periods
 */

class SafeAudioManager {
  private audioRefs: Map<string, HTMLAudioElement> = new Map();
  private audioContext: AudioContext | null = null;
  private isAudioEnabled: boolean = true;
  private hasUserInteracted: boolean = false;

  constructor() {
    // Listen for user interactions to re-enable audio
    this.setupUserInteractionListeners();
  }

  /**
   * Register an audio element with a key for safe playback
   */
  registerAudio(key: string, audioElement: HTMLAudioElement): void {
    this.audioRefs.set(key, audioElement);
    
    // Preload the audio
    audioElement.preload = 'auto';
    
    // Add error handlers
    audioElement.addEventListener('error', (e) => {
      console.warn(`Audio error for ${key}:`, e);
    });
  }

  /**
   * Safely play an audio element by key
   */
  async playAudio(key: string): Promise<boolean> {
    if (!this.isAudioEnabled) {
      console.log(`Audio disabled, skipping ${key}`);
      return false;
    }

    const audio = this.audioRefs.get(key);
    if (!audio) {
      console.warn(`Audio element ${key} not found`);
      return false;
    }

    try {
      // Reset audio to beginning
      audio.currentTime = 0;
      
      // Attempt to play
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        console.log(`Successfully played ${key}`);
        return true;
      }
      
      return true;
    } catch (error: any) {
      console.warn(`Failed to play audio ${key}:`, error);
      
      // If we get a permission error, disable audio temporarily
      if (error && error.name === 'NotAllowedError') {
        this.isAudioEnabled = false;
        console.log('Audio permissions revoked, disabling audio until next user interaction');
      }
      
      return false;
    }
  }

  /**
   * Setup listeners for user interactions to re-enable audio
   */
  private setupUserInteractionListeners(): void {
    const enableAudio = () => {
      this.isAudioEnabled = true;
      this.hasUserInteracted = true;
      console.log('User interaction detected, audio re-enabled');
    };

    // Listen for various user interaction events
    const events = ['click', 'touch', 'touchstart', 'touchend', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, enableAudio, { once: false, passive: true });
    });
  }

  /**
   * Create and initialize audio context (for more advanced audio handling)
   */
  private async initAudioContext(): Promise<void> {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Resume context if it's suspended (common on mobile)
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }
      } catch (error) {
        console.warn('Failed to initialize AudioContext:', error);
      }
    }
  }

  /**
   * Get current audio status
   */
  getStatus(): { enabled: boolean; hasUserInteracted: boolean; contextState?: string } {
    return {
      enabled: this.isAudioEnabled,
      hasUserInteracted: this.hasUserInteracted,
      contextState: this.audioContext?.state
    };
  }

  /**
   * Manually enable/disable audio
   */
  setEnabled(enabled: boolean): void {
    this.isAudioEnabled = enabled;
    console.log(`Audio manually ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Preload all registered audio files
   */
  preloadAll(): void {
    this.audioRefs.forEach((audio, key) => {
      audio.load();
      console.log(`Preloaded audio: ${key}`);
    });
  }
}

// Create singleton instance
export const safeAudioManager = new SafeAudioManager();

// Export the class for testing
export { SafeAudioManager };
