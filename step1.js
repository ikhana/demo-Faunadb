#!/usr/bin/env node

/*
  Create .env file at project root with the following:
  FAUNADB_ADMIN_SECRET=my-admin-secret
*/

//https://docs.fauna.com/fauna/current/tutorials/crud#database

const faunadb = require('faunadb'),
 q = faunadb.query;
require('dotenv').config();


(async () =>{

   
    //console.log("Faunadb Admin Secret: " + process.env.FAUNADB_ADMIN_SECRET);

    var client = new faunadb.Client({ secret: "fnAD9bSezoACBdQ0wrPtNX2f-PgTfQ4jZ-O69ZAH "});
    
    //create database
    /*try {
      var result = await client.query(
        q.CreateDatabase({ name: 'mytestdatabase' })
      );
      console.log(result);
    }*/ 
    /*try {
      var result = await client.query(
        q.CreateCollection({ name: 'posts' })
      );
      console.log(result);
    }*/
    /*
    try {
      var result = await client.query(
        q.CreateIndex({
            name: 'posts_by_title',
            source: q.Collection('posts'),
            terms: [{ field: ['data', 'title'] }],
          })
      );
      console.log("Index Created: " + result.name);
    } */
   /* try {
      var result = await client.query(
        q.Create(
          q.Collection('posts'),
          { data: { title: 'Inaam is learning Serverless applications which are scalable' } },
        )
      );
      console.log("Document Created and Inserted in Container: " + result.ref.id);
    } 
    You can explore the update , replace and delete collection also by ctrl+tab in client query function 
    */
    try {
      var result = await client.query(
        q.Map(
          [
            'Gatsby.js generates static and dynamic websites',
            'FaunaDB is consistent',
            'Netlify deploys static assets on the Edge',
          ],
          q.Lambda(
            'post_title',
            q.Create(
              q.Collection('posts'),
              { data: { title: q.Var('post_title') } },
            )
          ),
        )
      );
      console.log("Number of Documents Created and Inserted in the Container: " + result.length);
      result.map((r) => {
        console.log(r.ref.id);
      })
    } 

    catch (error){
      if (error.requestResult.statusCode === 400 && error.message === 'instance already exists') {
        console.log('Database with this name already exists');
      }
      else {
        console.log('Unknow Error: ');
        console.log(error);
      }
      
    

 
  

  }})();
