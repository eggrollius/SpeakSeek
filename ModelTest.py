import joblib
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer

# Define the directory where your models are saved
directory = '/model/'

# Load the model and other necessary components
model = joblib.load(os.path.join(directory, 'multinomial_nb_model.pkl'))
le = joblib.load(os.path.join(directory, 'label_encoder.pkl'))
count_vectorizer = joblib.load(os.path.join(directory, 'count_vectorizer.pkl'))

def predict_language(text):
    x = count_vectorizer.transform([text]).toarray()
    language = model.predict(x)
    language = le.inverse_transform(language)
    print(language[0])

predict_language("Hello, how are you?")
predict_language("Bonjour mon ami")
predict_language("donda est la bibliotecha")

