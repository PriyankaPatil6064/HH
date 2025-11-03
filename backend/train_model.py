import pandas as pd
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE
import joblib
import warnings
warnings.filterwarnings("ignore")

# 1️⃣ Load dataset
df = pd.read_csv(r"C:\Users\HP\Desktop\HH\backend\data\dataset.csv")
df.columns = df.columns.str.strip()  # remove spaces

# 2️⃣ Features & target
features = ['Age','Weight','Height','BMI','Cycle','Hip','Waist','Waist:HipRatio',
            'WeightGain','HairGrowth','SkinDarkening','HairLoss','Acne']
X = df[features]
y = df['PCOS_Y/N']

# 3️⃣ Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 4️⃣ Handle class imbalance using SMOTE
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

print("Original class distribution:\n", y_train.value_counts())
print("After SMOTE:\n", pd.Series(y_train_res).value_counts())

# 5️⃣ Random Forest + RandomizedSearchCV
rf = RandomForestClassifier(random_state=42)

param_dist = {
    'n_estimators': [100, 200, 300, 400],
    'max_depth': [None, 5, 10, 20],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

random_search = RandomizedSearchCV(
    estimator=rf,
    param_distributions=param_dist,
    n_iter=20,          # number of combinations to try
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    random_state=42,
    verbose=2
)

random_search.fit(X_train_res, y_train_res)
best_model = random_search.best_estimator_

# 6️⃣ Predictions & evaluation
y_pred = best_model.predict(X_test)

print("\nBest Parameters:", random_search.best_params_)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))

# 7️⃣ Save model
joblib.dump(best_model, "pcos_model.pkl")
print("\n✅ Model saved as pcos_model.pkl")
