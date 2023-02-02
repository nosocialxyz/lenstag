# lenstag
Use AI to find people you are interested in

Until the @apollo-client fixes the ESM modules support (https://github.com/apollographql/apollo-feature-requests/issues/287)


hacked 
..\node_modules\@lens-protocol\api-bindings\dist\index.js 

line 325 change @apollo/client/link/context to @apollo/client/link/context/index.js
line 326 @apollo/client/link/error to @apollo/client/link/error/index.js
and

..\node_modules\@lens-protocol\react\dist\index.js 
line 4785 change profile.followPolicy?.type === FollowPolicyType3.UNKNOWN to profile.followPolicy?.type !== FollowPolicyType3.UNKNOWN,


