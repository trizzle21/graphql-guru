import React, { useState, useEffect } from 'react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
// import { createRoot } from 'react-dom/client';
import 'graphiql/graphiql.css';import './App.css';

import { introspectionQuery } from './introspection';
import { post, introspectGraphql } from './chat';

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

const App = () => {
  const fetcher = createGraphiQLFetcher({ url: '/graphql' });
  const [query, setQuery] = useState('');
  const [introspectionResult, setIntrospectionResult] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  }

  const getQuery = async () => {
    // todo: send query to server
    setIsLoading(true)
    await post(query, introspectionResult).then((response) => {
      if (response) {
        setResponse(response);
      } else {
        setResponse('No response from server');
      }
    });
    setIsLoading(false);

  }

  useEffect(() => {
    introspectGraphql('/graphql', { query: introspectionQuery })
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
        <GraphiQL fetcher={fetcher} defaultQuery={sampleQuery}>
          <GraphiQL.Footer>
            <div style={{display:'flex', flexDirection:'column', width: '100%', marginLeft: '10px'}}>
              <div>
                <h5>Write a query here:</h5>
                <p>e.g.: "can you write me a query to get all posts", "can you write me a query to get a post"</p>
              </div>
              <input type="text" value={query} onChange={handleChange} style={{marginBottom: '5px'}}/>
              <button type="button" onClick={getQuery}>
                Submit
              </button>
            </div>
          </GraphiQL.Footer>
        </GraphiQL>
      </div>

      {isLoading && (<div style={{marginLeft: '10px', width: '50%', }}>Loading...</div>)}
      {response && (<div style={{marginLeft: '10px', width: '50%', }}>{response}</div>)}
    </div>
  );
}

export default App;
