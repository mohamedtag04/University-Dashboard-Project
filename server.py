from flask import Flask, jsonify, render_template
import sqlite3
import pandas as pd


df = pd.read_csv("courses_dataset.csv")
df2 = pd.read_csv("instructors_dataset.csv")
df3 = pd.read_csv("courses_dataset.csv")
df4 = pd.read_csv("student_data.csv")
app = Flask(__name__)

@app.route('/')
def index():
    average_gpa_csai = round(df4["Current_CGPA"].mean(), 2)
    num_of_instructors_csai = len(df2)
    num_of_students_csai = len(df4)
    num_of_courses_csai = len(df3)
    num_dsai = len(df4[df4['Major'] == 'DSAI'])
    num_swd = len(df4[df4['Major'] == 'SWD'])
    num_it = len(df4[df4['Major'] == 'IT'])
    avg_student_survery_csai = round(df4["Survey_Average"].mean())
    return render_template('index.html',avg_student_survery_csai = avg_student_survery_csai,num_of_courses_csai = num_of_courses_csai, average_gpa_csai=average_gpa_csai, num_of_instructors_csai=num_of_instructors_csai, num_of_students_csai=num_of_students_csai, num_dsai=num_dsai, num_swd=num_swd, num_it=num_it)

@app.route('/get-datachart')
def get_datachart():
    # classes = df["Ship Mode"].value_counts().index
    # values = df["Ship Mode"].value_counts().values
    data = []
    for i in range(len(df)):
        if df["Course_ID"][i][:4] == 'CSAI':
            data.append({"class":df["Course_ID"][i],"value":int(df['Average_Grade'][i])})
    return jsonify(data)

@app.route('/get-data-tree-instructors')
def create_tree():
    data = {
        'name': 'CSAI',
        'children': []
    }

    majors = {}
    for index, row in df2.iterrows():
        major = row['major']
        if major not in majors:
            majors[major] = {
                'name': major,
                'children': []
            }
            data['children'].append(majors[major])

        if row['isDirector'] == 1:
            majors[major]['children'].append({
                'name': row['instructor'],
                'children': [
                    {'name': 'TAs', 'children': []},
                    {'name': 'Instructors', 'children': []}
                ]
            })
        else:
            job = 'TAs' if row['job'] == 2 else 'Instructors'
            for director in majors[major]['children']:
                if job in [child['name'] for child in director['children']]:
                    index = next((index for (index, d) in enumerate(director['children']) if d["name"] == job), None)
                    director['children'][index]['children'].append({'name': row['instructor'], 'value': 3})
    return jsonify(data)

@app.route('/get-data-pass-fail-csai')
def process_courses():
    courses = []
    for _, row in df3.iterrows():
        if row["Course_ID"][:4] == "CSAI":
            course = {
                "course": row["Course_ID"],
                "passed": row["Pass_Count"],
                "failed": row["Fail_Count"]
            }
            courses.append(course)

    return jsonify(courses)

@app.route('/get-gpa-dist')
def process_gpa_dist():
    df4['Current_CGPA'] = df4['Current_CGPA'].round(1)  # Round CGPA to nearest integer
    df4['Semester_1_GPA'] = df4['Semester_1_GPA'].round(1)
    gpa_counts = df4['Current_CGPA'].value_counts().reset_index()  # Get counts of each GPA
    gpa_counts.columns = ['gpa', 'count']
    gpa_list = gpa_counts.to_dict('records')
    #calculate teh sam or count and print it
    gpa_counts = gpa_counts.sort_values('gpa')

    return jsonify(gpa_list)

@app.route('/get-majors-dist')
def process_majors_dist():
    majors = df4['Major'].value_counts().index
    counts = df4['Major'].value_counts().values
    data = []
    for i in range(len(majors)):
        data.append({"major":majors[i],"count":int(counts[i])})
    return jsonify(data)

@app.route('/get-students-state')
def process_students_state():
    majors = df4['Major'].unique()
    data = []

    for major in majors:
        major_df = df4[df4['Major'] == major]
        safe = len(major_df[major_df['Current_CGPA'] > 2.2])
        at_risk = len(major_df[(major_df['Current_CGPA'] >= 2) & (major_df['Current_CGPA'] <= 2.2)])
        probation = len(major_df[major_df['Current_CGPA'] < 2])
        data.append({"major": major, 'Safe': safe, 'At risk': at_risk, 'Probation': probation})
    return jsonify(data)

#Survery_Average for each major
@app.route('/get-survery-average')
def process_survery_average():
    majors = df4['Major'].unique()
    data = []

    for major in majors:
        major_df = df4[df4['Major'] == major]
        avg = round(major_df['Survey_Average'].mean(),2)
        data.append({"major": major, 'average': avg})
    return jsonify(data)

@app.route('/get-correlation-sectors')
def process_correlation_sectors():
    data = []
    for i in range (len(df4)):
        high_grade = df4["Highschool_Grade"][i]
        gpa = df4['Current_CGPA'][i]
        sector = df4["Highschool_Sector"][i]
        if sector == "Maths" :
            color = "#Ff0000"
        else:
            color = "#00ff00"
        data .append({"y": high_grade, 'x': gpa, 'sector': sector, 'color': color, "value": 100})
    return jsonify(data)
@app.route('/get-genders')
def process_genders():
    data = []
    genders = df4['Gender'].value_counts().index
    values = df4['Gender'].value_counts().values
    for i in range(len(genders)):
        data.append({"gender": genders[i], "value" : int(values[i])})
    return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True)


