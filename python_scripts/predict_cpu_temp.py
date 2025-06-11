from models_eval import ModelEval
import pandas as pd

if __name__ == "__main__":
    dataset = pd.read_csv('cpu_data.csv')
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values

    model_eval = ModelEval()
    scores_total = [model_eval.linear_model(X, y), model_eval.poly_model(X, y),
                    model_eval.dec_model(X, y), model_eval.svg_model(X, y), model_eval.rfr_model(X, y)]
    print(scores_total)
    # best_model = scores_total.index(max(scores_total))
    # if best_model == 4:
    #     print(model_eval.rfr_model(X, y, []))