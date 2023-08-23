import json
from flask import Flask, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

projectChat = {}

@app.route('/initialize_chat', methods=['POST'])
def initialize_chat():
    try:
        project_id = request.json.get('project_id')
        if not project_id:
            return json.dumps({'error': 'project_id field is required'}), 400, {'ContentType':'application/json'}
        projectChat[project_id] = []
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    except Exception as e:
        return json.dumps({'error': str(e)}), 500, {'ContentType':'application/json'}

@socketio.on('message')
def handle_message(data):
    try:
        project_id = data.get('project_id')
        message = data.get('message')
        if not project_id or not message:
            return {'error': 'project_id and message fields are required'}
        projectChat[project_id].append(message)
        emit('message', {'project_id': project_id, 'message': message}, broadcast=True)
    except Exception as e:
        return {'error': str(e)}

if __name__ == '__main__':
    socketio.run(app)