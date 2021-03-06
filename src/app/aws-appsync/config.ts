export const config = {
    production: false,

    region: 'ap-southeast-1',

    identityPoolId: 'ap-southeast-1:7412f688-64be-4720-9c8a-425cabebcd34',
    userPoolId: 'ap-southeast-1_nalGKU2AH',
    clientId: '4fgbsl9lbstcbq55tcqvg5395o',

    rekognitionBucket: 'rekognition-pics',
    albumName: "usercontent",
    bucketRegion: 'ap-southeast-1',

    ddbTableName: 'LoginTrail',

    cognito_idp_endpoint: '',
    cognito_identity_endpoint: 'apigateway.ap-southeast-1.amazonaws.com',
    sts_endpoint: '',
    dynamodb_endpoint: '',
    s3_endpoint: ''

};
