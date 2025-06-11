import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.tree import DecisionTreeRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVR
from sklearn.ensemble import RandomForestRegressor

class ModelEval:
    def __init__(self):
        pass
    
    def linear_model(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
        lin_reg = LinearRegression()
        lin_reg.fit(X_train, y_train)
        y_pred = lin_reg.predict(X_test)
        return r2_score(y_test, y_pred)


    def poly_model(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
        poly_reg = PolynomialFeatures(degree = 4)
        X_poly = poly_reg.fit_transform(X_train)
        regressor = LinearRegression()
        regressor.fit(X_poly, y_train)
        y_pred = regressor.predict(poly_reg.transform(X_test))
        return r2_score(y_test, y_pred)

    def dec_model(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
        regressor = DecisionTreeRegressor(random_state = 0)
        regressor.fit(X_train, y_train)
        y_pred = regressor.predict(X_test)
        return r2_score(y_test, y_pred)

    def svg_model(self, X, y):
        y = y.reshape(len(y),1)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
        sc_X = StandardScaler()
        sc_y = StandardScaler()
        X_train = sc_X.fit_transform(X_train)
        y_train = sc_y.fit_transform(y_train)
        regressor = SVR(kernel = 'rbf')
        regressor.fit(X_train, y_train)
        y_pred = sc_y.inverse_transform(regressor.predict(sc_X.transform(X_test)).reshape(-1,1))
        return r2_score(y_test, y_pred)

    def rfr_model(self, X, y, predict_val=[]):
        regressor = RandomForestRegressor(n_estimators = 10, random_state = 0)
        if len(predict_val) != 4:
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
            regressor.fit(X_train, y_train)
            y_pred = regressor.predict(X_test)
            return r2_score(y_test, y_pred)
        else:
            regressor.fit(X, y)
            return regressor.predict([np.array(predict_val)])