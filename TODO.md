
### Features/Backlog:

- General search (NORAD ID, orbit type, company/type, etc)



1. Single TLE Page
~~- Left align input component on 2xl sizes~~
~~- Data table should be the same size regardless of state~~
- Add clear button to Input component
- Transform SGP4 to GCRF rotation frame since sgp4 outputs TEME by default
- Add time control and animation. `sgp4(satrec, 0)` second parameter to be adjustable via slider?
- CesiumComponent
  - Change zoom on satellite flyTo
  - Add maximum zoom to globe
  - Better colors for the orbit line and entity


### Stuff for Later

Navbar:
  - Dashboard
  - Satellite Propogation
    - Single TLE
    - TLE Dataset
    - Globe
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
