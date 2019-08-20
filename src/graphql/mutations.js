// eslint-disable
// this is an auto generated file. This will be overwritten

export const deleteUser = `mutation DeleteUser($UserPoolId: String, $Username: String) {
  deleteUser(UserPoolId: $UserPoolId, Username: $Username)
}
`;
export const addUserToGroup = `mutation AddUserToGroup(
  $UserPoolId: String
  $Username: String
  $GroupName: String
) {
  addUserToGroup(
    UserPoolId: $UserPoolId
    Username: $Username
    GroupName: $GroupName
  )
}
`;
export const addGroup = `mutation AddGroup($UserPoolId: String, $GroupName: String) {
  addGroup(UserPoolId: $UserPoolId, GroupName: $GroupName)
}
`;
export const deleteGroup = `mutation DeleteGroup($UserPoolId: String, $GroupName: String) {
  deleteGroup(UserPoolId: $UserPoolId, GroupName: $GroupName)
}
`;
export const createSurvey = `mutation CreateSurvey($input: CreateSurveyInput!) {
  createSurvey(input: $input) {
    id
    name
    description
    image
    preQuestionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    mainQuestionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    postQuestionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    archived
    groups
  }
}
`;
export const updateSurvey = `mutation UpdateSurvey($input: UpdateSurveyInput!) {
  updateSurvey(input: $input) {
    id
    name
    description
    image
    preQuestionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    mainQuestionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    postQuestionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    archived
    groups
  }
}
`;
export const deleteSurvey = `mutation DeleteSurvey($input: DeleteSurveyInput!) {
  deleteSurvey(input: $input) {
    id
    name
    description
    image
    preQuestionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    mainQuestionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    postQuestionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    archived
    groups
  }
}
`;
export const createQuestionnaire = `mutation CreateQuestionnaire($input: CreateQuestionnaireInput!) {
  createQuestionnaire(input: $input) {
    id
    name
    description
    type
    question {
      items {
        id
        qu
        type
        listOptions
        order
      }
      nextToken
    }
  }
}
`;
export const updateQuestionnaire = `mutation UpdateQuestionnaire($input: UpdateQuestionnaireInput!) {
  updateQuestionnaire(input: $input) {
    id
    name
    description
    type
    question {
      items {
        id
        qu
        type
        listOptions
        order
      }
      nextToken
    }
  }
}
`;
export const deleteQuestionnaire = `mutation DeleteQuestionnaire($input: DeleteQuestionnaireInput!) {
  deleteQuestionnaire(input: $input) {
    id
    name
    description
    type
    question {
      items {
        id
        qu
        type
        listOptions
        order
      }
      nextToken
    }
  }
}
`;
export const createQuestion = `mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    qu
    type
    listOptions
    questionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    order
  }
}
`;
export const updateQuestion = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
    id
    qu
    type
    listOptions
    questionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    order
  }
}
`;
export const deleteQuestion = `mutation DeleteQuestion($input: DeleteQuestionInput!) {
  deleteQuestion(input: $input) {
    id
    qu
    type
    listOptions
    questionnaire {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    order
  }
}
`;
export const createResponses = `mutation CreateResponses($input: CreateResponsesInput!) {
  createResponses(input: $input) {
    id
    qu {
      id
      qu
      type
      listOptions
      questionnaire {
        id
        name
        description
        type
      }
      order
    }
    res
    group {
      id
      responses {
        nextToken
      }
    }
  }
}
`;
export const updateResponses = `mutation UpdateResponses($input: UpdateResponsesInput!) {
  updateResponses(input: $input) {
    id
    qu {
      id
      qu
      type
      listOptions
      questionnaire {
        id
        name
        description
        type
      }
      order
    }
    res
    group {
      id
      responses {
        nextToken
      }
    }
  }
}
`;
export const deleteResponses = `mutation DeleteResponses($input: DeleteResponsesInput!) {
  deleteResponses(input: $input) {
    id
    qu {
      id
      qu
      type
      listOptions
      questionnaire {
        id
        name
        description
        type
      }
      order
    }
    res
    group {
      id
      responses {
        nextToken
      }
    }
  }
}
`;
export const createSurveyEntries = `mutation CreateSurveyEntries($input: CreateSurveyEntriesInput!) {
  createSurveyEntries(input: $input) {
    id
    responses {
      items {
        id
        res
      }
      nextToken
    }
  }
}
`;
export const updateSurveyEntries = `mutation UpdateSurveyEntries($input: UpdateSurveyEntriesInput!) {
  updateSurveyEntries(input: $input) {
    id
    responses {
      items {
        id
        res
      }
      nextToken
    }
  }
}
`;
export const deleteSurveyEntries = `mutation DeleteSurveyEntries($input: DeleteSurveyEntriesInput!) {
  deleteSurveyEntries(input: $input) {
    id
    responses {
      items {
        id
        res
      }
      nextToken
    }
  }
}
`;
