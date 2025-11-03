from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# -------------------- Load Model --------------------
try:
    model = joblib.load("pcos_model.pkl")
    model_features = list(model.feature_names_in_)
    print("✅ Model loaded successfully!")
except Exception as e:
    print("⚠️ Model load failed:", e)
    model = None
    # Default features if loading fails
    model_features = ['Age', 'Weight', 'Height', 'BMI', 'Waist:HipRatio',
                      'Cycle', 'WeightGain', 'HairGrowth', 'HairLoss',
                      'SkinDarkening', 'Acne', 'Fatigue', 'Anxiety',
                      'Depression', 'Exercise', 'FamilyHistory']

# -------------------- Helper Functions --------------------
def extract_numbers(text):
    import re
    nums = re.findall(r"\d+", str(text))
    return [int(n) for n in nums]

def preprocess_answers(all_answers):
    try:
        data = {}

        # Extract numbers for Age, Weight, Height
        numbers = []
        for ans in all_answers.values():
            numbers.extend(extract_numbers(ans))
        if len(numbers) >= 3:
            data['Age'], data['Weight'], data['Height'] = numbers[:3]
        else:
            data['Age'], data['Weight'], data['Height'] = 25, 60, 160

        # Derived features
        data['BMI'] = round(data['Weight'] / ((data['Height'] / 100) ** 2), 2)
        data['Waist'], data['Hip'] = 70, 95
        data['Waist:HipRatio'] = round(data['Waist'] / data['Hip'], 2)

        # Keyword-based binary features
        keywords = {
            'Cycle': ['irregular'],
            'WeightGain': ['gain', 'weight', 'gained', 'heavier'],
            'HairGrowth': ['facial hair', 'body hair', 'excess hair'],
            'HairLoss': ['hair fall', 'bald', 'hair loss'],
            'SkinDarkening': ['dark', 'skin dark'],
            'Acne': ['pimples', 'acne', 'spots'],
            'Fatigue': ['tired', 'fatigue'],
            'Anxiety': ['anxious', 'anxiety'],
            'Depression': ['depressed', 'sad'],
            'Exercise': ['exercise', 'gym', 'walk'],
            'FamilyHistory': ['mother', 'sister', 'pcos']
        }

        for key in keywords:
            data[key] = 0
            for ans in all_answers.values():
                if any(word in ans.lower() for word in keywords[key]):
                    data[key] = 1
                    break

        # Fill all model features in correct order
        for f in model_features:
            if f not in data:
                data[f] = 0

        X_input = pd.DataFrame([[data[f] for f in model_features]], columns=model_features)
        return X_input
    except Exception as e:
        print("Preprocessing Error:", e)
        # Fallback to zeros
        return pd.DataFrame([[0]*len(model_features)], columns=model_features)

def get_risk_level(prediction):
    """Friendly risk level from model output"""
    try:
        return prediction
    except:
        return "Low"

# -------------------- Routes --------------------
@app.route("/questions", methods=["GET"])
def get_questions():
    # Keep tone exactly as you want
    questions = [
        {"id": "q1", "question": "What is your age?"},
        {"id": "q2", "question": "What is your weight (in kg)?"},
        {"id": "q3", "question": "What is your height (in cm)?"},
        {"id": "q4", "question": "Do you have irregular periods?"},
        {"id": "q5", "question": "Have you experienced recent weight gain?"},
        {"id": "q6", "question": "Do you have acne or pimples?"},
        {"id": "q7", "question": "Have you noticed any skin darkening?"},
        {"id": "q8", "question": "Do you feel tired or fatigued often?"},
        {"id": "q9", "question": "Do you experience anxiety or depression?"},
        {"id": "q10", "question": "Do you exercise regularly?"},
        {"id": "q11", "question": "Is there a family history of PCOS?"}
    ]
    return jsonify({"questions": questions})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    answers = data.get("answers", {})

    try:
        # Preprocess answers for model
        X_input = preprocess_answers(answers)

        # Predict using model
        prediction_raw = model.predict(X_input)[0]

        # Convert to native Python type (string)
        prediction = str(prediction_raw)

        # Determine risk level
        risk_level = prediction  # Can customize with get_risk_level if needed

        # Friendly, empathetic messages
        if risk_level.lower() == "low" or risk_level == "0":
            description = (
                "🎉 Great news! Your responses suggest a **Low PCOS risk**. "
                "Keep maintaining a balanced diet, stay hydrated, and continue with light physical activities. "
                "You’re doing awesome — stay consistent and take care of your health 💪"
            )
        elif risk_level.lower() == "medium" or risk_level == "1":
            description = (
                "⚠️ Based on your responses, your **PCOS risk seems Medium**. "
                "This means some symptoms might indicate a possible hormonal imbalance. "
                "It’s best to track your cycles, eat a nutrient-rich diet, and exercise regularly. "
                "You may also want to consult a gynecologist for early advice ❤️"
            )
        else:  # High
            description = (
                "❤️ It looks like your **PCOS risk is High**. Please don’t panic — it’s not a final diagnosis. "
                "Many women manage PCOS effectively with early care and lifestyle changes. "
                "Consider visiting a gynecologist soon for a detailed checkup, "
                "and start including regular exercise, balanced meals, and stress-free routines in your day 🌸"
            )

        disclaimer = "⚠️ Note: This is an AI-based estimation and not a final diagnosis. Please consult a gynecologist for professional advice."

        return jsonify({
            "risk_level": risk_level,
            "description": f"{description}"
        })

    except Exception as e:
        print("Error during prediction:", e)
        return jsonify({"error": "Prediction failed"}), 500


# -------------------- Run App --------------------
if __name__ == "__main__":
    app.run(debug=True)
