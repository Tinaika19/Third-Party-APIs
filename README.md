# Task Board Application

## Description
A simple task board application that allows a team to manage project tasks. The application features dynamically updated HTML and CSS powered by jQuery and uses the Day.js library to handle dates.

## User Story
As a project team member with multiple tasks to organize.<br>
I want a task board 
So that I can add individual project tasks, manage their state of progress, and track overall project progress accordingly.

## Acceptance Criteria
- When I open the task board, the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed).<br>
- Each task is color-coded to indicate whether it is nearing the deadline (yellow) or is overdue (red).<br>
- When I click on the button to define a new task, I can enter the title, description, and deadline date for the new task into a modal dialog.<br>
- When I click the save button for that task, the properties for that task are saved in localStorage.<br>
- When I drag a task to a different progress column, the task's progress state is updated accordingly and will stay in the new column after refreshing.<br>
- When I click the delete button for a task, the task is removed from the task board and will not be added back after refreshing.<br>
- When I refresh the page, the saved tasks persist.

## Technologies Used
- HTML<br>
- CSS<br>
- jQuery<br>
- Day.js<br>

## How to Use
1. Open the `index.html` file in a web browser.<br>
2. Click the "New Task" button to add a new task.<br>
3. Fill in the task details (title, description, and deadline) and click "Save Task".<br>
4. Drag tasks between columns to update their progress state.<br>
5. Click the "Delete" button on a task to remove it from the board.<br>
6. Tasks will persist in localStorage even after refreshing the page.<br>


## ScreenShot
![screenshot](assets/screenshot)


## Link
