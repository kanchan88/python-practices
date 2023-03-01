#Polynomial Regression
#Polynomial Regression is another form of Linear Regression which can handle non-linear relationship between datas.

#Importing Libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

#Importing Dataset
dataset = pd.read_csv('Position_Salaries.csv')
X = dataset.iloc[:, 1].values
y = dataset.iloc[:, -1].values

#Plot Level vs Salary
plt.scatter(X, y, color = 'red')

#Creating Polynomial Model
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
poly_reg = PolynomialFeatures(degree = 4)
X_poly = poly_reg.fit_transform(X)
lin_reg = LinearRegression()
lin_reg.fit(X_poly, y)

#plotting the data with Polynomial Model
plt.scatter(X, y, color = 'red')
plt.plot(X, lin_reg.predict(X_poly), color = 'blue')
plt.title('Polynomial Regression')
plt.xlabel('Position level')
plt.ylabel('Salary')
plt.show()


#WORK SOLUTION
#COMPARING LINEAR vs POLYNOMIAL MODEL
from sklearn.linear_model import LinearRegression
lin_reg2 = LinearRegression()
lin_reg2.fit(X, y)


#using regression model
lin_reg2.predict([[7]])

#using polynomial model
lin_reg.predict(poly_reg.fit_transform([[7]]))