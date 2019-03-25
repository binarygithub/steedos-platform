var steedos = require("@steedos/core")
var _ = require('underscore');
const graphqlHTTP = require('express-graphql');

let steedosSchema = new steedos.SteedosSchema({
    objects: {},
    datasource: {
        driver: 'mongo',
        url: 'mongodb://127.0.0.1/steedos'
    }
})

steedosSchema.use(__dirname + "/../standard-objects");
steedosSchema.use(__dirname + "/../../apps/crm/src");

steedosSchema.connect().then(function(){

    // 生成graphql schema
    let graphqlSchema = steedos.buildGraphQLSchema(steedosSchema)

    let express = require('express');
    let app = express();
    app.use('/graphql', graphqlHTTP({
        schema: graphqlSchema,
        graphiql: true
    }));
    app.listen(3001)

});