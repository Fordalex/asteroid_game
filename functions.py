def return_highest_score_dict(highScore):
    high_score_dict = {}
    high_score_dict.update({'score': str(highScore['score'])})
    high_score_dict.update({'name': str(highScore['name'])})

    return dict(high_score_dict)