import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { introspectionQuery } from '../utils/introspection';
import { post, introspectGraphql } from '../utils/chat';


export const GraphQlGuru = ({}) => {
    const [query, setQuery] = useState('');
    const [introspectionResult, setIntrospectionResult] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleChange = (event: any) => {
      setQuery(event.target.value);
    }
  
    const getQuery = async () => {
      setIsLoading(true);
      setResponse('');
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
          setIntrospectionResult(JSON.stringify(data));
        });
    }, [setIntrospectionResult]);
  
    return (
        <div style={{display:'flex', flexDirection:'column', width: '100%', marginLeft: '10px'}}>
        <div>
          <h4 style={{marginBottom: '0px'}}>GraphQL Guru</h4>
          <p style={{margin: '0px'}}>Example queries: "can you write me a query to get all posts", "can you write me a query to get a post"</p>
        </div>
        <input type="text" value={query} onChange={handleChange} style={{marginBottom: '5px'}}/>
        <button type="button" onClick={getQuery}>
          Submit
        </button>
        {isLoading && (<div style={{marginLeft: '10px' }}>Loading...</div>)}
        {response && (<ReactMarkdown>{response}</ReactMarkdown>)}
      </div>

    );
};