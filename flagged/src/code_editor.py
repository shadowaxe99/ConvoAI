import os
from git import Repo

class CodeEditor:
    def __init__(self):
        self.generatedCode = {}

    def display_code(self, project_name):
        if not project_name or project_name not in self.generatedCode:
            return 'No code generated for this project yet.'
        return self.generatedCode[project_name]

    def commit_changes(self, project_name, commit_message):
        if not project_name or project_name not in self.generatedCode:
            return 'No code generated for this project yet.'
        try:
            repo = Repo(os.getcwd())
            repo.git.add(update=True)
            repo.index.commit(commit_message)
            return 'Changes committed successfully.'
        except Exception as e:
            return str(e)

    def update_code(self, project_name, new_code):
        if not project_name:
            return 'project_name field is required'
        self.generatedCode[project_name] = new_code
        return 'Code updated successfully.'

code_editor = CodeEditor()