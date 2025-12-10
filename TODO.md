
### Features/Backlog:
- General search (NORAD ID, orbit type, company/type, etc)
- Directory (tableview, search, and dynamic pages that contain info and cesium?) 
- Adjust Z-index for sidebar and header. Cesium is too high ****
- Enabling the "cone" view to see what area a sat covers
- Add live current time 
- Integrate data from Spack-Track api
- Hook up backend (supabase/postgres)
- Globe view (With directory)
- About page
- NORAD ID from TLE on table-data
- Single: Option to choose different input
- Single: As a user, I should be able to read and access my history of processed TLEs. On click, see that state? Then auth.


1. Single TLE Page
~~- Left align input component on 2xl sizes~~
~~- Data table should be the same size regardless of state~~
~~- Add clear button to Input component~~
~~- Change zoom on satellite flyTo~~
~~- Add maximum zoom to globe~~
~~- Adjust Z-index for sidebar and header. Cesium is too high~~
~~- Re evaluate the data displayed on the table~~
  ~~- lat, lon, etc needs to be accurate.~~
  ~~- Also put units next to the strings. Not their own column~~
- Better colors for the orbit line and entity on globe
- Transform SGP4 to GCRF rotation frame since sgp4 outputs TEME by default
- Add time control and animation. `sgp4(satrec, 0)` second parameter to be adjustable via slider (inside Cesium box)
- Have table data change live with play
- Add button to clear the full state of every component




Bonus: A component for TLE output and viz. The dev just needs to pass a tle as props

React component that visualzizes TLE on a globe. Can auto parse when the TLE is in any format
  acts as a cesium wrapper and auto parser under the hood
    Single props={variable}, constellation={multi}, parse="txt", viewer="envExample"


### Stuff for Later

Current Navbar:
- Dashboard
- Satellite Operations
  - Directory
  - Single TLE Process (Single Propogation?)
  - Batch Analysis (or Constellation Analysis?)

Navbar:
  - Dashboard
  - Satellite Propogation
    - Single TLE
    - TLE Dataset
    - Globe
    - Directory (tableview, search, and dynamic pages that contain info and cesium?)
  - Scheduling
    - Dashboard
    - Ground Stations


Navbar2:
  - Dashboard. Overview (or Mission Control)
  - Orbit Analysis
    - Single TLE Processor
    - Batch TLE Analysis
    - Orbit Prediction?
  - Scheduling
    - Dashboard
    - Ground Stations


Scheduling
  - UI components
    - Gantt view
    - Map view
    - Table view
    - Telemetry view?
  - Mock satellites on backend. When button is clicked, triggers mock telemetry and movement
