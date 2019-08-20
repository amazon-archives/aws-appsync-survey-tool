// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateSurvey = `subscription OnCreateSurvey {
  onCreateSurvey {
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
export const onUpdateSurvey = `subscription OnUpdateSurvey {
  onUpdateSurvey {
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
export const onDeleteSurvey = `subscription OnDeleteSurvey {
  onDeleteSurvey {
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
export const onCreateQuestionnaire = `subscription OnCreateQuestionnaire {
  onCreateQuestionnaire {
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
export const onUpdateQuestionnaire = `subscription OnUpdateQuestionnaire {
  onUpdateQuestionnaire {
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
export const onDeleteQuestionnaire = `subscription OnDeleteQuestionnaire {
  onDeleteQuestionnaire {
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
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
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
export const onCreateResponses = `subscription OnCreateResponses {
  onCreateResponses {
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
export const onUpdateResponses = `subscription OnUpdateResponses {
  onUpdateResponses {
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
export const onDeleteResponses = `subscription OnDeleteResponses {
  onDeleteResponses {
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
export const onCreateSurveyEntries = `subscription OnCreateSurveyEntries {
  onCreateSurveyEntries {
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
export const onUpdateSurveyEntries = `subscription OnUpdateSurveyEntries {
  onUpdateSurveyEntries {
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
export const onDeleteSurveyEntries = `subscription OnDeleteSurveyEntries {
  onDeleteSurveyEntries {
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
