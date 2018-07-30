export const config = {
    production: false,

    region: 'ap-southeast-1',

    identityPoolId: 'ap-southeast-1:7412f688-64be-4720-9c8a-425cabebcd34',
    userPoolId: 'ap-southeast-1_SXWEJNERn',
    clientId: '68ue091vkdvk390grvlnll4l88',

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
