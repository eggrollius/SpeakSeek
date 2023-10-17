import pandas as pd

import joblib
import os
from sklearn.feature_extraction.text import CountVectorizer

completed = 0
failed = 0
passed = 0

try:
    # Define the directory where your models are saved
    directory = 'C:\SpeakSeek\model'

    # Load the model and other necessary components
    model = joblib.load(os.path.join(directory, 'multinomial_nb_model.pkl'))
    le = joblib.load(os.path.join(directory, 'label_encoder.pkl'))
    count_vectorizer = joblib.load(os.path.join(directory, 'count_vectorizer.pkl'))

    def predictLanguage(text):
        x = count_vectorizer.transform([text]).toarray()
        language = model.predict(x)
        language = le.inverse_transform(language)
        return language[0]

    #test the data:
    #map the labels in the test data to what the model outputs
    supportedLanguages = {
                        "eng":"English",
                        "fra":"French",
                        "ita":"Italian",
                        "spa":"Spanish",
                        #"ell":"Greek",
                        "por":"Portugeese",
                        #"rus":"Russian",
                        #"dan":"Danish",
                        #"swe":"Sweedish",
                        #"nld":"Dutch",
                        #"deu":"German"
    }

    failedPerLanguage = {
                        "eng":0,
                        "fra":0,
                        "ita":0,
                        "spa":0,
                        "ell":0,
                        "por":0,
                        "rus":0,
                        "dan":0,
                        "swe":0,
                        "nld":0,
                        "deu":0
    }
    df = pd.read_csv("C:\SpeakSeek\data\Validation\WiLi-2018.csv", quotechar='"', encoding='utf-8')

    # Check the data
    df = df.applymap(lambda x: x.strip() if type(x) == str else x)
    print(df.head())

    for index, row in df.iterrows():
        if row['class'] in supportedLanguages.keys():
            modelOutput = predictLanguage(row['text'])
            if modelOutput == supportedLanguages[row['class']]:
                passed += 1
            else:
                failedPerLanguage[row['class']]+=1
                failed += 1
            completed += 1
    print(f"Completed: {completed}\nPassed: {passed}\nFailed:{failed}\nAccuracy:{passed/completed}")
    print(failedPerLanguage)

except Exception as e:
    print(f"An error occurred: {e}")

