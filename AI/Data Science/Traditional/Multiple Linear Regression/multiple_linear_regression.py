## Multiple Linear Regression
## Importing the Libraries
import numpy as np
import pandas as pd
import seaborn as sb
import matplotlib.pyplot as plt

## Importing the Dataset
dataset = pd.read_csv('50_Startups.csv')

## Visualizing data
cols = dataset.columns
sb.pairplot(dataset[cols], size=2.5)
plt.tight_layout()
plt.show()


## Creating Correlation Matrix
colm= dataset.iloc[:,[0,1,2,4]]
cm = np.corrcoef(colm.values.T)
sb.set(font_scale=2.5)
hm = sb.heatmap(cm)
plt.show()

## Dataset to Independent(X) and Dependent Variables(Y)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

## Handling Categorical Data
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [3])], remainder='passthrough')
X = np.array(ct.fit_transform(X))

## Spitting Dataset into Train Test
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)


## Creating and Training Regression Model
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train)
LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None, normalize=False)


## Making the Predictions
y_pred = regressor.predict(X_test)
print(y_pred)
print(y_test)

#check the results of y_pred and y_test for how accurate your model is