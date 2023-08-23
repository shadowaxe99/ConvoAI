from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Shared Variables
agentConfig = {}

# Shared Schemas
AgentConfigSchema = {
    "type": "object",
    "properties": {
        "agentName": {"type": "string"},
        "status": {"type": "string"},
        "configDetails": {"type": "object"}
    },
    "required": ["agentName", "status"]
}

@app.route('/agent_management', methods=['GET'])
def get_agent_config():
    return jsonify(agentConfig)

@app.route('/agent_management', methods=['POST'])
def update_agent_config():
    try:
        data = request.get_json()
        agentName = data.get('agentName')
        status = data.get('status')
        if not agentName or not status:
            return jsonify({"error": "'agentName' and 'status' fields are required"}), 400
        configDetails = data.get('configDetails', {})

        # Update the agent configuration
        agentConfig[agentName] = {
            "status": status,
            "configDetails": configDetails
        }
        return jsonify({"message": "Agent configuration updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)