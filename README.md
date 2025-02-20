# Dotable

A task prioritizer tool that simplifies task planning by breaking it into two intuitive steps:

1. **Low-level thinking**: Score individual tasks across different dimensions like urgency and difficulty
2. **High-level thinking**: Set dimension weights once to reflect your overall priorities

This separation helps you make better decisions by focusing on one thing at a time - first the details of each task, then your general priorities. 

Tasks are arranged in a matrix and ranked by the total score.

## Getting Started

```bash
npm install
npm run dev
```

## Bugs / TODO
* add user database storage / login / profiles
* visualize task history
    * visualize completed tasks (score vs time)
    * show total score
* additional task variables
    * optional tags
    * optional deadline
    * optional description
    * last modified date
* UI fixes
    * clean up mobile styling
    * sort rows by header selection
    * add option to hide task columns
    * table hover effects don't extend to low score tasks
* UX improvements
    * make it easier to modify the dimension weights via the header row
    * consider making edit a modal
    * send task reminders
    * double click on task cell to edit
    * add full timestamp to file downloads
    * make task actions less redundants
* code
    * rename ExportMenu to DownloadMenu    
* create subdimensions for tasks
    * create tree view



