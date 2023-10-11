from flask import Flask, request, jsonify, render_template


import joblib
import pandas as pd
import os
from sklearn.feature_extraction.text import CountVectorizer
# Define the directory where your models are saved
directory = 'model'

# Load the model and other necessary components
model = joblib.load(os.path.join(directory, 'multinomial_nb_model.pkl'))
le = joblib.load(os.path.join(directory, 'label_encoder.pkl'))
count_vectorizer = joblib.load(os.path.join(directory, 'count_vectorizer.pkl'))

def predict_language(text):
    x = count_vectorizer.transform([text]).toarray()
    language = model.predict(x)
    language = le.inverse_transform(language)
    return language[0]

#Web App begins
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    text = request.form['text']
    x = count_vectorizer.transform([text]).toarray()
    language = model.predict(x)
    language = le.inverse_transform(language)
    return render_template('index.html', prediction=language[0])

if __name__ == '__main__':
    app.run(debug=True)