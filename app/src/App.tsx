import React, { useState, useEffect } from 'react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
// import { createRoot } from 'react-dom/client';
import 'graphiql/graphiql.css';import './App.css';

import { introspectionQuery } from './introspection';
import { post } from './chat';

const sampleQuery = `
query AllPosts {
  listPosts {
    success
    errors
    posts {
      id
      title 
      description
      created_at
    }
  }
}
`;

async function postData(url = "graphql", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


const App = () => {
  const fetcher = createGraphiQLFetcher({ url: '/graphql' });
  const [query, setQuery] = useState('');
  const [introspectionResult, setIntrospectionResult] = useState('');
  const [response, setResponse] = useState('');


  const handleChange = (event: any) => {
    setQuery(event.target.value);
  }

  const getQuery = async () => {
    // todo: send query to server
    await post(query, introspectionResult).then((response) => {
      if (response) {
        setResponse(response);
      }
    });
  }

  useEffect(() => {
    postData('/graphql', { query: introspectionQuery })
      .then(data => {
        console.log(data); // JSON data parsed by `response.json()` call
        setIntrospectionResult(JSON.stringify(data));
      });
  }, [setIntrospectionResult]);

  return (
    <div className="App">
      <header style={{marginLeft:'10px'}}>
        <h1>Graph Explorer</h1>
      </header>

      <div style={{height:'600px'}}>
        <GraphiQL fetcher={fetcher} defaultQuery={sampleQuery}/>
      </div>

      <div style={{display:'flex', flexDirection:'column', width: '50%', marginLeft: '10px'}}>
        <div>
          <h5>Write a query here:</h5>
          <p>e.g.: "can you write me a query to get all posts", "can you write me a query to get a post"</p>
        </div>
        <input type="text" value={query} onChange={handleChange} style={{marginBottom: '5px'}}/>
        <button type="button" onClick={getQuery}>
          Submit
        </button>
      </div>

      {response && (<div style={{marginLeft: '10px', width: '50%', }}>{response}</div>)}
    </div>
  );
}

export default App;
