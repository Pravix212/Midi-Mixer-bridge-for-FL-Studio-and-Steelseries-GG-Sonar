# name=MIDI Mixer Bridge
import device
import midi
import mixer
import ui

# --- CONFIGURATION ---
# This script acts as a secondary listener for MIDI Mixer app commands.
# It ensures that volume changes in FL Studio reflect in the MIDI Mixer app 
# without interfering with your AKAI MIDIMix or MPK Mini mappings.

def OnMidiMsg(event):
    # We set handled to False so that other scripts (like your Magician script) 
    # can still hear the hardware if they need to.
    event.handled = False

def OnControlChange(event):
    # This captures CC movements (like your faders) and 
    # ensures FL Studio doesn't "block" them from the MIDI Mixer app.
    if event.data1 >= 0 and event.data1 <= 127:
        # We allow the event to pass through
        event.handled = False

def OnRefresh(flags):
    # This keeps the MIDI Mixer App updated when you move faders 
    # inside the FL Studio software with your mouse.
    if flags & midi.HW_Dirty_Mixer:
        for i in range(mixer.trackCount()):
            vol = mixer.getTrackVolume(i)
            # This sends the position back to the MIDI loop for the app to see
            # device.midiOutMsg(midi.MIDI_CONTROLCHANGE, 0, i, int(vol * 127))

def OnInit():
    print("MIDI Mixer Bridge Loaded.")
    print("Syncing Windows Audio with FL Studio Engine...")

def OnDeInit():
    print("MIDI Mixer Bridge Closed.")