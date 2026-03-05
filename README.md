# Universal FL Studio <-> MIDI Mixer Bridge

This plugin allows FL Studio to communicate with the **MIDI Mixer** app (and SteelSeries Sonar) without requiring a dedicated hardware port. It is designed to be **injected** into your existing MIDI scripts.

## 📥 Installation

### Part 1: MIDI Mixer Plugin
1. Download `index.js` and `plugin.json`.
2. Place them in a new folder inside `%appdata%/midi-mixer-app/plugins`.
3. Restart MIDI Mixer.

### Part 2: FL Studio Integration (The "Glue" Code)
Instead of replacing your MIDI script, copy and paste the following snippet into the **bottom** of your existing `.py` script (located in `Documents\Image-Line\FL Studio\Settings\Hardware\[YourDevice]`).

```python
# --- START MIDI MIXER BRIDGE SNIPPET ---
import device
import midi
import mixer

def OnRefresh(flags):
    # This sends FL Studio mixer movements back to the MIDI Mixer App
    if flags & midi.HW_Dirty_Mixer:
        for i in range(mixer.trackCount()):
            vol = mixer.getTrackVolume(i)
            # Adjust CC and Channel to match your MIDI Mixer profile
            device.midiOutMsg(midi.MIDI_CONTROLCHANGE, 0, i, int(vol * 127))

print("MIDI Mixer Bridge Sync Active")
# --- END MIDI MIXER BRIDGE SNIPPET ---
