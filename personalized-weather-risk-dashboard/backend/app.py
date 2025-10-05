from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    temp = data.get('temperature', 50)
    wind = data.get('windspeed', 10)
    precip = data.get('precipitation', 5)

    # Mock prediction with random probabilities
    result = {
        "very_hot": round(random.uniform(0, 1), 2),
        "very_cold": round(random.uniform(0, 1), 2),
        "very_windy": round(random.uniform(0, 1), 2),
        "very_wet": round(random.uniform(0, 1), 2),
        "very_uncomfortable": round(random.uniform(0, 1), 2),
    }

    return jsonify({"input": data, "predictions": result})

if __name__ == '__main__':
    app.run(debug=True)
