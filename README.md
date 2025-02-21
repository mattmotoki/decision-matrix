# 2Dotable

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
* features
    * user login / profiles
    * visualize task history
        * visualize completed tasks (score vs time)    
    * task subdimensions
        * tree view        
    * additional task fields
        * last modified date        
* architecture
    * store user date in a database
* UI fixes
    * clean up mobile styling
        * navbar should fold sooner
        
* UX improvements
    * add toast notifications when updating a task
        * maybe keep the task in the table until the save is complete, but show a loading spinner or something
    * add a temporary green checkmark to the save menu item when the save is complete
    * sort rows by column values
    * add option to hide columns in the task table
    * make it easier to modify the dimension weights via the header row
    * consider making edit a modal
    * send task reminders
    * double click on task cell to edit
    * make task actions less redundants
    * add ctrl + s to save the task
    * clear local storage
    * let the user rename the dimensions
* bugs:
    * Saving twice withouth changing anything doesn't trigger the toast notification
    * Local storage auto saves when adding a new dimension
    * The task table hover effects don't extend to low score tasks; let's highlight the row by either darkening all the cells or by setting it to a constant color like gray for all the cells
    * The deadline value in the table does not agree with the input form (it is one day behind in the table)
    * White space on the right column of the Task Manager should be removed on mobile
    * when a user clocks on the elipses of the more options twice, the app goes blank