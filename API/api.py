from flask import request, Flask, jsonify
from flask_cors import *
import predict

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/test', methods=['POST'])
def test():
    json=request.json
    results=predict.main(json)
    return jsonify(results=results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8765)
