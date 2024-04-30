from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# 데이터 로드
pill_data = pd.read_csv('Final_Pill_Standardization_Content_Dataset.csv', header=0, encoding='cp949') #영양제 영양소 함량 데이터셋
food_data = pd.read_csv('food_dataset.csv', encoding='cp949') #평균 섭취량을 구하기 위한 음식 데이터셋
Final_Pill_Dataset = pd.read_csv('Final_Pill_Dataset.csv',header=0, encoding='cp949')
Final_Pill_Dataset_KIDS = pd.read_csv('Final_Pill_Dataset+KIDS.csv',header=0, encoding='cp949')

child_pill_index = [2,33,40,50,63,69,85,87,89,106,129,142,143,148,161,164,
                    166,168,182,188,191,200,210,225,232,235,237,238,245,246,
                    258,265,266,269,271,274,296,304,308,315,343,348,350,353,
                    376,383,386,394,395,397,413,423,424,428,430,435,440,455,
                    457,484,488,493,502,536,539,544,545,594,604,614,617,621,
                    624,639,647,648,649,665,678,679,684,701,712,725,731,747,
                    749,750,791,804,811,821,849,850,851,868,879,888,897,901,
                    912,921,933,937,946,962,974,999,1026,1030,1039,1040,1044,
                    1061,1079,1086,1095,1106,1107,1113,1118,1122,1126,1140,
                    1144,1147,1173,1174,1176,1192,1193,1195,1204,1212,1237,
                    1240,1242,1245,1251,1258,1260,1266,1278,1281,1286]

# 제외할 영양제 인덱스
except_list_index = [6,15,35,41,67,77,79,80,89,90,109,115,121,126,142,164,
                    202,213,237,255,259,276,277,278,285,290,298,319,324,
                    333,336,337,339,341,342,345,346,349,355,366,391,403,
                    411,421,443,448,475,484,491,497,536,600,608,627,629,
                    632,634,636,644,647,648,649,651,655,656,660,668,689,
                    690,701,723,728,745,746,747,753,755,756,760,782,789,
                    792,828,841,852,857,862,868,869,874,879,885,886,904,
                    916,935,946,968,974,1044,1061,1072,1073,1106,1109,1113,
                    1114,1115,1134,1147,1148,1153,1164,1169,1186,1188,1209,
                    1226,1230,1231,1240,1254,1263,1264,1266,1271,1286,1291]

# 임의로 정한 권장 섭취량 정보
recommended_intake = {
    '에너지(Kcal)': 300.0, 
    '탄수화물(g)': 80, 
    '단백질(g)': 5, 
    '지방(g)': 1.0, 
    '콜레스트롤(g)': 0.0, 
    '식이섬유(g)': 0.0, 
    '나트륨(mg)': 230.0,
}

# BMI 계산 함수
def bmicalc(x):
    if x < 18.5:
        y = "저체중"
    elif 18.5 <= x < 23:
        y = "정상 체중"
    elif 23 <= x < 25:
        y = "과체중"
    elif 25 <= x < 30:
        y = "경도 비만"
    else:
        y = "고도 비만"
        
    return y

# 평균 섭취량을 계산하는 함수
def calculate_average_intake(daily_intakes):
    total_intake = {nutrient: 0.0 for nutrient in recommended_intake}
    for daily_intake in daily_intakes:
        for nutrient, value in daily_intake.items():
            if nutrient in recommended_intake:
                total_intake[nutrient] += value
    average_intake = {nutrient: round(total / len(daily_intakes), 1) for nutrient, total in total_intake.items()}
    return average_intake

# 식단 정보를 기반으로 영양소 정보를 가져오는 함수
def get_nutrient_info(food_name):
    nutrient_info = food_data[food_data['음식명'] == food_name].iloc[:, 1:].fillna(0).squeeze()
    return nutrient_info.to_dict() if not nutrient_info.empty else {}

# 부족한 영양소를 찾는 함수
def find_deficient_nutrients(diet, recommended_intake):
   
    deficient_nutrients = {}
    for nutrient, intake in recommended_intake.items():
        if nutrient in diet:
            diff = intake - diet[nutrient]
            if diff > 0:
                deficient_nutrients[nutrient] = diff
    return deficient_nutrients
def recommend_pill(diet, recommended_intake, age):
    difference = {}
    for nutrient, intake in recommended_intake.items():
        difference[nutrient] = diet.get(nutrient, 0) - intake
    
    pill_distance_list = []
    for i in range(len(pill_data)):
        pill_distance_list.append(distance(pill_data.iloc[i], difference))
    
    # 거리를 기준으로 정렬된 영양제 데이터
    sorted_pill_distance_list = sorted(enumerate(pill_distance_list), key=lambda x: x[1])
    
    recommendation = {}  # 추천 영양제 정보를 저장할 딕셔너리
    
    total_list = []
    # 성인의 경우
    if age > 20:
        for idx, distance_val in sorted_pill_distance_list:
            # 영양제 인덱스 가져오기
            pill_index = pill_data.iloc[idx].name
            if pill_index not in child_pill_index and pill_index not in except_list_index:
                total_list.append(pill_index)
                recommendation[pill_index] = {
                    '영양제명': Final_Pill_Dataset.loc[idx, '영양제명'],
                    '거리': pill_distance_list[idx]
                }
            if len(total_list) == 3:
                break
    # 어린이의 경우
    else:
        for idx, distance_val in sorted_pill_distance_list:
            pill_index = pill_data.iloc[idx].name
            if pill_index in child_pill_index and pill_index not in except_list_index:
                total_list.append(pill_index)
                recommendation[pill_index] = {
                    '영양제명': Final_Pill_Dataset_KIDS.loc[idx, '영양제명'],
                    '거리': pill_distance_list[idx]
                }
            if len(total_list) == 3:
                break
    
    return recommendation
# 거리 계산 메소드
def distance(x, y):
    x_values = x.values
    y_values = np.array(list(y.values()) + [0.0] * (len(x_values) - len(y)))
    a = np.linalg.norm(x_values - y_values)
    return a

# BMI 계산 메소드
def calc(vJson):
    height = vJson['height']
    height = int(height) / 100    
    weight = vJson['weight']   
    weight = int(weight)
    age = vJson['age']  
    age = int(age)
    gender = vJson['gender'] # 추가: 성별 정보
    
    # BMI 계산
    BMI = weight / (height * height)
    bmi_string = bmicalc(BMI)
    
    # BMI 정보 추가
    vJson['BMI'] = {
        'value': round(BMI, 2),
        'status': bmi_string
    }
    
    return vJson

# 성별에 따른 나이대 가져오는 함수
def get_age_group(age):
    if age <= 2:
        return '01-02'
    elif age <= 5:
        return '03-05'
    elif age <= 11:
        return '06-11'
    elif age <= 18:
        return '12-18'
    elif age <= 29:
        return '19-29'
    elif age <= 49:
        return '30-49'
    elif age <= 64:
        return '50-64'
    else:
        return '≥ 65'

@app.route('/recommend_pill', methods=['POST'])
def recommend_pill_route():
    data = request.json
    
    # 식단 정보 추출
    food_names = data['food_names']
    age = int(data['age'])  # 문자열을 정수로 변환
    gender = data['gender']
    
    # 신체 정보 추출
    weight = int(data['weight'])
    height = int(data['height'])
    
    # BMI 계산
    BMI = calc_bmi(weight, height)
    
    # 식단 정보를 기반으로 영양소 정보 추출
    daily_intakes = [get_nutrient_info(food_name) for food_name in food_names]
    average_intake = calculate_average_intake(daily_intakes)
    
    # 영양제 추천
    recommendation = recommend_pill(average_intake, recommended_intake, age)
    response = {
        "recommendation": recommendation,
        "BMI": BMI,  # BMI 값을 추가하여 응답에 포함
        "average-intake" : average_intake
    }
    return jsonify(response)
    # 권장 섭취량 확인
    print("Recommended Intake:")
    print(recommended_intake)
    
    # 추천 결과를 JSON 형식으로 반환
 

def calc_bmi(weight, height):
    return weight / ((height / 100) ** 2)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
