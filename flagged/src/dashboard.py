import json
import os

# Import shared dependencies
from shared_dependencies import activeProjects, projectStatus

# DOM Element ID
dashboard_id = "projectDashboard"

def load_projects():
    """
    Load all active projects from the shared dependency 'activeProjects'
    """
    if not os.path.exists(activeProjects):
        return {}
    try:
        with open(activeProjects, 'r') as file:
            projects = json.load(file)
        return projects
    except Exception as e:
        return str(e)

def load_project_status():
    """
    Load the status of all projects from the shared dependency 'projectStatus'
    """
    if not os.path.exists(projectStatus):
        return {}
    try:
        with open(projectStatus, 'r') as file:
            status = json.load(file)
        return status
    except Exception as e:
        return str(e)

def display_dashboard():
    """
    Display the project dashboard with a summary of all active Clippy projects
    """
    projects = load_projects()
    status = load_project_status()

    print(f"{'Project Name':<20} {'Objectives':<50} {'Status':<10}")
    for project in projects:
        print(f"{project['name']:<20} {project['objectives']:<50} {status[project['name']]:<10}")

if __name__ == "__main__":
    display_dashboard()