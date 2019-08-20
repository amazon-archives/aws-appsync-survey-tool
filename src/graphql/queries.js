// eslint-disable
// this is an auto generated file. This will be overwritten

export const listUsers = `query ListUsers($UserPoolId: String) {
  listUsers(UserPoolId: $UserPoolId)
}
`;
export const listGroups = `query ListGroups($UserPoolId: String) {
  listGroups(UserPoolId: $UserPoolId)
}
`;
export const listGroupMembers = `query ListGroupMembers($UserPoolId: String, $GroupName: String) {
  listGroupMembers(UserPoolId: $UserPoolId, GroupName: $GroupName)
}
`;
export const getSurvey = `query GetSurvey($id: ID!) {
  getSurvey(id: $id) {
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
export const listSurveys = `query ListSurveys(
  $filter: ModelSurveyFilterInput
  $limit: Int
  $nextToken: String
) {
  listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      image
      preQuestionnaire {
        id
        name
        description
        type
      }
      mainQuestionnaire {
        id
        name
        description
        type
      }
      postQuestionnaire {
        id
        name
        description
        type
      }
      archived
      groups
    }
    nextToken
  }
}
`;
export const getQuestionnaire = `query GetQuestionnaire($id: ID!) {
  getQuestionnaire(id: $id) {
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
export const listQuestionnaires = `query ListQuestionnaires(
  $filter: ModelQuestionnaireFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestionnaires(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      type
      question {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getQuestion = `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
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
export const listQuestions = `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getResponses = `query GetResponses($id: ID!) {
  getResponses(id: $id) {
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
export const listResponsess = `query ListResponsess(
  $filter: ModelResponsesFilterInput
  $limit: Int
  $nextToken: String
) {
  listResponsess(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      qu {
        id
        qu
        type
        listOptions
        order
      }
      res
      group {
        id
      }
    }
    nextToken
  }
}
`;
export const getSurveyEntries = `query GetSurveyEntries($id: ID!) {
  getSurveyEntries(id: $id) {
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
export const listSurveyEntriess = `query ListSurveyEntriess(
  $filter: ModelSurveyEntriesFilterInput
  $limit: Int
  $nextToken: String
) {
  listSurveyEntriess(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      responses {
        items{
          id
          qu{
            id
            qu
          }
          res
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
