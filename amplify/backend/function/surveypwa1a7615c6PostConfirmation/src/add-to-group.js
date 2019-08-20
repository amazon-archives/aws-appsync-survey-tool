/* eslint-disable-line */ const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

  const listGroupsParams = {
    UserPoolId: event.userPoolId
  }

  var adminUser = false

  await cognitoidentityserviceprovider.listGroups(listGroupsParams, async (err, data) => {
    if (err) console.log(err, err.stack);
    else{
      console.log("Number of Groups in Pool: " + data.Groups.length);
      if(data.Groups.length === 0) {
        // This is the first time a user has registered, so create groups and set user as Admin
        adminUser = true
        const adminGroupParams = {
          GroupName: "SurveyAdmins",
          UserPoolId: event.userPoolId,
        };
        const usersGroupParams = {
          GroupName: "Users",
          UserPoolId: event.userPoolId,
        };
        await cognitoidentityserviceprovider.createGroup(adminGroupParams).promise();
        await cognitoidentityserviceprovider.createGroup(usersGroupParams).promise();
      }
    }
  }).promise();

  

  const addUserParams = {
    GroupName: adminUser ? "SurveyAdmins" : "Users",
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams, (err) => {
    if (err) {
      callback(err);
    }
    callback(null, event);
  });
};
