export const bulkImportSurvey = `mutation bulkImportSurvey($surveyID: ID, $surveyPreQuestionnaireId: ID, $surveyMainQuestionnaireId: ID) {
    questionnaire1: createQuestionnaire(input: {
        id: $surveyPreQuestionnaireId
        name: "Simpsons Pre Questionnaire"
        description: "Pre questionnaire that must be completed prior to commencing survey."
        type: PRE
    })
    {
        id
        name
    }
    question1: createQuestion(input: {
        qu: "How strongly do you agree or disagree that the Simpsons was the best TV series ever?"
        type: LIST
        listOptions: [
                "Strongly Agree",
                "Somewhat Agree",
                "Neither agree nor disagree",
                "Somewhat Disagree",
                "Strongly Disagree",
                "Don't Know"
            ]
        order: 0
        questionQuestionnaireId: $surveyPreQuestionnaireId
    })
    {
        id
        qu
    }
    question2: createQuestion(input: {
        qu: "How often do you wish you were able to watch a Simpsons episode right there and then?"
      type: LIST
      listOptions: [
            "Always",
            "Often",
            "Sometimes",
            "Rarely",
            "Never"
        ]
      order: 1
      questionQuestionnaireId: $surveyPreQuestionnaireId
    })
    {
        id
        qu
    }
    question3: createQuestion(input: {
        qu: "What was the name of the racehorse Bett Midler and Krusty the Cloud co-owned?"
      type: TEXT
      order: 2
      questionQuestionnaireId: $surveyPreQuestionnaireId
    })
    {
        id
        qu
    }
    questionnaire2: createQuestionnaire(input: {
        id: $surveyMainQuestionnaireId
        name: "Simpsons Main Survey"
        description: "Main Survey questions."
        type: MAIN
    })
    {
        id
        name
    }
    question4: createQuestion(input: {
        qu: "Activity Start Time"
        type: DATETIME
        order: 1
        questionQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        qu
    }
    question5: createQuestion(input: {
        qu: "Activity Finish Time"
        type: DATETIME
        order: 2
        questionQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        qu
    }
    question6: createQuestion(input: {
        qu: "Where were you?"
        type: TEXT
        order: 3
        questionQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        qu
    }
    question7: createQuestion(input: {
        qu: "What episode did you watch?"
        type: TEXT
        order: 4
        questionQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        qu
    }
    createSurvey(input: {
        id: $surveyID
        name: "The Simpsons Survey"
        description: "This survey tests you on your knowledge of The Simpsons, and you are requested to add entries for each time you watched an episode of the Simpsons during the survey period."
        image: "https://m.media-amazon.com/images/M/MV5BYjc2MzcwMjctNjI2NC00MGQ1LWEwYmEtYWUyN2M2NjZjN2Q4XkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg"
        archived: false
        groups: ["Simpsons"]
        surveyPreQuestionnaireId: $surveyPreQuestionnaireId
        surveyMainQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        name
    }
}
`;