# Finder
Finder is a Tauri based desktop application that uses Angular for the Frontend and Rust for the backend. 

### Run
> `npm run tauri dev`

### Build
> `npm run tauri build`

### Potential Error
> Error You must change the bundle identifier in `tauri.conf.json > tauri > bundle > identifier`

This can be fixed by renaming the `"identifier"` field to something compatible with your machine
