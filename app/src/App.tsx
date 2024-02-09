import React, { useState, useEffect } from 'react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';import './App.css';

import { GraphQlGuru } from './components/GraphQlGuru';

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

  return (
    <div className="App">
      <header style={{marginLeft:'10px'}}>
        <h1>Graph Guru Demo</h1>
      </header>

      <div style={{height:'800px'}}>
        <GraphiQL fetcher={fetcher} defaultQuery={sampleQuery}>
          <GraphiQL.Footer>
            <GraphQlGuru />
          </GraphiQL.Footer>
        </GraphiQL>
      </div>
    </div>
  );
}

export default App;
